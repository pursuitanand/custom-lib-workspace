import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookmark-icon',
  templateUrl: './bookmark-icon.component.html',
  styleUrls: ['./bookmark-icon.component.css']
})
export class BookmarkIconComponent {

  @Input() filled = false;
  /** Disables interaction while a consumer's backend call is in flight. */
  @Input() loading = false;

  /**
   * Emits the intended new filled state when the user requests a toggle.
   * `filled` itself is not changed here — the consumer should only update
   * the `filled` input once its backend call for this request succeeds.
   */
  @Output() toggleRequested = new EventEmitter<boolean>();

  toggle(): void {
    if (this.loading) {
      return;
    }
    this.toggleRequested.emit(!this.filled);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent page scroll on space
      this.toggle();
    }
  }
}