export default class UnkownCategoryError extends Error {
  constructor(category: string) {
    super();

    this.message = `Unknown category '${category}'`;
  }
}
