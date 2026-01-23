import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TrainingSession } from './entities/session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TrainingSession])],
    controllers: [SessionsController],
    providers: [SessionsService],
})
export class SessionsModule { }
