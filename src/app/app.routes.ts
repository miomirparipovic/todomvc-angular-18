import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  // {
  //   path: 'active',
  //   loadComponent: () =>
  //     import('./todos/todos.component').then((com) => com.TodosComponent),
  // },
  {
    path: 'all',
    component: TodosComponent,
  },
  {
    path: 'active',
    component: TodosComponent,
  },
  {
    path: 'completed',
    component: TodosComponent,
  },
  {
    path: '',
    redirectTo: '/all',
    pathMatch: 'full',
  },
];
