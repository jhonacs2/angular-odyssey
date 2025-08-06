import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LessonService} from '../../services/lesson';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'aod-lesson-list',
  imports: [MatListModule, MatIconModule],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent {
  #lessonService = inject(LessonService);

  lessons = this.#lessonService.lessons;

  selectLesson(lessonId: string) {
    const lesson = this.lessons().find(l => l.id === lessonId);
    if (lesson) {
      this.#lessonService.setCurrentLesson(lesson);
    }
  }
}
