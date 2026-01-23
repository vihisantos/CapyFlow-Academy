import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingSession } from './entities/session.entity';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(TrainingSession)
        private sessionsRepository: Repository<TrainingSession>,
    ) { }

    async create(data: Partial<TrainingSession>) {
        const session = this.sessionsRepository.create(data);
        return this.sessionsRepository.save(session);
    }

    async findAllByUser(userId: string) {
        return this.sessionsRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async getGlobalStats() {
        // Basic global stats implementation
        const sessions = await this.sessionsRepository.find();
        const totalSessions = sessions.length;
        const avgWpm = sessions.reduce((acc, s) => acc + s.wpm, 0) / totalSessions || 0;
        return { totalSessions, avgWpm: Math.round(avgWpm) };
    }
}
