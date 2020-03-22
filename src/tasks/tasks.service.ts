import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    private findTaskIndex(id: string): number {
        const found = this.tasks.findIndex(task => task.id === id)

        if(found === -1) {
            throw new NotFoundException('Task could not be found')
        }

        return found
    }

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto

        let tasks = this.getAllTasks()

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
        }

        return tasks
    }

    getTaskById(id: string): Task {
        const found =  this.tasks.find(task => task.id === id)

        if(!found) {
            throw new NotFoundException('Task could not be found')
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const index = this.findTaskIndex(id)
        this.tasks[index].status = status
        return this.tasks[index]
    }

    deleteTask(id: string): void {
        const index = this.findTaskIndex(id)
        this.tasks.splice(index, 1)
    }
}
