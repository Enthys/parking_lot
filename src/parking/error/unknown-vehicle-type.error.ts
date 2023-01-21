export default class UnknownVehicleTypeError extends Error {
  constructor(type: string) {
    super();

    this.message = `Unknown vehicle type '${type}'`;
  }
}
