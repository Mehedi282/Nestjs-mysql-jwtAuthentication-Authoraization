import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserDetails } from './user-details/entities/user-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'M@132435m',
      database: 'test',
      entities: [User, UserDetails],
      synchronize: true,
    }),
    UserModule,
    UserDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
