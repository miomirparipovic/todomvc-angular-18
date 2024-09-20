import { Injectable, Signal, signal } from '@angular/core';
import { TodoInterface } from '../models/todo.interface';
import { FilterEnum } from '../models/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private localStorageKey = signal<string>('todo-angular').asReadonly();
  private _todosSignal = signal<TodoInterface[]>([]);
  private _filterSignal = signal<FilterEnum>(FilterEnum.all);

  constructor() {
    this.loadTodosFromLocalStorage();
  }

  private loadTodosFromLocalStorage(): void {
    const todos = localStorage.getItem(this.localStorageKey());

    if (todos) {
      // this.todosSignal.set(JSON.parse(todos));
      // setter
      this.todosSignal = JSON.parse(todos);
    }
  }

  private saveTodosToLocalStorage(): void {
    const currentTodos = this._todosSignal();

    localStorage.setItem(this.localStorageKey(), JSON.stringify(currentTodos));
  }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      id: 'id_' + `${Date.now().toString()}`,
      text,
      isCompleted: false,
    };

    this._todosSignal.update((todos) => [...todos, newTodo]);
    this.saveTodosToLocalStorage();
  }

  // use one of these
  get todosSignal(): Signal<TodoInterface[]> {
    return this._todosSignal.asReadonly();
  }

  // getTodosSignal(): Signal<TodoInterface[]> {
  //   return this._todosSignal;
  // }

  set todosSignal(newTodos: TodoInterface[]) {
    this._todosSignal.set(newTodos);
    this.saveTodosToLocalStorage();
  }

  // changeTodosSignal(newTodos: TodoInterface[]): void {
  //   this._todosSignal.set(newTodos);
  // }

  // use one of these
  get filterSignal(): Signal<FilterEnum> {
    return this._filterSignal.asReadonly();
  }

  // getFilterSignal(): Signal<FilterEnum> {
  //   return this._filterSignal;
  // }

  set filterSignal(filter: FilterEnum) {
    this._filterSignal.set(filter);
  }

  // changeFilterSignal(filter: FilterEnum): void {
  //   this._filterSignal.set(filter);
  // }

  updateEditedTodoText(editId: string, editText: string): void {
    const updatedTodos = this.todosSignal().map((todo: TodoInterface) => {
      if (todo.id == editId) {
        return {
          ...todo,
          text: editText,
        };
      }

      return todo;
    });

    // setter
    this.todosSignal = updatedTodos;
    // this.changeTodosSignal(updatedTodos);
  }

  removeTodo(removeId: string): void {
    // console.log('remove todo with id: ', id);
    // here i use 'update' instead of set
    this._todosSignal.update((todos) => {
      return todos.filter(
        (todo: TodoInterface): boolean => todo.id != removeId,
      );
    });

    this.saveTodosToLocalStorage();
  }

  toggleTodo(toggleId: string): void {
    // console.log('toggle todo with id: ', toggleId);
    this._todosSignal.update((todos: TodoInterface[]) => {
      return todos.map((todo: TodoInterface) => {
        if (todo.id == toggleId) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      });
    });

    this.saveTodosToLocalStorage();
  }

  toggleAllTodos(isCompleted: boolean): void {
    this._todosSignal.update((todos: TodoInterface[]) => {
      return todos.map((todo: TodoInterface) => {
        return {
          ...todo,
          isCompleted,
        };
      });
    });

    this.saveTodosToLocalStorage();
  }

  clearCompleted(): void {
    this._todosSignal.update((todos: TodoInterface[]) => {
      return todos.filter((todo: TodoInterface): boolean => !todo.isCompleted);
    });

    this.saveTodosToLocalStorage();
  }
}
