import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit, AfterViewChecked {
  todo = input.required<TodoInterface>();
  isEditing = input.required<boolean>();
  editItemId = output<string | null>();
  editedText = output<string[]>();
  removeTodo = output<string>();
  toggleTodoWithId = output<string>();
  textToEdit = computed(() => {
    return this.todo().text;
  });
  currentText!: WritableSignal<string>;
  @ViewChild('editInputRef') editInput?: ElementRef;

  ngOnInit(): void {
    this.currentText = signal<string>(this.textToEdit());
  }

  ngAfterViewChecked(): void {
    if (this.isEditing()) {
      this.editInput?.nativeElement.focus();
    }
  }

  onSetTodoInEditMode(): void {
    this.editItemId.emit(this.todo().id);
  }

  unsetTodoEditMode(): void {
    this.editItemId.emit(null);
  }

  handleBlur(): void {
    this.currentText.set(this.textToEdit());
    this.unsetTodoEditMode();
  }

  onEditingText(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (
      event.key == 'Enter' &&
      this.currentText() &&
      this.currentText() != this.textToEdit()
    ) {
      this.editedText.emit([this.todo().id, this.currentText()]);
      this.unsetTodoEditMode();
      return;
    }

    if (event.key == 'Escape') {
      this.unsetTodoEditMode();
      this.currentText.set(this.textToEdit());
      return;
    }

    if (target) {
      this.currentText.set(target.value);
      return;
    }
  }

  onRemoveTodo(): void {
    this.removeTodo.emit(this.todo().id);
  }

  onToggleTodo(): void {
    this.toggleTodoWithId.emit(this.todo().id);
  }
}
