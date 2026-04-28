/**
 * useBookmarkStore.ts — Learnify
 * 
 * Zustand store for bookmarks state management.
 */

import { create } from 'zustand';
import { apiFetch } from '../api/apiConfig';

interface Bookmark {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;

  fetchBookmarks: () => Promise<void>;
  addBookmark: (courseId: string) => Promise<void>;
  removeBookmark: (courseId: string) => Promise<void>;
  isBookmarked: (courseId: string) => boolean;
}

const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  isLoading: false,
  error: null,

  fetchBookmarks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/bookmarks');
      set({ bookmarks: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addBookmark: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await apiFetch('/bookmarks', {
        method: 'POST',
        body: { courseId },
      });
      // Re-fetch to keep state in sync
      const response = await apiFetch('/bookmarks');
      set({ bookmarks: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  removeBookmark: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await apiFetch(`/bookmarks/${courseId}`, {
        method: 'DELETE',
      });
      // Filter out locally for speed or re-fetch
      set((state) => ({
        bookmarks: state.bookmarks.filter(b => b.id !== courseId),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  isBookmarked: (courseId) => {
    return get().bookmarks.some(b => b.id === courseId);
  },
}));

export default useBookmarkStore;
