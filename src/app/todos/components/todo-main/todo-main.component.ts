import { Component, input } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css',
})
export class TodoMainComponent {
  // todosSignal = input.required<TodoInterface[]>();
  todosSignal = input.required<TodoInterface[]>();
}
