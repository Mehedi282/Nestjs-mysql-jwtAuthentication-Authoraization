import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post(':userId/like/:postId')
  async likePost(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ): Promise<void> {
    return this.likesService.likePost(userId, postId);
  }

  @Post(':userId/unlike/:postId')
  async unlikePost(
    @Param('userId') userId: number,
    @Param('postId') postId: number,
  ): Promise<void> {
    return this.likesService.unlikePost(userId, postId);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
