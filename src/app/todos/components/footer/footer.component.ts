import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterEnum } from '../../types/filter.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() areThereAnyTodos!: boolean | null;
  @Input() numberOfActiveTodos!: number | null;
  @Input() numberOfCompletedTodos!: number | null;
  @Input() currentFilter!: FilterEnum | null;
  @Output() changeFilter = new EventEmitter<FilterEnum>();
  @Output() clearCompleted = new EventEmitter<void>();
  filterEnum = FilterEnum;

  itemMessage(numberOfVisibleTodos: number | null): string | undefined {
    if (numberOfVisibleTodos == undefined) {
      return;
    }

    let word = 'item';

    if (this.numberOfActiveTodos != 1) {
      word += 's';
    }

    return word + ' ' + 'left';
  }

  onChangeFilter(event: Event, filter: FilterEnum) {
    event.preventDefault();
    this.changeFilter.emit(filter);
  }

  onClearCompleted(): void {
    this.clearCompleted.emit();
  }
}
