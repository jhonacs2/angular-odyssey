import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {LessonService} from '../../services/lesson';
import EditorJS, {OutputData} from '@editorjs/editorjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'aod-lesson-detail',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonDetailComponent {
  #lessonService = inject(LessonService);
  #editor: EditorJS | undefined;

  lesson = this.#lessonService.currentLesson;

  #lessonEffect = effect((onCleanup) => {
    if (this.lesson()) {
      this.#initializeEditor(this.lesson()!.content);
    } else {
      this.#destroyEditor();
    }

    onCleanup(() => this.#destroyEditor())
  });

  readonly EDITOR_CONTAINER_ID = "angularEditorJs";

  markAsCompleted() {
    const currentLesson = this.#lessonService.currentLesson();
    if (currentLesson) {
      this.#lessonService.completeLesson(currentLesson);
    }
  }

  #initializeEditor(content: OutputData) {
    this.#destroyEditor();
    this.#editor = new EditorJS({
      holder: this.EDITOR_CONTAINER_ID,
      readOnly: true,
      data: content,
    });
  }

  #destroyEditor() {
    if (this.#editor) {
      this.#editor.destroy();
      this.#editor = undefined;
    }
  }
}
