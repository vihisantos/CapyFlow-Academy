import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TrainingSession } from '../../sessions/entities/session.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false }) // Don't return password by default
    password: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    photoURL: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => TrainingSession, (session) => session.user)
    sessions: TrainingSession[];
}
