class TechnologyIdDto {
  constructor(payload) {
    Object.assign(this, payload);
  }
}

TechnologyIdDto.schema = {
  id: { type: "number", required: true, min: 1 },
};

module.exports = TechnologyIdDto;
