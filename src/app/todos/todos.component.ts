import { Component, computed, Signal } from '@angular/core';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { TodosService } from './services/todos.service';
import { TodoInterface } from './models/todo.interface';
import { FilterEnum } from './models/filter.enum';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [TodoHeaderComponent, TodoFooterComponent, TodoMainComponent],
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  visibleTodosSignal: Signal<TodoInterface[]> = computed(
    (): TodoInterface[] => {
      const todos = this._todosService.todosSignal();
      const currentFilter = this._todosService.filterSignal();

      if (currentFilter == FilterEnum.active) {
        return todos.filter(
          (todo: TodoInterface): boolean => !todo.isCompleted,
        );
      }

      if (currentFilter == FilterEnum.completed) {
        return todos.filter((todo: TodoInterface): boolean => todo.isCompleted);
      }

      return todos;
    },
  );

  constructor(private _todosService: TodosService) {}

  handleNewTodo(event: string): void {
    this._todosService.addTodo(event);
  }
}
