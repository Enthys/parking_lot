export default class UnsupportedVehicleTypeError extends Error {
  constructor(type: string) {
    super();

    this.message = `Cannot categorize vehicles of type '${type}'`;
  }
}
