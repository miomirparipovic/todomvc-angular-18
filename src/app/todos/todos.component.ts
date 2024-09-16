import { Component } from '@angular/core';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [TodoHeaderComponent, TodoFooterComponent, TodoMainComponent],
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  private _todosService: TodosService;

  constructor(_todosService: TodosService) {
    this._todosService = _todosService;
  }

  handleNewTodo(event: string): void {
    // console.log('event in todos', event);

    this._todosService.addTodo(event);
  }
}
