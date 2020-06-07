import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TodoListItem } from 'src/app/models/TodoListItem.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('exitTrigger', [
      transition(':leave', [
        animate('550ms', style({ opacity: 0 ,transform: 'translateX(1000px)'}))
      ]),
      transition(':enter', [
        style({opacity: 0 ,transform: 'translateY(-10px)'}),
        animate('200ms')
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {

  constructor(private taskService: TasksService) { }
  isLoading = true;
  tasks: TodoListItem[];
  ngOnInit(): void {
    this.taskService.fetchData();
    this.taskService.isLoading.subscribe(val => {
      if (val === -1){
        this.isLoading = true;
      }
    });
    this.taskService.listUpdated.subscribe(list => {
      this.tasks = list;
      console.log(this.tasks);
      this.isLoading = false;
    });
  }

}
