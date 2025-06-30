import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { TaskModule } from './task/task.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, TaskModule, PaymentModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AppModule {}
