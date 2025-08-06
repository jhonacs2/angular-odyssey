import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonListComponent } from './components/lesson-list/lesson-list';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail';
import { LessonService } from './services/lesson';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LessonListComponent, LessonDetailComponent, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly lessonService = inject(LessonService);

  ngOnInit(): void {
    this.lessonService.loadLessons();
  }

  resetProgress() {
    this.lessonService.reset();
  }
}
