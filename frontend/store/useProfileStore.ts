import { create } from 'zustand'
import { apiFetch } from '../api/apiConfig'

interface ProfileStats {
  totalEnrolled: number
  completedCourses: number
  totalTimeSpent: number
}

interface ProfileState {
  stats: ProfileStats | null
  isLoading: boolean
  error: string | null
  fetchStats: () => Promise<void>
}

const useProfileStore = create<ProfileState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiFetch('/profile/stats')
      set({ stats: response.data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },
}))

export default useProfileStore
