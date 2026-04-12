/**
 * LoginView
 * ----------
 * Renderiza el formulario de login y reacciona a los cambios del LoginViewModel.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con LoginViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { LoginViewModel } from '../viewmodels/LoginViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class LoginView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new LoginViewModel()
    super({ ...options, viewModel })
  }

  // ─── Renderizado inicial ──────────────────────────────────────────────────

  render() {
    return `
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card">
          <h1 class="auth-modal__title">¡Bienvenido a SIMÖ!</h1>

          <div id="login-error" class="alert alert--error" style="display:none; margin-top:1rem;"></div>

          <form id="login-form" class="auth-modal__form" novalidate>
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="email">Correo electrónico</label>
              <input
                class="auth-modal__input"
                type="email"
                id="email"
                name="email"
                placeholder="Correo"
                autocomplete="email"
              />
              <span class="form-error" id="email-error"></span>
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="password">Contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                autocomplete="current-password"
              />
              <span class="form-error" id="password-error"></span>
            </div>

            <a href="#" class="auth-modal__link" id="link-recovery">¿Olvidaste tu contraseña?</a>

            <div class="auth-modal__actions">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
                id="login-submit"
              >
                Iniciar sesión
              </button>
              
              <button
                class="auth-modal__btn auth-modal__btn--secondary"
                type="button"
                id="btn-register"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    `
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  _bindViewModel() {
    this._subscribe('isLoading', isLoading => {
      const btn = this.$('#login-submit')
      if (!btn) return
      btn.disabled = isLoading
      btn.textContent = isLoading ? 'Iniciando...' : 'Iniciar sesión'
    })

    this._subscribe('error', error => {
      const errorEl = this.$('#login-error')
      if (!errorEl) return
      if (error) {
        errorEl.textContent = error
        errorEl.style.display = 'block'
      } else {
        errorEl.style.display = 'none'
      }
    })

    this._subscribe('fieldErrors', fieldErrors => {
      this._renderFieldErrors(fieldErrors)
    })
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  _bindEvents() {
    // Cerrar modal al clickear afuera de la tarjeta
    this._addEvent('#auth-overlay', 'click', e => {
      if (e.target.id === 'auth-overlay') {
        eventBus.emit('auth:closeModal')
      }
    })

    // Actualizar campos
    this._addEvent('#email', 'input', e => {
      this._viewModel.updateField('email', e.target.value)
    })

    this._addEvent('#password', 'input', e => {
      this._viewModel.updateField('password', e.target.value)
    })

    // Submits y Navegación
    this._addEvent('#login-form', 'submit', async e => {
      e.preventDefault()
      await this._viewModel.submitLogin()
    })

    this._addEvent('#link-recovery', 'click', e => {
      e.preventDefault()
      eventBus.emit('auth:goToRecovery')
    })

    this._addEvent('#btn-register', 'click', e => {
      e.preventDefault()
      eventBus.emit('auth:goToRegister')
    })
  }

  // ─── Actualizaciones parciales del DOM ───────────────────────────────────

  _renderFieldErrors(fieldErrors = {}) {
    const fields = ['email', 'password']
    fields.forEach(field => {
      const errorEl = this.$(`#${field}-error`)
      const inputEl = this.$(`#${field}`)
      if (!errorEl || !inputEl) return

      const message = fieldErrors[field] || ''
      errorEl.textContent = message
      if (message) {
        inputEl.style.borderColor = '#dc2626'
      } else {
        inputEl.style.borderColor = 'var(--simo-text-dark, #1a1a1a)'
      }
    })
  }
}
