import { Component, Input } from '@angular/core';
import { Topic } from '@web/app/core/services';

@Component({
  selector: 'nexus-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() public data!: Partial<Topic>;
}
