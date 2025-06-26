import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from 'src/task/dto/create-task-dto';
import { UpdateTaskDTO } from 'src/task/dto/update-task-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() body: CreateTaskDTO) {
    return this.taskService.createTask(req.user.id, body);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Request() req) {
    return this.taskService.getAllTasks(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Request() req, @Param('id') id: string) {
    return this.taskService.deleteTask(req.user.id, Number(id));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Request() req, @Param('id') id: string, @Body() body: UpdateTaskDTO) {
    return this.taskService.updateTask(req.user.id, Number(id), body);
  }
}
