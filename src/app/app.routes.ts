import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(
        (com) => com.TodoListComponent,
      ),
  },
];
