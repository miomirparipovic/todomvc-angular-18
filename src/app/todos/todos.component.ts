// angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';

// components
import { HeaderComponent } from './components/header/header.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

// models
import { TodoInterface } from './types/todo.interface';
import { TodosService } from './services/todos.service';
import { FilterEnum } from './types/filter.enum';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoMainComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  visibleTodos$!: Observable<TodoInterface[]>;
  isAllSelected$!: Observable<boolean>;

  constructor(private _todosService: TodosService) {}

  ngOnInit(): void {
    this.visibleTodos();
    this.checkIfAllTodosSelected();
  }

  visibleTodos(): void {
    this.visibleTodos$ = combineLatest([
      this._todosService.todos$,
      this._todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter == FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        }

        if (filter == FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }

        return todos;
      }),
    );
  }

  checkIfAllTodosSelected(): void {
    this.isAllSelected$ = this._todosService.todos$.pipe(
      map((todos: TodoInterface[]) => {
        return todos.length > 0 && todos.every((todo) => todo.isCompleted);
      }),
    );
  }

  handleToggleTodos(isCompletedFlag: boolean): void {
    // console.log('isCompletedFlag', isCompletedFlag);
    this._todosService.toggleTodos(isCompletedFlag);
  }
}
