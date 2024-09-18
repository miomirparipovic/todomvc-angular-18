import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: TodosComponent },
      { path: 'active', component: TodosComponent },
      { path: 'completed', component: TodosComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
