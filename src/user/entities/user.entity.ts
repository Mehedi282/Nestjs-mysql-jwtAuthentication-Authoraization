import { Posts } from "src/post/entities/post.entity";
import { UserDetails } from "../../user-details/entities/user-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Like } from "src/likes/entities/like.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToOne(() => UserDetails, userDetails => userDetails.user)
    userDetails: UserDetails;

    //  Establishing one-to-many relationship with Post entity
    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

}
