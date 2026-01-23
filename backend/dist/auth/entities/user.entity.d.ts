import { TrainingSession } from '../../sessions/entities/session.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
    createdAt: Date;
    sessions: TrainingSession[];
}
