import { useState, useEffect } from 'react'
import { profileService } from '../services/portfolioService'
import { useToast } from '../context/ToastContext'

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading]  = useState(true)
  const [saving, setSaving]    = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    profileService.get()
      .then(setProfile)
      .catch(err => addToast(err.message, 'error'))
      .finally(() => setLoading(false))
  }, [addToast])

  const save = async (payload) => {
    setSaving(true)
    try {
      const updated = await profileService.update(payload)
      setProfile(updated)
      addToast('Profile saved')
      return updated
    } catch (err) {
      addToast(err.message || 'Failed to save profile', 'error')
      return null
    } finally {
      setSaving(false)
    }
  }

  return { profile, loading, saving, save }
}
