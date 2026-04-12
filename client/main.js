/**
 * client/main.js
 * ---------------
 * Punto de entrada de la aplicación cliente.
 * Inicializa el HttpClient, restaura la sesión y monta la primera vista.
 */

import { httpClient } from './src/shared/utils/httpClient.js'
import { authStore } from './src/modules/auth/store/authStore.js'
import { eventBus } from './src/shared/utils/eventBus.js'
import { LandingView } from './src/modules/landing/views/LandingView.js'
import { QuienesSomosView } from './src/modules/landing/views/QuienesSomosView.js'
import { DescargarView } from './src/modules/landing/views/DescargarView.js'
import { ComoReciclarView } from './src/modules/landing/views/ComoReciclarView.js'
import { ComoCanjarView } from './src/modules/landing/views/ComoCanjarView.js'
import { RolesView } from './src/modules/landing/views/RolesView.js'
import { ColaboracionesView } from './src/modules/landing/views/ColaboracionesView.js'
import { LoginView } from './src/modules/auth/views/LoginView.js'
import { RegisterView } from './src/modules/auth/views/RegisterView.js'
import { PasswordRecoveryView } from './src/modules/auth/views/PasswordRecoveryView.js'
import { RecoverySentView } from './src/modules/auth/views/RecoverySentView.js'
import { ConfirmAccountView } from './src/modules/auth/views/ConfirmAccountView.js'
import { PerfilView } from './src/modules/dashboard/views/PerfilView.js'
import { HistorialView } from './src/modules/dashboard/views/HistorialView.js'
import { NotificacionesView } from './src/modules/dashboard/views/NotificacionesView.js'

// ─── Configuración global ──────────────────────────────────────────────────

httpClient.setBaseUrl('http://localhost:3000')

// ─── Restaurar sesión previa ───────────────────────────────────────────────

authStore.restore()

if (authStore.token) {
  httpClient.setAuthToken(authStore.token)
}

// ─── Enrutamiento simple ───────────────────────────────────────────────────

let currentView = null
let currentModal = null

/**
 * Monta una vista en el contenedor principal y destruye la anterior.
 * @param {typeof import('./src/core/BaseView').BaseView} ViewClass
 */
async function navigateTo(ViewClass) {
  if (currentView) {
    currentView.destroy()
  }

  // Cerrar cualquier modal abierto si navegamos a otra página completa
  closeModal()

  currentView = new ViewClass({ container: '#app' })
  await currentView.mount()

  // Scroll al inicio al cambiar de página
  window.scrollTo({ top: 0, behavior: 'instant' })
}

/**
 * Monta una vista de autenticación como modal sobre la página actual.
 * @param {typeof import('./src/core/BaseView').BaseView} ViewClass
 */
async function openModal(ViewClass) {
  if (currentModal) {
    currentModal.destroy()
  }
  
  const root = document.getElementById('modal-root')
  if (root) root.innerHTML = '' // Limpiar
  
  currentModal = new ViewClass({ container: '#modal-root' })
  await currentModal.mount()
}

/**
 * Cierra el modal de autenticación actual.
 */
function closeModal() {
  if (currentModal) {
    currentModal.destroy()
    currentModal = null
  }
  const root = document.getElementById('modal-root')
  if (root) root.innerHTML = ''
}

// ─── Mapa de páginas públicas ────────────────────────────────────────────

const PAGE_MAP = {
  'home': LandingView,
  'quienes-somos': QuienesSomosView,
  'descargar': DescargarView,
  'como-reciclar': ComoReciclarView,
  'como-canjear': ComoCanjarView,
  'roles': RolesView,
  'colaboraciones': ColaboracionesView,
  // Páginas autenticadas
  'perfil': PerfilView,
  'historial': HistorialView,
  'notificaciones': NotificacionesView,
}

// ─── Lógica de navegación por sesión ─────────────────────────────────────

if (authStore.isAuthenticated) {
  navigateTo(PerfilView)
} else {
  navigateTo(LandingView)
}

// ─── Eventos globales de navegación ──────────────────────────────────────

eventBus.on('auth:loginSuccess', ({ user } = {}) => {
  // Persiste el usuario en el authStore para que los ViewModels autenticados lo lean
  if (user) {
    authStore.setSession({ token: 'demo-token', user })
  }
  closeModal()
  navigateTo(PerfilView)
})

eventBus.on('auth:logout', () => {
  authStore.clearSession()
  httpClient.clearAuthToken()
  navigateTo(LandingView)
})

// ─── Eventos de Modales Auth ───────────────────────────────────────────────

eventBus.on('landing:goToLogin', () => openModal(LoginView))
eventBus.on('auth:goToRegister', () => openModal(RegisterView))
eventBus.on('auth:goToRecovery', () => openModal(PasswordRecoveryView))
eventBus.on('auth:recoverySent', () => openModal(RecoverySentView))
eventBus.on('auth:confirmAccount', () => openModal(ConfirmAccountView))
eventBus.on('auth:closeModal', () => closeModal())

/**
 * Navegación entre páginas públicas del landing.
 * Emitido por los enlaces del nav compartido.
 */
eventBus.on('landing:navigate', (page) => {
  const ViewClass = PAGE_MAP[page]
  if (ViewClass) {
    navigateTo(ViewClass)
  }
})
