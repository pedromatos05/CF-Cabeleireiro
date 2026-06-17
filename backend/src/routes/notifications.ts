import { Router } from 'express'
import {
  sendBookingConfirmation,
  sendBookingReminder,
  sendBookingCancellation,
  sendConfirmationEmail,
} from '../controllers/notificationController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Email de confirmação disparado pelo admin.
// TODO(auth): proteger com `authenticate` quando o login do admin (Supabase)
// estiver ligado. Por agora o admin usa dados mock e não envia token, por isso
// esta rota fica pública para o fluxo funcionar ponta-a-ponta.
router.post('/send-confirmation', sendConfirmationEmail)

router.use(authenticate)
router.post('/booking-confirmation', sendBookingConfirmation)
router.post('/booking-reminder', sendBookingReminder)
router.post('/booking-cancellation', sendBookingCancellation)

export default router
