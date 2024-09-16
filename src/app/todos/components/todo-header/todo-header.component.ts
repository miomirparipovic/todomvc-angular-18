import { Component, output } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css',
})
export class TodoHeaderComponent {
  todoText: string = '';
  newTodo = output<string>();

  onInputTodo(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.key == 'Enter') {
      this.newTodo.emit(this.todoText);
      this.todoText = '';
      return;
    }

    if (target) {
      this.todoText = target.value;
      return;
    }
  }
}
