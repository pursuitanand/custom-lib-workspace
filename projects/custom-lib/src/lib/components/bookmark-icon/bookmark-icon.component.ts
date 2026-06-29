import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookmark-icon',
  templateUrl: './bookmark-icon.component.html',
  styleUrls: ['./bookmark-icon.component.css']
})
export class BookmarkIconComponent {

  @Input() filled = false;
  @Output() filledChange = new EventEmitter<boolean>();

  toggle(): void {
    this.filled = !this.filled;
    this.filledChange.emit(this.filled);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent page scroll on space
      this.toggle();
    }
  }
}