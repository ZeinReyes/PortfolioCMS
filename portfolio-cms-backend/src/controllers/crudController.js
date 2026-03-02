const createCrudController = (Model) => ({

  getAll: async (req, res, next) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: -1 })
      res.json(items)
    } catch (err) { next(err) }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id)
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json(item)
    } catch (err) { next(err) }
  },

  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body)
      res.status(201).json(item)
    } catch (err) { next(err) }
  },

  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json(item)
    } catch (err) { next(err) }
  },

  remove: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json({ success: true, id: req.params.id })
    } catch (err) { next(err) }
  },

  toggleVisibility: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id)
      if (!item) return res.status(404).json({ message: 'Not found' })
      item.visible = !item.visible
      await item.save()
      res.json(item)
    } catch (err) { next(err) }
  },

})

module.exports = { createCrudController }
