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
}
