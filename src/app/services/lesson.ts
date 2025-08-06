import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../interfaces/lesson.interface';

const LESSONS_STORAGE_KEY = 'lessons';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  readonly #http = inject(HttpClient);

  readonly #lessonsState = signal<Lesson[]>([]);

  readonly lessons = this.#lessonsState.asReadonly();
  readonly currentLesson = signal<Lesson | undefined>(undefined);

  readonly total = computed(() => this.lessons().length);
  readonly completed = computed(() => this.lessons().filter(lesson => lesson.completed).length);

  constructor() {
    effect(() => {
      const lessons = this.#lessonsState();
      if (lessons.length > 0) {
        localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
      }
    });
  }

  loadLessons() {
    const storedLessons = localStorage.getItem(LESSONS_STORAGE_KEY);

    if (storedLessons) {
      this.#lessonsState.set(JSON.parse(storedLessons));
      this.currentLesson.set(this.#lessonsState()[0]);
      return;
    }

    this.#http.get<Lesson[]>('lessons.json').subscribe(lessons => {
      console.log(lessons)
      if (lessons) {
        console.log('Lessons fetched:', lessons);
        this.#lessonsState.set(lessons);
        this.currentLesson.set(lessons[0]);
      }
    });
  }

  setCurrentLesson(lesson: Lesson) {
    this.currentLesson.set(lesson);
  }

  completeLesson(lesson: Lesson) {
    this.#lessonsState.update(lessons =>
      lessons.map(l => (l.id === lesson.id ? {...l, completed: true} : l)),
    );
  }

  reset() {
    this.#lessonsState.update(lessons =>
      lessons.map(l => ({...l, completed: false}))
    );
  }
}
