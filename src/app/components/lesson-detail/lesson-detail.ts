
import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonDetailComponent implements OnInit, OnDestroy {
  readonly lessonService = inject(LessonService);
  private editor: EditorJS | undefined;

  constructor() {
    effect(() => {
      const lesson = this.lessonService.currentLesson();
      if (lesson) {
        this.initializeEditor(lesson.content);
      } else {
        this.destroyEditor();
      }
    });
  }

  ngOnInit() {
    // No longer needed as effect handles initialization
  }

  ngOnDestroy() {
    this.destroyEditor();
  }

  private initializeEditor(content: OutputData) {
    this.destroyEditor(); // Ensure no multiple instances
    this.editor = new EditorJS({
      holder: 'editorjs',
      readOnly: true,
      data: content,
    });
  }

  private destroyEditor() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = undefined;
    }
  }

  markAsCompleted() {
    const currentLesson = this.lessonService.currentLesson();
    if (currentLesson) {
      this.lessonService.completeLesson(currentLesson);
    }
  }
}
