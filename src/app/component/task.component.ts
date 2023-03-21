import { Component, Input, SimpleChanges } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input()
  newTodo: Todo | null = null;

  todos: Todo[] = [];

  ngOnChanges(changes: any): void {
    if (changes.newTodo && changes.newTodo.currentValue) {
      this.todos.push(changes.newTodo.currentValue);
    }
  }
  
  
}