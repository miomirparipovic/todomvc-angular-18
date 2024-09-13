import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit, AfterViewChecked {
  @Input() todo!: TodoInterface;
  @Input() isEditing!: boolean;
  @Output() editModeId = new EventEmitter<string>();
  @Output() removeTodo = new EventEmitter<string>();
  @Output() toggleTodo = new EventEmitter<string>();
  @Output() editedText = new EventEmitter<string[]>();
  @ViewChild('editInputRef') editInput?: ElementRef;
  editingText!: string;

  ngOnInit(): void {
    this.isEditing = false;
    this.editingText = this.todo.text;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.editInput?.nativeElement.focus();
    }
  }

  setTodoInEditMode(): void {
    // console.log(this.todo.id);
    this.editModeId.emit(this.todo.id);
    this.editInput?.nativeElement.focus();
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

  handleBlur(): void {
    this.unsetTodoEditMode();
  }
}
