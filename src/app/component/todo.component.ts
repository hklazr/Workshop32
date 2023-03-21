import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

	form!: FormGroup

	// @Input()
	// set todo(todo: Todo) {
	// 	this.form = this.createTodoForm(todo)
	// }

  @Output()
  todoAdded = new EventEmitter<Todo>();

	get value(): Todo {
		return this.form.value as Todo
	}

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.form = this.createTodoForm()
	}

	clear() {
		this.form.reset()
	}

	private createTodoForm(todo: Todo | null = null): FormGroup {
		return this.fb.group({
			description: new FormControl(!!todo ? todo.description: '', [ Validators.required, Validators.minLength(5) ]),
			priority: new FormControl(!!todo ? todo.priority : 'Low', [ Validators.required ]),
			due: new FormControl(!!todo ? todo.due : '', [ Validators.required, this.dateValidator() ]),
		});
	}

  dateValidator() {
    return (control: FormControl) => {
      const date = new Date(control.value);
      const now = new Date();
      if (date < now) {
        return {
          invalidDate: true
        };
      }
      return null;
    };
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  addTodo() {
    this.todoAdded.emit(this.value);
    this.clear();
  }

}