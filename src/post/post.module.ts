import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MultipleImageUploadService } from './multipleImgUp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, User, Like]), // Include UserDetails Repository
  ],
  controllers: [PostController],
  providers: [PostService, MultipleImageUploadService ],
})
export class PostModule {}
