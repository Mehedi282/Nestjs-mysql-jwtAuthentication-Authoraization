import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDetails } from './entities/user-detail.entity';



@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() userData: UserDetails, @UploadedFile() image: Express.Multer.File ,  @Param('id') id: number): Promise<UserDetails> {
    return this.userDetailsService.create(id, userData, image?.buffer);
  }

  @Get()
  findAll() {
    return this.userDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: number, @Body() userData: UserDetails, @UploadedFile() image: Express.Multer.File): Promise<UserDetails> {
    return this.userDetailsService.update(id, userData, image?.buffer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailsService.remove(+id);
  }
}
