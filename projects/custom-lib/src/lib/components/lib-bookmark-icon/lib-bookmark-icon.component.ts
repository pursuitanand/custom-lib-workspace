import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-bookmark-icon',
  templateUrl: './lib-bookmark-icon.component.html',
  styleUrls: ['./lib-bookmark-icon.component.css'],
  standalone: false,
})
export class LibBookmarkIconComponent {
  @Input() filled = false;
  @Input() ariaLabel?: string;
  @Output() bookmarkChange = new EventEmitter<boolean>();

  get computedAriaLabel(): string {
    if (this.ariaLabel) return this.ariaLabel;
    return this.filled ? 'Remove bookmark' : 'Add bookmark';
  }

  toggle(): void {
    this.filled = !this.filled;
    this.bookmarkChange.emit(this.filled);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }
}
