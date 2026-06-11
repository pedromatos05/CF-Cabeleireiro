import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingsRouter from './routes/bookings'
import clientsRouter from './routes/clients'
import servicesRouter from './routes/services'
import staffRouter from './routes/staff'
import notificationsRouter from './routes/notifications'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000', process.env.ADMIN_URL || 'http://localhost:3001'],
  })
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: 'cf-cabeleireiro-api', timestamp: new Date() })
})

app.use('/api/bookings', bookingsRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/services', servicesRouter)
app.use('/api/staff', staffRouter)
app.use('/api/notifications', notificationsRouter)

app.use(errorHandler)

export default app
