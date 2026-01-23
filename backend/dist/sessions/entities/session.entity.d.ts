import { User } from '../../auth/entities/user.entity';
export declare class TrainingSession {
    id: string;
    user: User;
    userId: string;
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    language: string;
    codeSnippetId: string;
    createdAt: Date;
}
