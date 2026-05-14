import { create } from 'zustand'
import Toast from 'react-native-toast-message'
import { apiFetch } from '../api/apiConfig'
import { Course } from './useCourseStore'

interface BookmarkState {
  bookmarks: Course[]
  isLoading: boolean
  error: string | null
  fetchBookmarks: () => Promise<void>
  addBookmark: (courseId: string) => Promise<void>
  removeBookmark: (courseId: string) => Promise<void>
  toggleBookmark: (course: Course) => Promise<void>
  isBookmarked: (courseId: string) => boolean
}

const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  isLoading: false,
  error: null,

  fetchBookmarks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiFetch('/bookmarks')
      set({ bookmarks: response.data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  addBookmark: async (courseId: string) => {
    try {
      await apiFetch('/bookmarks', {
        method: 'POST',
        body: { courseId },
      })
      // Refresh bookmarks after adding
      await get().fetchBookmarks()
      Toast.show({
        type: 'success',
        text1: 'Bookmarked!',
        text2: 'Course saved to your favorites.',
      })
    } catch (error: any) {
      set({ error: error.message })
      Toast.show({
        type: 'error',
        text1: 'Bookmark Failed',
        text2: error.message,
      })
    }
  },

  removeBookmark: async (courseId: string) => {
    try {
      await apiFetch(`/bookmarks/${courseId}`, {
        method: 'DELETE',
      })
      // Update local state by filtering out the removed course
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== courseId),
      }))
      Toast.show({
        type: 'info',
        text1: 'Removed',
        text2: 'Course removed from bookmarks.',
      })
    } catch (error: any) {
      set({ error: error.message })
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      })
    }
  },

  toggleBookmark: async (course: Course) => {
    const isAlreadyBookmarked = get().isBookmarked(course.id)
    if (isAlreadyBookmarked) {
      await get().removeBookmark(course.id)
    } else {
      await get().addBookmark(course.id)
    }
  },

  isBookmarked: (courseId: string) => {
    return get().bookmarks.some((b) => b.id === courseId)
  },
}))

export default useBookmarkStore
