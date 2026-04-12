import { BaseView } from '../../../core/BaseView.js'
import { PasswordRecoveryViewModel } from '../viewmodels/PasswordRecoveryViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class PasswordRecoveryView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new PasswordRecoveryViewModel()
    super({ ...options, viewModel })
  }

  render() {
    return `
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card">
          <h1 class="auth-modal__title">Restablece tu contraseña</h1>
          <p class="auth-modal__subtitle">¿Cuál es tu correo electrónico?</p>

          <form id="recovery-form" class="auth-modal__form" novalidate>
            <div class="auth-modal__form-group">
              <input
                class="auth-modal__input"
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                autocomplete="email"
              />
            </div>

            <div class="auth-modal__actions" style="margin-top: 0.5rem;">
              <button
                class="auth-modal__btn auth-modal__btn--primary"
                type="submit"
              >
                Enviar correo electrónico de restablecimiento de contraseña
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

    this._addEvent('#recovery-form', 'submit', async e => {
      e.preventDefault()
      await this._viewModel.submitRecovery()
    })
  }
}
