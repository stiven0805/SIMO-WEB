import { BaseView } from '../../../core/BaseView.js'
import { RecoverySentViewModel } from '../viewmodels/RecoverySentViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class RecoverySentView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new RecoverySentViewModel()
    super({ ...options, viewModel })
  }

  render() {
    return `
      <div class="auth-modal__overlay" id="auth-overlay">
        <div class="auth-modal__card auth-modal__card--info">
          <h1 class="auth-modal__title">Correo de recuperación enviado</h1>
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
