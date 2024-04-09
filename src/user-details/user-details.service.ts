import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from './entities/user-detail.entity';
import { Repository } from 'typeorm';
import { ImgbbService } from './imgbb.service';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    private readonly imgbbService: ImgbbService,
    @InjectRepository(User) // Inject UserRepository to fetch user by id
    private readonly userRepository: Repository<User>,
  ) {}


 async create(id: number, userData: UserDetails, image: Buffer): Promise<UserDetails> {
    try {
      if (image) {
        userData.profilePicture = await this.imgbbService.uploadImage(image);
      }
  
      // Fetch the User object by userId
      const existedUser = await this.userRepository.findOne({where: {id:id} });
      if (!existedUser) {
        throw new Error(`User with id ${id} not found!!`);
      }

      const existingUserDetails = await this.userDetailsRepository.findOne({ where: { user: { id: id } } });
    
    if (existingUserDetails) {
      throw new Error(`Update your profile!!`);
    }
  
     
      userData.user=existedUser;
      return this.userDetailsRepository.save(userData);
    } catch (error) {
      return error.message
    }
  }

  findAll() {
    return `This action returns all userDetails`;
  }

  findOne(id: number) {
    return this.userDetailsRepository.findOne({ where: { user: { id: id } }, relations: ['user'] });
  }

  
  async update(id: number, userData: Partial<UserDetails>, image: Buffer ): Promise<UserDetails> {
    if (image) {
      userData.profilePicture = await this.imgbbService.uploadImage(image);
    }
    const existingUserDetails = await this.userDetailsRepository.findOne({ where: { user: { id: id } } });
    
    if (!existingUserDetails) {
      throw new NotFoundException(`User details for user with id ${id} not found`);
    }

    // Update only provided fields
    Object.assign(existingUserDetails, userData);

    return this.userDetailsRepository.save(existingUserDetails);
  }


  remove(id: number) {
    return `This action removes a #${id} userDetail`;
  }
}
