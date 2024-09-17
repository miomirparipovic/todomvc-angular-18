import { Component, OnInit, Signal } from '@angular/core';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { TodosService } from './services/todos.service';
import { TodoInterface } from './models/todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [TodoHeaderComponent, TodoFooterComponent, TodoMainComponent],
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  private _todosService: TodosService;
  todosSignal!: Signal<TodoInterface[]>;

  constructor(_todosService: TodosService) {
    this._todosService = _todosService;
  }

  ngOnInit(): void {
    this.todosSignal = this._todosService.todosSignal;
    // this.todosSignal = this._todosService.getTodosSignal();
  }

  handleNewTodo(event: string): void {
    this._todosService.addTodo(event);
  }
}
