/**
 * server/index.js
 * ----------------
 * Punto de entrada del servidor Express.
 * Registra middlewares globales, rutas de módulos y el manejador de errores.
 */

import express from 'express'
import cors from 'cors'
import { config } from './src/config/index.js'
import { errorHandler } from './src/middleware/errorHandler.js'
import authRoutes from './src/modules/auth/auth.routes.js'
import userRoutes from './src/modules/user/user.routes.js'
import historyRoutes from './src/modules/history/history.routes.js'
import notificationsRoutes from './src/modules/notifications/notifications.routes.js'

const app = express()

// ─── Middlewares globales ──────────────────────────────────────────────────

app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Rutas de módulos ──────────────────────────────────────────────────────

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/notifications', notificationsRoutes)
// app.use('/dashboard', dashboardRoutes)

// ─── Manejador de errores (siempre al final) ───────────────────────────────

app.use(errorHandler)

// ─── Inicio del servidor ───────────────────────────────────────────────────

app.listen(config.server.port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${config.server.port}`)
  console.log(`   Entorno: ${config.server.env}`)
})

export default app
