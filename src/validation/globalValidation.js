const { createValidationPipe } = require("./validationPipe");

const validationPipe = createValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});

module.exports = { validationPipe };
