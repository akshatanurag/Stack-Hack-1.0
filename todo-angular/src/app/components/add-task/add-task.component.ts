import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { TodoListItem } from '../../models/TodoListItem.model'
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  addTaskForm: FormGroup;
  task: TodoListItem;

  constructor(private tasksService: TasksService) {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    });
  }

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      title: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      label: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      priority: new FormControl(0,
        [
          Validators.required,
        ]),
      due_on: new FormControl(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), [this.dateValidator])
    });
  }

  dateValidator(control: FormControl) {
    return (new Date(control.value) < new Date()) ? { 'invalid': 1 } : null;
  }

  onSubmit() {
    if (this.addTaskForm.status === 'INVALID') {
      console.error('Form Invalid');
    } else if (this.addTaskForm.status === 'VALID') {
      const newTask: TodoListItem = {
        ...this.addTaskForm.value,
        created_on: Date.now(),
        is_completed: false
      }
      newTask.due_on = new Date(newTask.due_on).getTime();
      this.tasksService.addTask(newTask)
      this.addTaskForm.reset(
        {
          priority: 0,
          due_on: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        }
      )
    }
  }
}
