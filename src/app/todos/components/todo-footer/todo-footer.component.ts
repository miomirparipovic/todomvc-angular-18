import { Component, computed, input, output } from '@angular/core';
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
  activeCount = input.required<number>();
  areAnyTodos = input.required<boolean>();
  changeFilter = output<FilterEnum>();
  activeCountMessage = computed((): string => {
    let word: string = 'item';

    if (this.activeCount() != 1) {
      word += 's';
    }

    return word + ' ' + 'left';
  });

  onChangeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.changeFilter.emit(filter);
  }
}
