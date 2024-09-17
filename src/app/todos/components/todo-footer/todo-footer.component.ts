import { Component, input, output } from '@angular/core';
import { FilterEnum } from '../../models/filter.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css',
})
export class TodoFooterComponent {
  filterEnum = FilterEnum;
  currentFilter = input.required<FilterEnum>();
  changeFilter = output<FilterEnum>();

  onChangeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.changeFilter.emit(filter);
  }
}
