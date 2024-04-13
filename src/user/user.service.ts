import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserAlreadyExistsException } from './userAlreadyExistExeption';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDetails } from 'src/user-details/entities/user-detail.entity';



@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

 
  async create(userData: CreateUserDto): Promise<User> {
    const userEmail = userData.email;
    const userName= userData.fullName;
    const userPassword = userData.password;
    
    const existedUser = await this.userRepository.findOne({ where: { email: userEmail } });
    if(existedUser){
      throw new UserAlreadyExistsException()
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userPassword, saltOrRounds);

    const newUser = this.userRepository.create({
      fullName:userName,
      email:userEmail,
      password:hash
    });
    return await this.userRepository.save(newUser);
  }


  async login(loginData: LoginUserDto){
    const {email, password} =loginData;

    const existedUser = await this.userRepository.findOne({ where: { email: email } });
    if(!existedUser){
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(password, existedUser.password);
    if(isMatch == false){
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { email: existedUser.email, userId: existedUser.id };
    const token = this.jwtService.sign(payload); 

    const userInfo = {
      token: token,
      userId: existedUser.id
    }

    return userInfo; // Return JWT token to the client


  }

 async findAll() {
    return await this.userRepository.find();
  }

 async findOne(id: number) {
    return await this.userRepository.findOne({where: {id:id}, relations: ['userDetails', 'posts', 'posts.likes']});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if(result.affected == 1){
      return {message: "User is successfully deleted!"}
    }else{
      throw new NotFoundException('User is not found!')
    }
  }
}
