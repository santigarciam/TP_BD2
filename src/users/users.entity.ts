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

    @Column({ unique: true, type: 'varchar', length: 30 })
    public name: string;

    @Column({ unique: true, type: 'varchar', length: 30 })
    public surname: string;

    constructor(
        name: string,
        email: string,
        password: string,
        surname: string,
        username: string,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.surname = surname;
        this.username = username;
    }

}