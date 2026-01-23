import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body: any, @Request() req: any) {
        const user = req.user;
        return this.sessionsService.create({
            ...body,
            userId: user.id,
        });
    }

    @UseGuards(AuthGuard)
    @Get('my')
    async findMy(@Request() req: any) {
        const user = req.user;
        return this.sessionsService.findAllByUser(user.id);
    }

    @UseGuards(AuthGuard)
    @Get('completed-ids')
    async getCompletedIds(@Request() req: any) {
        const user = req.user;
        const sessions = await this.sessionsService.findAllByUser(user.id);
        const ids = Array.from(new Set(sessions.map(s => s.codeSnippetId)));
        return ids;
    }

    @Get('stats')
    async getStats() {
        return this.sessionsService.getGlobalStats();
    }
}
