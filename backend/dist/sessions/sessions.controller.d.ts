import { SessionsService } from './sessions.service';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    create(body: any, req: any): Promise<import("./entities/session.entity").TrainingSession>;
    findMy(req: any): Promise<import("./entities/session.entity").TrainingSession[]>;
    getCompletedIds(req: any): Promise<string[]>;
    getStats(): Promise<{
        totalSessions: number;
        avgWpm: number;
    }>;
}
