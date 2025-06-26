import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/task/dto/create-task-dto';
import { UpdateTaskDTO } from 'src/task/dto/update-task-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async createTask(userId: number, data: CreateTaskDTO) {
    const task = await this.prismaService.task.create({
      data: {
        userId: userId,
        task: data.task,
        isDone: data.isDone || false,
      },
    });

    return task;
  }

  async getAllTasks(userId: number) {
    return await this.prismaService.task.findMany({
      where: { userId },
    });
  }

  async deleteTask(userId: number, id: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new Error('Task not found or not owned by user');
    }

    return await this.prismaService.task.delete({
      where: { id },
    });
  }

  async updateTask(userId: number, id: number, data: UpdateTaskDTO) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new Error('Task not found or not owned by user');
    }

    return await this.prismaService.task.update({
      where: { id },
      data,
    });
  }
}
