import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ unique: true, type: 'varchar', length: 30 })
    public username: string;

    @Column({ type: 'text' })
    public password: string;

    @Column({ unique: true, type: 'varchar', length: 30 })
    public email: string;

    constructor(
        username: string,
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

}