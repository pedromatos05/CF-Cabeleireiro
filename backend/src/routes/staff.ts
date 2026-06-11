import { Router } from 'express'
import {
  getStaffList,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from '../controllers/staffController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', getStaffList)
router.get('/:id', getStaffMember)

router.use(authenticate)
router.post('/', createStaffMember)
router.put('/:id', updateStaffMember)
router.delete('/:id', deleteStaffMember)

export default router
