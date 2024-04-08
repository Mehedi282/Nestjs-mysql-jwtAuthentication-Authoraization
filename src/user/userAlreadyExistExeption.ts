// user-already-exists.exception.ts

import { HttpStatus, HttpException } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message: string = 'User already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
