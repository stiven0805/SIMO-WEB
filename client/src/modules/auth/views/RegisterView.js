import { BaseView } from '../../../core/BaseView.js'
import { RegisterViewModel } from '../viewmodels/RegisterViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class RegisterView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new RegisterViewModel()
    super({ ...options, viewModel })
  }

  render() {
    return `
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card" style="max-height: 90vh; overflow-y: auto;">
          <h1 class="auth-modal__title">¡Bienvenido a SIMÖ!</h1>
          <p class="auth-modal__subtitle">No solo son puntos, es cuidar<br>el medio ambiente</p>

          <form id="register-form" class="auth-modal__form" novalidate onsubmit="event.preventDefault();">
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="nombre">Nombre de usuario</label>
              <input
                class="auth-modal__input"
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre de usuario"
              />
            </div>
            
            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="cedula">Cédula</label>
              <input
                class="auth-modal__input"
                type="text"
                id="cedula"
                name="cedula"
                placeholder="Tu documento de identidad"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="email">Correo electrónico</label>
              <input
                class="auth-modal__input"
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                autocomplete="email"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="telefono">Teléfono</label>
              <input
                class="auth-modal__input"
                type="text"
                id="telefono"
                name="telefono"
                placeholder="Tu número de contacto"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="direccion">Dirección</label>
              <input
                class="auth-modal__input"
                type="text"
                id="direccion"
                name="direccion"
                placeholder="Tu dirección de residencia"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="password">Contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="password"
                name="password"
                placeholder="Crea una contraseña"
                autocomplete="new-password"
              />
            </div>

            <div class="auth-modal__form-group">
              <label class="auth-modal__label" for="confirmPassword">Confirmar contraseña</label>
              <input
                class="auth-modal__input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma la contraseña"
                autocomplete="new-password"
              />
            </div>

            <div id="register-error" class="auth-modal__error" style="color: red; margin-top: 10px; text-align: center;"></div>

            <p class="auth-modal__helper-text">Usa ocho o más letras, números y símbolos</p>

            <div class="auth-modal__actions" style="margin-top: 1rem;">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    `
  }

  _bindEvents() {
    this._addEvent('#auth-overlay', 'click', e => {
      if (e.target.id === 'auth-overlay') {
        eventBus.emit('auth:closeModal')
      }
    })

    this._addEvent('#nombre', 'input', e => {
      this._viewModel.updateField('nombre', e.target.value)
    })
    this._addEvent('#cedula', 'input', e => {
      this._viewModel.updateField('cedula', e.target.value)
    })
    this._addEvent('#email', 'input', e => {
      this._viewModel.updateField('email', e.target.value)
    })
    this._addEvent('#telefono', 'input', e => {
      this._viewModel.updateField('telefono', e.target.value)
    })
    this._addEvent('#direccion', 'input', e => {
      this._viewModel.updateField('direccion', e.target.value)
    })
    this._addEvent('#password', 'input', e => {
      this._viewModel.updateField('password', e.target.value)
    })
    this._addEvent('#confirmPassword', 'input', e => {
      this._viewModel.updateField('confirmPassword', e.target.value)
    })

    this._addEvent('#register-form', 'submit', async e => {
      e.preventDefault()
      e.stopPropagation()
      console.log('[RegisterView] submit event fired')
      await this._viewModel.submitRegister()
    })

    // Fallback: también escuchar click directo en el botón
    this._addEvent('button[type="submit"]', 'click', async e => {
      e.preventDefault()
      e.stopPropagation()
      console.log('[RegisterView] button click fired')
      await this._viewModel.submitRegister()
    })
  }
  
  _bindViewModel() {
    this._subscribe('error', error => {
      const errorDiv = this.$('#register-error')
      if (errorDiv) {
        errorDiv.textContent = error || ''
      }
    })
  }
}
