import { UserDetails } from "../../user-details/entities/user-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToOne(() => UserDetails, userDetails => userDetails.user)
    @JoinColumn()
    userDetails: UserDetails;

}
