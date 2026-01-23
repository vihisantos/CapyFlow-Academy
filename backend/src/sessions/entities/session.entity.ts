import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('training_sessions')
export class TrainingSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

    @Column()
    userId: string;

    @Column('int')
    wpm: number;

    @Column('int')
    accuracy: number;

    @Column('float')
    timeElapsed: number; // in seconds

    @Column('text')
    language: string;

    @Column('text', { nullable: true })
    codeSnippetId: string;

    @CreateDateColumn()
    createdAt: Date;
}
