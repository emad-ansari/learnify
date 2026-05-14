import { create } from 'zustand';
import Toast from 'react-native-toast-message';
import { apiFetch } from '../api/apiConfig';

export interface EnrolledCourse {
  id: string;
  course_id: string;
  course_title: string;
  course_thumbnail: string;
  progress: number;
  course_author: string;
}

interface EnrollmentState {
  myCourses: EnrolledCourse[];
  isLoading: boolean;
  error: string | null;

  fetchMyCourses: () => Promise<void>;
  enroll: (courseId: string) => Promise<void>;
  updateProgress: (courseId: string, lessonId: string) => Promise<void>;
  isEnrolled: (courseId: string) => boolean;
}

const useEnrollmentStore = create<EnrollmentState>((set, get) => ({
  myCourses: [],
  isLoading: false,
  error: null,

  fetchMyCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/enroll/my-courses');
      set({ myCourses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  enroll: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await apiFetch('/enroll', {
        method: 'POST',
        body: { courseId },
      });
      // Re-fetch to update the list
      const response = await apiFetch('/enroll/my-courses');
      set({ myCourses: response.data, isLoading: false });
      Toast.show({
        type: 'success',
        text1: 'Enrolled Successfully!',
        text2: 'The course has been added to your learning list.',
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      Toast.show({
        type: 'error',
        text1: 'Enrollment Failed',
        text2: error.message,
      });
      throw error; // Re-throw to handle in UI if needed
    }
  },

  updateProgress: async (courseId, lessonId) => {
    try {
      await apiFetch('/enroll/progress', {
        method: 'PATCH',
        body: { courseId, lessonId },
      });
      // Optionally update local state
    } catch (error: any) {
      console.error('Update progress error:', error);
    }
  },

  isEnrolled: (courseId) => {
    return get().myCourses.some(c => c.course_id === courseId);
  },
}));

export default useEnrollmentStore;
