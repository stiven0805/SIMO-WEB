import { BaseView } from '../../../core/BaseView.js'
import { ConfirmAccountViewModel } from '../viewmodels/ConfirmAccountViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class ConfirmAccountView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new ConfirmAccountViewModel()
    super({ ...options, viewModel })
  }

  render() {
    return `
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card auth-modal__card--info">
          <h1 class="auth-modal__title" style="margin-bottom: 1rem;">Confirma tu cuenta</h1>
          <p class="auth-modal__subtitle" style="margin-bottom: 0;">Revisa tu correo electrónico</p>
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
  }
}
