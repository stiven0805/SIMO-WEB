import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class PasswordRecoveryViewModel extends BaseViewModel {
  _initState() {
    this.setState({ email: '' })
  }
  updateField(field, value) {
    this.setState({ [field]: value })
  }
  async submitRecovery() {
    console.log('Recuperando password de', this.getState('email'))
    eventBus.emit('auth:recoverySent')
  }
}
