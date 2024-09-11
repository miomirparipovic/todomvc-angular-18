import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() areThereAnyTodos!: boolean | null;
  @Input() numberOfVisibleTodos?: number;

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
}
