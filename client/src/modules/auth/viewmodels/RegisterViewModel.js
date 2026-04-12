import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class RegisterViewModel extends BaseViewModel {
  _initState() {
    this.setState({ email: '', password: '', confirmPassword: '' })
  }
  updateField(field, value) {
    this.setState({ [field]: value })
  }
  async submitRegister() {
    // Lógica dummy por ahora
    console.log('Registrando con', this.getState('email'))
    eventBus.emit('auth:closeModal')
  }
}
