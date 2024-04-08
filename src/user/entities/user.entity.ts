import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}
