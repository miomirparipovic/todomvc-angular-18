import { Component, computed, input, output } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todo = input.required<TodoInterface>();
  isEditing = input.required<boolean>();
  editItemId = output<string>();
  editingText = computed(() => {
    return this.todo().text;
  });

  onSetTodoInEditMode(): void {
    this.editItemId.emit(this.todo().id);
  }
}
