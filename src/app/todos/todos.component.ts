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
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoMainComponent, FooterComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  visibleTodos$!: Observable<TodoInterface[]>;
  activeTodos$!: Observable<number>;
  completedTodos$!: Observable<number>;
  areAllSelected$!: Observable<boolean>;
  areAnyTodos$!: Observable<boolean>;
  currentFilter$!: Observable<FilterEnum>;

  constructor(private _todosService: TodosService) {}

  ngOnInit(): void {
    this.visibleTodos();
    this.activeTodos();
    this.completedTodos();
    this.checkIfAllTodosSelected();
    this.checkIfAnyTodoExist();
    this.currentFilter$ = this._todosService.filter$;
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

  activeTodos(): void {
    this.activeTodos$ = this._todosService.todos$.pipe(
      map((todos) => {
        return todos.filter((todo) => !todo.isCompleted).length;
      }),
    );
  }

  completedTodos(): void {
    this.completedTodos$ = this._todosService.todos$.pipe(
      map((todos) => {
        return todos.filter((todo) => todo.isCompleted).length;
      }),
    );
  }

  checkIfAllTodosSelected(): void {
    this.areAllSelected$ = this._todosService.todos$.pipe(
      map((todos: TodoInterface[]) => {
        return todos.length > 0 && todos.every((todo) => todo.isCompleted);
      }),
    );
  }

  checkIfAnyTodoExist(): void {
    this.areAnyTodos$ = this._todosService.todos$.pipe(
      map((todos) => todos.length > 0),
    );
  }

  handleToggleTodo(todoId: string): void {
    this._todosService.toggleTodo(todoId);
  }

  handleToggleTodos(isCompletedFlag: boolean): void {
    // console.log('isCompletedFlag', isCompletedFlag);
    this._todosService.toggleTodos(isCompletedFlag);
  }

  handleChangeFilter(filter: FilterEnum): void {
    // console.log('filter in handleChangeFilter', filter);
    this._todosService.changeFilter(filter);
  }

  handleRemoveTodo(todoId: string): void {
    this._todosService.removeTodo(todoId);
  }

  handleEditedTextWithId(editedTextWithId: string[]): void {
    const [editId, editText] = editedTextWithId;
    this._todosService.updateEditedText(editId, editText);
  }

  handleClearCompoleted() {
    this._todosService.clearCompleted();
  }
}
