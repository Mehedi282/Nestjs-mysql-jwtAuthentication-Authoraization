import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Like } from 'src/likes/entities/like.entity';
import { Posts } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Like,Posts]),
  JwtModule.register({
    secret:'defaultsecretkey',
   })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
