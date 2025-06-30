import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/task/dto/create-task-dto';
import { UpdateTaskDTO } from 'src/task/dto/update-task-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async createTask(userId: number, data: CreateTaskDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { task: true },
    });

    if (!user) {
      return {
        message: 'User not found.',
      };
    }

    if (!user.isPremium && user.task.length >= 5) {
      return {
        message:
          'Task limit reached. Upgrade to premium if you want to add more tasks.',
      };
    }

    const task = await this.prismaService.task.create({
      data: {
        userId: userId,
        task: data.task,
        isDone: data.isDone || false,
      },
    });

    return {
      message: 'Task created successfully',
      data: task,
    };
  }

  async getAllTasks(userId: number) {
    const tasks = await this.prismaService.task.findMany({
      where: { userId },
    });

    return {
      message: 'Tasks retrivied sucessfully',
      data: tasks,
    };
  }

  async deleteTask(userId: number, id: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return {
        message: 'Task not found or not owned by user',
        data: null,
      };
    }

    const deletedTask = await this.prismaService.task.delete({
      where: { id },
    });

    return {
      message: 'Task deleted successfully',
      data: deletedTask,
    };
  }

  async updateTask(userId: number, id: number, data: UpdateTaskDTO) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return {
        message: 'Task not found or not owned by user',
        data: null,
      };
    }

    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: data,
    });

    return {
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }
}
