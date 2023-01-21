export default class MissingCategoryHourlyRatesError extends Error {
  constructor(category: string) {
    super();

    this.message = `Could not find hourly rates for category '${category}'`;
  }
}
