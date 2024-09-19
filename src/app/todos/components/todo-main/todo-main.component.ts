import { Component, input, output, signal } from '@angular/core';
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
  editedText = output<string[]>();
  removeTodoId = output<string>();
  toggleTodoWithId = output<string>();
  editItemId = signal<string | null>(null);

  handleSetTodoInEditMode(todoId: string | null) {
    this.editItemId.set(todoId);
  }

  passOnEditedText(event: string[]): void {
    this.editedText.emit(event);
  }

  passTodoIdToRemove(id: string): void {
    this.removeTodoId.emit(id);
  }

  passToggleTodo(id: string): void {
    this.toggleTodoWithId.emit(id);
  }
}
