// tslint:disable max-classes-per-file

class ExtendableError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;

    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class ConnectionError extends ExtendableError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }
}

export class DatabaseError extends ExtendableError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
