import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/TodoListItem.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

interface addTaskResponseData {
  success: boolean,
  message: {
    created_on: number,
    is_completed: boolean,
    _id: string,
    title: string,
    label: string,
    due_on: number,
    priority: number,
    user_id: string,
    sub_task: [],
  }
}

interface fetchResponseData {
  success: string,
  tasks: TodoListItem[]
}

@Injectable({
  providedIn: 'root'
})


export class TasksService {

  todoList: TodoListItem[] = [];
  listUpdated = new Subject<TodoListItem[]>();
  isLoading = new Subject<number>();

  constructor(private http: HttpClient) { }

  fetchData() {
    this.http.get<fetchResponseData>('https://stackhack-todo.herokuapp.com/api/todo')
      .pipe(map(res => {
        if (res.success) {
          return res.tasks;
        } else {
          return [];
        }
      }))
      .subscribe(
        tasks => {
          this.todoList = tasks;
          this.listUpdated.next(this.todoList.slice());
        },
        err => {
          console.log(err.error.message); // 401(for unverified accounts)
          this.listUpdated.next([]);
        }
      )
  }

  addTask(newTask: TodoListItem) {
    this.isLoading.next(-1);
    this.http.post<addTaskResponseData>('https://stackhack-todo.herokuapp.com/api/todo', newTask)
      .pipe(map(res => {
        if (res.success) {
          return res.message;
        }
      }))
      .subscribe(
        response => {
          newTask._id = response._id;
          this.todoList.push(newTask);
          this.listUpdated.next(this.todoList.slice());
        },
        err => {
          console.log(err.error.message);
          this.listUpdated.next(this.todoList.slice())
        }
      )
  }

  deleteTask(task: TodoListItem) {
    const index = this.todoList.indexOf(task);
    this.todoList.splice(index, 1);
    this.listUpdated.next(this.todoList.slice());
    this.http.delete(`https://stackhack-todo.herokuapp.com/api/todo/${task._id}`)
      .subscribe(res => {
        console.log(res);
      });
  }

  markComplete(task: TodoListItem) {
    if (task.is_completed) return;
    const req = {
      title: task.title,
      label: task.label,
      due_on: task.due_on,
      priority: task.priority,
      is_completed: true
    }
    this.http.put(`https://stackhack-todo.herokuapp.com/api/todo/${task._id}`, req)
      .subscribe(() => {
        console.log('updated');
      }, err => {
        console.log(err);
      });
  }

  updateTask(task: TodoListItem, editedTask: TodoListItem) {
    const index = this.todoList.indexOf(task);
    this.isLoading.next(index);

    const req = {
      title: editedTask.title,
      label: editedTask.label,
      due_on: editedTask.due_on,
      priority: editedTask.priority,
      is_completed: editedTask.is_completed
    }
    this.http.put(`https://stackhack-todo.herokuapp.com/api/todo/${task._id}`, req)
      .subscribe(
        result => {
          this.todoList[index]._id = editedTask._id;
          this.todoList[index].title = editedTask.title;
          this.todoList[index].created_on = editedTask.created_on;
          this.todoList[index].due_on = editedTask.due_on;
          this.todoList[index].label = editedTask.label;
          this.todoList[index].priority = editedTask.priority;
          this.todoList[index].is_completed = editedTask.is_completed;
          this.listUpdated.next(this.todoList.slice());
        });
  }
}
