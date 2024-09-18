import { Component, input, signal } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css',
})
export class TodoMainComponent {
  visableTodosSignal = input.required<TodoInterface[]>();
  editItemId = signal<string | null>(null);

  handleSetTodoInEditMode(todoId: string) {
    this.editItemId.set(todoId);
  }
}
