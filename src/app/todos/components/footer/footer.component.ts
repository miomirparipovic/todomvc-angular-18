import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterEnum } from '../../types/filter.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() areThereAnyTodos!: boolean | null;
  @Input() numberOfVisibleTodos?: number;
  @Input() currentFilter!: FilterEnum | null;
  @Output() changeFilter = new EventEmitter<FilterEnum>();
  filterEnum = FilterEnum;

  itemMessage(numberOfVisibleTodos: number | undefined): string | undefined {
    if (numberOfVisibleTodos == undefined) {
      return;
    }

    let word = 'item';

    if (this.numberOfVisibleTodos != 1) {
      word += 's';
    }

    return word + ' ' + 'left';
  }

  onChangeFilter(event: Event, filter: FilterEnum) {
    event.preventDefault();
    this.changeFilter.emit(filter);
  }
}
