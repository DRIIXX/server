const DEFAULT_OPTIONS = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

function isNil(value) {
  return value === undefined || value === null;
}

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}

function validateField(field, value, rule, payload, errors, normalized, options) {
  const skipForCondition = typeof rule.validateIf === "function" && !rule.validateIf(payload);
  if (skipForCondition) {
    return;
  }

  const optional = rule.optional === true;
  const missing = isNil(value) || value === "";

  if (!optional && rule.required !== false && missing) {
    errors.push({ field, message: "Field is required" });
    return;
  }

  if (missing) {
    return;
  }

  let currentValue = value;

  if (rule.type === "number") {
    currentValue = toNumber(value);
  } else if (rule.type === "boolean") {
    if (options.transform) {
      if (value === "true" || value === true) currentValue = true;
      else if (value === "false" || value === false) currentValue = false;
    }
  } else if (rule.type === "string" && typeof value === "string" && options.transform) {
    currentValue = value.trim();
  }

  switch (rule.type) {
    case "string":
      if (typeof currentValue !== "string") {
        errors.push({ field, message: "Must be a string" });
        return;
      }
      if (rule.minLength && currentValue.length < rule.minLength) {
        errors.push({ field, message: `Must have at least ${rule.minLength} characters` });
      }
      if (rule.maxLength && currentValue.length > rule.maxLength) {
        errors.push({ field, message: `Must have at most ${rule.maxLength} characters` });
      }
      if (rule.pattern && !rule.pattern.test(currentValue)) {
        errors.push({ field, message: "Format is invalid" });
      }
      break;
    case "number":
      if (typeof currentValue !== "number" || Number.isNaN(currentValue)) {
        errors.push({ field, message: "Must be a number" });
        return;
      }
      if (rule.min !== undefined && currentValue < rule.min) {
        errors.push({ field, message: `Must be greater than or equal to ${rule.min}` });
      }
      if (rule.max !== undefined && currentValue > rule.max) {
        errors.push({ field, message: `Must be less than or equal to ${rule.max}` });
      }
      break;
    case "boolean":
      if (typeof currentValue !== "boolean") {
        errors.push({ field, message: "Must be a boolean" });
      }
      break;
    case "email":
      if (typeof currentValue !== "string") {
        errors.push({ field, message: "Must be a string email" });
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(currentValue)) {
        errors.push({ field, message: "Must be a valid email address" });
      }
      break;
    default:
      break;
  }

  if (Array.isArray(rule.in) && !rule.in.includes(currentValue)) {
    errors.push({ field, message: `Must be one of: ${rule.in.join(", ")}` });
  }

  if (typeof rule.custom === "function") {
    const customResult = rule.custom(currentValue, payload);
    if (customResult !== true) {
      errors.push({ field, message: typeof customResult === "string" ? customResult : "Custom validation failed" });
    }
  }

  normalized[field] = options.transform ? currentValue : value;
}

function validatePayload(dtoClass, payload, options) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const rules = dtoClass.schema || {};
  const allowedKeys = Object.keys(rules);
  const errors = [];
  const normalized = {};
  const input = payload || {};

  if (mergedOptions.whitelist) {
    for (const key of Object.keys(input)) {
      if (!allowedKeys.includes(key)) {
        if (mergedOptions.forbidNonWhitelisted) {
          errors.push({ field: key, message: "Field is not allowed" });
        }
      } else {
        normalized[key] = input[key];
      }
    }
  } else {
    Object.assign(normalized, input);
  }

  for (const field of allowedKeys) {
    validateField(field, normalized[field], rules[field], normalized, errors, normalized, mergedOptions);
  }

  return errors.length ? { errors } : { value: normalized };
}

function createValidationPipe(defaultOptions = {}) {
  return function applyValidation(dtoClass, source = "body", localOptions = {}) {
    return function validateRequest(req, res, next) {
      const payload = req[source];
      const { errors, value } = validatePayload(dtoClass, payload, { ...defaultOptions, ...localOptions });
      if (errors) {
        return res.status(400).json({ errors });
      }
      req[source] = value;
      return next();
    };
  };
}

module.exports = { createValidationPipe, validatePayload, DEFAULT_OPTIONS };
