import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string;
            photoURL: string;
            createdAt: Date;
            sessions: import("../sessions/entities/session.entity").TrainingSession[];
        };
        token: string;
    }>;
    login(body: any): Promise<{
        user: {
            id: string;
            email: string;
            displayName: string;
            photoURL: string;
            createdAt: Date;
            sessions: import("../sessions/entities/session.entity").TrainingSession[];
        };
        token: string;
    }>;
    getMe(req: any): Promise<any>;
}
