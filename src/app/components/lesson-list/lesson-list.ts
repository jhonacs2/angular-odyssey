import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent {
  readonly lessonService = inject(LessonService);

  constructor() {
  }

  selectLesson(lessonId: string) {
    const lesson = this.lessonService.lessons().find(l => l.id === lessonId);
    if (lesson) {
      this.lessonService.setCurrentLesson(lesson);
    }
  }
}