const router  = require('express').Router()
const { body } = require('express-validator')
const { validate } = require('../middleware/validate')
const { protect }  = require('../middleware/auth')
const ctrl = require('../controllers/authController')

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validate,
  ctrl.login
)

router.get('/me', protect, ctrl.getMe)

router.put('/change-password', protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  validate,
  ctrl.changePassword
)

module.exports = router
