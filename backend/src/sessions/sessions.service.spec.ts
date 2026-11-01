import { Repository } from 'typeorm';
import { TrainingSession } from './entities/session.entity';
import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
    let service: SessionsService;
    let queryBuilder: {
        select: jest.Mock;
        addSelect: jest.Mock;
        getRawOne: jest.Mock;
    };

    beforeEach(() => {
        queryBuilder = {
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            getRawOne: jest.fn(),
        };

        const repository = {
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
        };

        service = new SessionsService(
            repository as unknown as Repository<TrainingSession>,
        );
    });

    describe('getGlobalStats', () => {
        it('aggregates session count and average WPM in the database', async () => {
            queryBuilder.getRawOne.mockResolvedValue({
                totalSessions: '12',
                avgWpm: '48.6',
            });

            await expect(service.getGlobalStats()).resolves.toEqual({
                totalSessions: 12,
                avgWpm: 49,
            });

            expect(queryBuilder.select).toHaveBeenCalledWith(
                'COUNT(session.id)',
                'totalSessions',
            );
            expect(queryBuilder.addSelect).toHaveBeenCalledWith(
                'COALESCE(AVG(session.wpm), 0)',
                'avgWpm',
            );
        });

        it('returns zero values when there are no sessions', async () => {
            queryBuilder.getRawOne.mockResolvedValue({
                totalSessions: '0',
                avgWpm: '0',
            });

            await expect(service.getGlobalStats()).resolves.toEqual({
                totalSessions: 0,
                avgWpm: 0,
            });
        });

        it('handles an empty aggregate result safely', async () => {
            queryBuilder.getRawOne.mockResolvedValue(null);

            await expect(service.getGlobalStats()).resolves.toEqual({
                totalSessions: 0,
                avgWpm: 0,
            });
        });
    });
});
