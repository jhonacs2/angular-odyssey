import type {OutputData} from '@editorjs/editorjs';

export interface Lesson {
  id: string;
  title: string;
  content: OutputData;
  completed: boolean;
}
