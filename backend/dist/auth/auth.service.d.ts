import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(data: any): Promise<{
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
    login(data: any): Promise<{
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
    validateToken(token: string): Promise<any>;
    findById(id: string): Promise<User | null>;
}
