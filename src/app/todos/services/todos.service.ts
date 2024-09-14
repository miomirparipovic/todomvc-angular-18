import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private localStorageKey = 'todo-angular';
  private todosSubject$ = new BehaviorSubject<TodoInterface[]>([]);
  private filterSubject$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private isAllTodosSelectedSubject$ = new BehaviorSubject<boolean>(false);

  readonly todos$ = this.todosSubject$.asObservable();
  readonly filter$ = this.filterSubject$.asObservable();
  readonly isAllTodosSelected$ = this.isAllTodosSelectedSubject$.asObservable();

  constructor() {
    this.loadTodosFromLocalStorage();
  }

  loadTodosFromLocalStorage(): void {
    const todos = localStorage.getItem(this.localStorageKey);

    if (todos) {
      this.todosSubject$.next(JSON.parse(todos));
    }
  }

  saveTodosToLocalStorage(): void {
    const currentTodos = this.todosSubject$.getValue();
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentTodos));
  }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      id: 'id_' + `${Date.now().toString()}`,
      text: text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todosSubject$.getValue(), newTodo];

    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }

  removeTodo(todoId: string): void {
    const updatedTodos: TodoInterface[] = this.todosSubject$
      .getValue()
      .filter((todo) => todo.id != todoId);

    // console.log('todos', todos);
    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }

  toggleTodo(todoId: string): void {
    const updatedTodos = this.todosSubject$.getValue().map((todo) => {
      if (todo.id == todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    });

    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }

  toggleTodos(isCompleted: boolean): void {
    // console.log('isCompleted in service', isCompleted);
    const updatedTodos = this.todosSubject$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });

    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }

  changeFilter(filterName: FilterEnum): void {
    this.filterSubject$.next(filterName);
    // console.log('filter in service', filterName);
  }

  updateEditedText(editId: string, editText: string): void {
    const updatedTodos = this.todosSubject$.getValue().map((todo) => {
      if (todo.id == editId) {
        return {
          ...todo,
          text: editText,
        };
      }

      return todo;
    });

    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }

  clearCompleted() {
    const updatedTodos = this.todosSubject$.getValue().filter((todo) => {
      return !todo.isCompleted;
    });

    this.todosSubject$.next(updatedTodos);
    this.saveTodosToLocalStorage();
  }
}
