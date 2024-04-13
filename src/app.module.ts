import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserDetails } from './user-details/entities/user-detail.entity';
import { PostModule } from './post/post.module';
import { Posts } from './post/entities/post.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'M@132435m',
      database: 'today',
      entities: [User, UserDetails, Posts, Like],
      synchronize: true,
    }),
    UserModule,
    UserDetailsModule,
    PostModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
