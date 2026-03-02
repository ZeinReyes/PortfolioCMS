const router = require('express').Router()

const createCrudRouter = (ctrl, protect) => {
  const r = require('express').Router()

  r.get('/',         protect, ctrl.getAll)
  r.get('/:id',      protect, ctrl.getOne)
  r.post('/',        protect, ctrl.create)
  r.put('/:id',      protect, ctrl.update)
  r.delete('/:id',   protect, ctrl.remove)
  r.patch('/:id/visibility', protect, ctrl.toggleVisibility)

  return r
}

module.exports = { createCrudRouter }
