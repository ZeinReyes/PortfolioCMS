import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../context/ToastContext'

export function useCrud(service) {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const { addToast } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await service.getAll()
      setItems(data)
    } catch (err) {
      addToast(err.message || 'Failed to load data', 'error')
    } finally {
      setLoading(false)
    }
  }, [service, addToast])

  useEffect(() => { load() }, [load])

  const create = async (payload) => {
    setSaving(true)
    try {
      const item = await service.create(payload)
      setItems(prev => [...prev, item])
      addToast('Item created successfully')
      return item
    } catch (err) {
      addToast(err.message || 'Failed to create item', 'error')
      return null
    } finally {
      setSaving(false)
    }
  }

  const update = async (id, payload) => {
    setSaving(true)
    try {
      const updated = await service.update(id, payload)
      setItems(prev => prev.map(i => i._id === id ? updated : i))
      addToast('Changes saved')
      return updated
    } catch (err) {
      addToast(err.message || 'Failed to update item', 'error')
      return null
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    try {
      await service.remove(id)
      setItems(prev => prev.filter(i => i._id !== id))
      addToast('Item deleted')
    } catch (err) {
      addToast(err.message || 'Failed to delete item', 'error')
    }
  }

  const toggleVisibility = async (id) => {
    try {
      const updated = await service.toggleVisibility(id)
      setItems(prev => prev.map(i => i._id === id ? updated : i))
      addToast(`Item ${updated.visible ? 'shown' : 'hidden'} on portfolio`)
    } catch (err) {
      addToast(err.message || 'Failed to update visibility', 'error')
    }
  }

  return { items, loading, saving, create, update, remove, toggleVisibility, reload: load }
}
