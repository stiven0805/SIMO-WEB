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
        <div class="auth-modal__card">
          <h1 class="auth-modal__title">¡Bienvenido a SIMÖ!</h1>
          <p class="auth-modal__subtitle">No solo son puntos, es cuidar<br>el medio ambiente</p>

          <form id="register-form" class="auth-modal__form" novalidate>
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

    this._addEvent('#email', 'input', e => {
      this._viewModel.updateField('email', e.target.value)
    })
    
    this._addEvent('#password', 'input', e => {
      this._viewModel.updateField('password', e.target.value)
    })
    
    this._addEvent('#confirmPassword', 'input', e => {
      this._viewModel.updateField('confirmPassword', e.target.value)
    })

    this._addEvent('#register-form', 'submit', async e => {
      e.preventDefault()
      await this._viewModel.submitRegister()
    })
  }
}
