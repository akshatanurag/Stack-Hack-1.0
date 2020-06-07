import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { TodoListItem } from '../../models/TodoListItem.model'
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() task: TodoListItem;
  @Input() index: number;
  editTaskForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private tasksService: TasksService) {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    });
  }

  ngOnInit(): void {

    this.editTaskForm = new FormGroup({
      title: new FormControl(this.task.title,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      label: new FormControl(this.task.label,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      priority: new FormControl(this.task.priority,
        [
          Validators.required,
        ]),
      due_on: new FormControl(new Date(this.task.due_on), this.dateValidator)
    });
  }

  dateValidator(control: FormControl) {
    return (new Date(control.value) < new Date()) ? { 'invalid': 1 } : null;
  }

  onSubmit() {
    if (this.editTaskForm.valid) {
      const editedTask = {
        ...this.task,
        ...this.editTaskForm.value
      }
      editedTask.due_on = new Date(editedTask.due_on).getTime();
      this.tasksService.updateTask(this.task, editedTask);
    } else {
      console.error('Invalid Input');
    }
  }
}
