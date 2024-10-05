// coursesInterface.ts

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  durationHours: number;
  mode: string;
  language: string;
  urlVideo: string;
}

export interface CourseCatalog {
  courses: Course[];
}
