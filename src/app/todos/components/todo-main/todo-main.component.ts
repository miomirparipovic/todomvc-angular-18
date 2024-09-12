import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css',
})
export class TodoMainComponent {
  @Input() visibleTodos!: TodoInterface[] | null;
  @Input() isAllSelected!: boolean | null;
  @Output() toggleTodos = new EventEmitter<boolean>();
  editItemId: string | null = null;

  onToggleTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.toggleTodos.emit(target.checked);
  }

  handleEditModeId(event: string): void {
    // console.log('edit id', event);
    this.editItemId = event;
  }
}
