import { PipeTransform, BadRequestException, Injectable } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any) {

        value = value.toUpperCase()

        if(!this.isStatusValid(value)) {
            throw new BadRequestException('Status you entered is not valid')
        }

        return value
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
}