// Post entity
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Like } from "src/likes/entities/like.entity";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true }) // Change the column type to text
    photos: string;

    @Column({ default: '' })
    content: string;

    // Define userId column to store the foreign key
    @Column()
    userId: number;

    // Establishing many-to-one relationship with User entity
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'userId' }) // Specify the foreign key column
    user: User;

    // Method to serialize array to string before saving to the database
    setPhotos(photos: string[]): void {
        this.photos = JSON.stringify(photos);
    }

    // Method to deserialize string to array when retrieving from the database
    getPhotos(): string[] {
        return JSON.parse(this.photos);
    }

    @OneToMany(() => Like, like => like.post)
    likes: Like[];
}
