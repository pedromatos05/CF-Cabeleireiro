import { Router } from 'express'
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)
router.get('/', getBookings)
router.get('/:id', getBooking)
router.post('/', createBooking)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

export default router
