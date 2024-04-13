import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}


  async likePost(userId: number, postId: number): Promise<void> {
    const user = await this.userRepository.findOne({where: {id:userId}});
    const post = await this.postRepository.findOne({where:{id:postId}});

    if (!user || !post) {
      throw new NotFoundException('User or post not found');
    }

    const existingLike = await this.likeRepository.findOne({ where: { user, post } });

    if (!existingLike) {
      const like = new Like();
      like.user = user;
      like.post = post;
      await this.likeRepository.save(like);
    }
  }

  async unlikePost(userId: number, postId: number): Promise<void> {
    const user = await this.userRepository.findOne({where: {id:userId}});
    const post = await this.postRepository.findOne({where:{id:postId}});

    if (!user || !post) {
      throw new NotFoundException('User or post not found');
    }

    await this.likeRepository.delete({ user, post });
  }


  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
