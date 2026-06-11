import { Router } from 'express'
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', getServices)
router.get('/:id', getService)

router.use(authenticate)
router.post('/', createService)
router.put('/:id', updateService)
router.delete('/:id', deleteService)

export default router
