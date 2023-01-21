export default class VehicleAlreadyInLotError extends Error {
  constructor(plateNumber: string) {
    super();

    this.message = `Vehicle '${plateNumber}' is already in the parking lot`;
  }
}
