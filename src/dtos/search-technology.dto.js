class SearchTechnologyDto {
  constructor(payload) {
    Object.assign(this, payload);
  }
}

SearchTechnologyDto.schema = {
  name: { type: "string", required: true, minLength: 2, maxLength: 80 },
};

module.exports = SearchTechnologyDto;
