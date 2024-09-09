import { Component } from '@angular/core';

// components
import { HeaderComponent } from './components/header/header.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [HeaderComponent, TodoMainComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {}
