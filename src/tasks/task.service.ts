import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user)
    }

    async getTaskById(
        id: number,
        user: User
    ): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } })

        if (!found) {
            throw new NotFoundException('Task could not be found')
        }

        return found
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async updateTaskStatus(
        id: number,
        status: TaskStatus,
        user: User
    ): Promise<Task> {
        const found = await this.getTaskById(id, user)
        found.status = status
        await found.save()
        return found
    }

    async deleteTask(
        id: number,
        user: User
    ): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id })

        if (!result.affected) {
            throw new NotFoundException('Task could not be deleted')
        }
    }
}
