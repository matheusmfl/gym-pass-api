export class LateCheckInValidationError extends Error {
  constructor() {
    super("the check-in can only be validated until 20 minutes")
  }
}