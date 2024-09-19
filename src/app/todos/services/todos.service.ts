import { Injectable, Signal, signal } from '@angular/core';
import { TodoInterface } from '../models/todo.interface';
import { FilterEnum } from '../models/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _todosSignal = signal<TodoInterface[]>([]);
  private _filterSignal = signal<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      id: 'id_' + `${Date.now().toString()}`,
      text,
      isCompleted: false,
    };

    this._todosSignal.update((todos) => [...todos, newTodo]);
  }

  // use one of these
  get todosSignal(): Signal<TodoInterface[]> {
    return this._todosSignal;
  }

  // getTodosSignal(): Signal<TodoInterface[]> {
  //   return this._todosSignal;
  // }

  set todosSignal(newTodos: TodoInterface[]) {
    this._todosSignal.set(newTodos);
  }

  // changeTodosSignal(newTodos: TodoInterface[]): void {
  //   this._todosSignal.set(newTodos);
  // }

  // use one of these
  get filterSignal(): Signal<FilterEnum> {
    return this._filterSignal;
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
  }
}
