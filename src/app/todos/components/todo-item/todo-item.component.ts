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

  ngOnInit(): void {
    this.isEditing = false;
  }

  setTodoInEditMode(): void {
    // console.log('set in edit mode');
    console.log(this.todo.id);
    this.editModeId.emit(this.todo.id);
  }
}
