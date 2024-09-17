import { Injectable, Signal, signal } from '@angular/core';
import { TodoInterface } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _todosSignal = signal<TodoInterface[]>([]);

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

  getTodosSignal(): Signal<TodoInterface[]> {
    return this._todosSignal;
  }
}
