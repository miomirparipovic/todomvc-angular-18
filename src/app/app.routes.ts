import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
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
  {
    path: '**',
    redirectTo: 'all',
  },
];
