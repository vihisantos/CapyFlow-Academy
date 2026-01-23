import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(data: any) {
        const { email, password, displayName } = data;
        const existing = await this.userRepository.findOne({ where: { email } });
        if (existing) throw new ConflictException('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            displayName,
        });

        const savedUser = await this.userRepository.save(user);
        const { password: _, ...result } = savedUser;

        return {
            user: result,
            token: this.jwtService.sign({ sub: savedUser.id, email: savedUser.email }),
        };
    }

    async login(data: any) {
        const { email, password } = data;
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'displayName', 'photoURL']
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password: _, ...result } = user;
        return {
            user: result,
            token: this.jwtService.sign({ sub: user.id, email: user.email }),
        };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async findById(id: string) {
        return this.userRepository.findOne({ where: { id } });
    }
}
