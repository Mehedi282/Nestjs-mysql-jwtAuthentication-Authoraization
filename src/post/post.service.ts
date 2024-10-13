import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MultipleImageUploadService } from '../post/multipleImgUp.service'
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly multipleImageUploadService: MultipleImageUploadService
  ) { }

  async createPost(photos: Express.Multer.File[], postDto: Posts, id: number) {
    try {
      let uploadedImageUrls: string[] = [];

      if (photos.length > 0) {
        // Upload images only if photos are provided
        uploadedImageUrls = await this.multipleImageUploadService.uploadImagesToImgBB(photos);
      }
      // Save post with image URLs
      console.log(typeof(id))
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new Error(`User with id ${id} not found!!`);
      }

      const post = new Posts();
      post.setPhotos(uploadedImageUrls);
      post.content = postDto.content;
      post.userId = user.id;

      const createdPost = await this.postRepository.save(post);

      // Update the user's posts array
      if (!user.posts) {
        user.posts = [createdPost];
      } else {
        user.posts.push(createdPost);
      }
      await this.userRepository.save(user);

      return createdPost
    } catch (error) {
      return error.message
    }
  }


  findAll() {
    return this.postRepository.find({relations:['likes', 'user', 'user.userDetails']});
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
