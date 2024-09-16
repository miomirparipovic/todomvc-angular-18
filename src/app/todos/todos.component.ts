import { Component } from '@angular/core';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [TodoHeaderComponent, TodoFooterComponent, TodoMainComponent],
  styleUrl: './todos.component.css',
})
export class TodosComponent {}
