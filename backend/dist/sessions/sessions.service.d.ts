import { Repository } from 'typeorm';
import { TrainingSession } from './entities/session.entity';
export declare class SessionsService {
    private sessionsRepository;
    constructor(sessionsRepository: Repository<TrainingSession>);
    create(data: Partial<TrainingSession>): Promise<TrainingSession>;
    findAllByUser(userId: string): Promise<TrainingSession[]>;
    getGlobalStats(): Promise<{
        totalSessions: number;
        avgWpm: number;
    }>;
}
