// create-user.dto.ts

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length, Matches } from 'class-validator';

@ApiTags('user')
export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({example:"something1234"})
  @IsString()
  @Length(8, 20) // Minimum length 8, maximum length 20
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?]).*$/, { message: 'Password too weak' })
  password: string
}
