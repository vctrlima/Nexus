import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Like, Post } from '@web/app/core/services/post/post.service';

@Component({
  selector: 'nexus-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() public data!: Post;
  @Input() public logged = false;
  @Input() public like!: Like | undefined;
  @Output() private readonly toggleLike = new EventEmitter<void>();

  public onToggleLike() {
    this.toggleLike.emit();
  }
}
