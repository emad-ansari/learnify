/**
 * useCourseStore.ts — Learnify
 * 
 * Zustand store for courses state management.
 */

import { create } from 'zustand';
import { apiFetch } from '../api/apiConfig';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  category: string;
  lessons_count: number;
  duration: string;
  instructor: string;
  instructor_image?: string;
  reviews_count: number;
  lessons?: any[];
}

interface CourseState {
  courses: Course[];
  featuredCourses: Course[];
  popularCourses: Course[];
  currentCourse: Course | null;
  isLoading: boolean;
  error: string | null;

  fetchCourses: (params?: { category?: string; search?: string }) => Promise<void>;
  fetchFeatured: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchCourseDetails: (id: string) => Promise<void>;
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  featuredCourses: [],
  popularCourses: [],
  currentCourse: null,
  isLoading: false,
  error: null,

  fetchCourses: async (params) => {
    set({ isLoading: true, error: null });
    try {
      let query = '';
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.category) searchParams.append('category', params.category);
        if (params.search) searchParams.append('search', params.search);
        query = `?${searchParams.toString()}`;
      }
      const response = await apiFetch(`/courses${query}`);
      set({ courses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchFeatured: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/courses/featured');
      console.log('featured courses: ', response.data);
      set({ featuredCourses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPopular: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/courses/popular');
      set({ popularCourses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCourseDetails: async (id) => {
    set({ isLoading: true, error: null, currentCourse: null });
    try {
      const response = await apiFetch(`/courses/${id}`);
      set({ currentCourse: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCourseStore;
