import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosSubject$ = new BehaviorSubject<TodoInterface[]>([]);
  private filterSubject$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private isAllTodosSelectedSubject$ = new BehaviorSubject<boolean>(false);

  readonly todos$ = this.todosSubject$.asObservable();
  readonly filter$ = this.filterSubject$.asObservable();
  readonly isAllTodosSelected$ = this.isAllTodosSelectedSubject$.asObservable();

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      id: 'id_' + `${Date.now().toString()}`,
      text: text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todosSubject$.getValue(), newTodo];

    this.todosSubject$.next(updatedTodos);
  }
}
