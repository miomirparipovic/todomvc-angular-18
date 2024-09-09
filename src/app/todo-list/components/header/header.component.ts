import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  text: string = '';

  constructor(private _todoService: TodosService) {}

  addTodo(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.key == 'Enter' && this.text) {
      // console.log('enter pressed', this.text);
      this._todoService.addTodo(this.text);
      this.text = '';
      return;
    }

    if (target) {
      this.text = target.value;
      // console.log('text', this.text);
      return;
    }
  }
}
