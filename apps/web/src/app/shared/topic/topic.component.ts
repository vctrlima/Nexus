import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from '@web/app/core/interfaces/topic.interface';

@Component({
  selector: 'nexus-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() public data!: Partial<Topic>;
  @Input() public disabled?: boolean = false;
  @Output() public toggle = new EventEmitter<boolean>();

  public onToggle() {
    if (this.disabled) return;
    this.toggle.emit(!this.data.selected);
  }
}
