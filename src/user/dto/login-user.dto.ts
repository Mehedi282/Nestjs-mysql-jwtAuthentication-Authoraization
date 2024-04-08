// create-user.dto.ts

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length, Matches } from 'class-validator';

@ApiTags('user')
export class LoginUserDto {
  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({example:"something1234"})
  @IsString()
  @Length(8, 20) 
  password: string
}
