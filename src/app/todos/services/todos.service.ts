import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<TodoInterface[]>([]);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      id: 'id_' + `${Date.now().toString()}`,
      text,
      isCompleted: false,
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
  }
}
