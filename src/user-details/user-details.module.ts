import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { ImgbbService } from './imgbb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from './entities/user-detail.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetails, User]), // Include UserDetails Repository
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService, ImgbbService],
})
export class UserDetailsModule {}
