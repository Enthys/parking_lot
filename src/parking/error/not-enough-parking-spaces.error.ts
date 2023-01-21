export default class NotEnoughParkingSpacesError extends Error {
  constructor() {
    super();

    this.message = 'Not enough spaces in parking lot';
  }
}
