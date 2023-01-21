export default class VehicleNotParkedError extends Error {
  constructor(plate: string) {
    super();

    this.message = `Vehicle '${plate}' in not in the parking lot.`;
  }
}
