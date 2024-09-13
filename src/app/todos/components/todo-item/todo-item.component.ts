import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: TodoInterface;
  @Input() isEditing!: boolean;
  @Output() editModeId = new EventEmitter<string>();
  @Output() removeTodo = new EventEmitter<string>();
  @Output() toggleTodo = new EventEmitter<string>();
  @Output() editedText = new EventEmitter<string[]>();
  editingText!: string;

  ngOnInit(): void {
    this.isEditing = false;
    this.editingText = this.todo.text;
  }

  setTodoInEditMode(): void {
    // console.log(this.todo.id);
    this.editModeId.emit(this.todo.id);
  }

  unsetTodoEditMode(): void {
    this.editModeId.emit('');
  }

  onRemoveTodo(): void {
    this.removeTodo.emit(this.todo.id);
  }

  onToggleTodo(): void {
    this.toggleTodo.emit(this.todo.id);
  }

  onEditingText(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (
      event.key == 'Enter' &&
      this.editingText &&
      this.editingText != this.todo.text
    ) {
      this.editedText.emit([this.todo.id, this.editingText]);
      this.unsetTodoEditMode();
      return;
    }

    if (event.key == 'Escape') {
      this.unsetTodoEditMode();
      this.editingText = this.todo.text;
      return;
    }

    if (target) {
      this.editingText = target.value;
      return;
    }
  }
}
