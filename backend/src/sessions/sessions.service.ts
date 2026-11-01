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
        const stats = await this.sessionsRepository
            .createQueryBuilder('session')
            .select('COUNT(session.id)', 'totalSessions')
            .addSelect('COALESCE(AVG(session.wpm), 0)', 'avgWpm')
            .getRawOne<{ totalSessions: string; avgWpm: string }>();

        return {
            totalSessions: Number(stats?.totalSessions ?? 0),
            avgWpm: Math.round(Number(stats?.avgWpm ?? 0)),
        };
    }
}
