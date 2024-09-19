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
  currentFilterSignal: Signal<FilterEnum>;
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
  activeCount: Signal<number> = computed((): number => {
    const todos: TodoInterface[] = this._todosService.todosSignal();

    return todos.filter((todo: TodoInterface): boolean => !todo.isCompleted)
      .length;
  });
  areAnyTodosLeft: Signal<boolean> = computed((): boolean => {
    return this._todosService.todosSignal().length > 0;
  });

  constructor(private _todosService: TodosService) {
    this.currentFilterSignal = this._todosService.filterSignal;
  }

  handleNewTodo(event: string): void {
    this._todosService.addTodo(event);
  }

  handleChangeFilter(filter: FilterEnum): void {
    this._todosService.filterSignal = filter;
  }

  // handleChangeFilter(filter: FilterEnum): void {
  //   this._todosService.changeFilterSignal(filter);
  // }

  handleEditedTextWithId(editedTextAndId: string[]): void {
    const [editTodoId, editText] = editedTextAndId;

    this._todosService.updateEditedTodoText(editTodoId, editText);
  }

  handleRemoveTodo(id: string): void {
    this._todosService.removeTodo(id);
  }

  handleToggleTodo(id: string): void {
    this._todosService.toggleTodo(id);
  }
}
