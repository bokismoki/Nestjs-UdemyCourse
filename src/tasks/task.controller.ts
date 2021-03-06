import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user)
    }

    @Get('/:id')
    async getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user)
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.taskService.deleteTask(id, user)
    }
}
