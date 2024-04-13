import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' }) // Set default value to empty string
    profilePicture: string;

    @Column({ default: '' }) // Set default value to empty string
    location: string;

    @Column({ default: '' }) // Set default value to empty string
    jobDetails: string;

    @Column({ default: '' }) // Set default value to empty string
    education: string;

    @Column()
    userId: number;

    // Establishing one-to-one relationship with User entity
    @OneToOne(() => User, user => user.userDetails)
    @JoinColumn({ name: 'userId' })
    user: User;
}
