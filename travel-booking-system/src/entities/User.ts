import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({nullable: true})
    password!: string;

    @Column({nullable: true})
    refreshToken!: string;

    @CreateDateColumn({nullable: true})
    createdAt!: Date;
}
