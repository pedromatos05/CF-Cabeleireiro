import { Router } from 'express'
import {
  sendBookingConfirmation,
  sendBookingReminder,
  sendBookingCancellation,
} from '../controllers/notificationController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)
router.post('/booking-confirmation', sendBookingConfirmation)
router.post('/booking-reminder', sendBookingReminder)
router.post('/booking-cancellation', sendBookingCancellation)

export default router
