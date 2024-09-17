import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css',
})
export class TodoHeaderComponent {
  todoText = signal<string>('');
  newTodo = output<string>();

  onInputTodo(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.key == 'Enter') {
      this.newTodo.emit(this.todoText());
      this.todoText.set('');
      return;
    }

    if (target) {
      this.todoText.set(target.value);
      return;
    }
  }
}
