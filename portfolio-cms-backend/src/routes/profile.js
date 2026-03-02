const router = require('express').Router()
const { protect } = require('../middleware/auth')
const ctrl = require('../controllers/profileController')

router.get('/',  protect, ctrl.getProfile)
router.put('/',  protect, ctrl.updateProfile)

module.exports = router
