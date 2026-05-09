/**
 * LoginViewModel
 * ---------------
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { authService } from '../services/AuthService.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class LoginViewModel extends BaseViewModel {
  _initState() {
    this.setState({
      isLoading: false,
      error: null,
      nombre: '', // backend espera 'nombre', no email
      password: '',
      fieldErrors: {},
    })
  }

  updateField(field, value) {
    // Si la vista envia 'email', lo trataremos como 'nombre' para el backend
    const targetField = field === 'email' ? 'nombre' : field;
    this.setState({ [targetField]: value, error: null })

    const fieldErrors = { ...this.getState('fieldErrors') }
    delete fieldErrors[targetField]
    this.setState({ fieldErrors })
  }

  async submitLogin() {
    if (!this._validateForm()) return

    this.startLoading()

    try {
      const res = await authService.login({
        nombre: this.getState('nombre'),
        password: this.getState('password')
      });
      
      this.stopLoading()
      
      if (res && res.token) {
        // El backend de ellos devuelve { token, usuario }
        eventBus.emit('auth:loginSuccess', { user: res.usuario, token: res.token });
      } else {
        eventBus.emit('auth:closeModal')
      }
      
    } catch (err) {
      this.stopLoading()
      alert('Error iniciando sesión: ' + (err.message || 'Usuario o contraseña incorrectos.'));
      this.setState({ error: 'Usuario o contraseña incorrectos.' })
    }
  }

  _validateForm() {
    const fieldErrors = {}
    const nombre = this.getState('nombre')
    const password = this.getState('password')

    if (!nombre) {
      fieldErrors.nombre = 'Ingresa tu nombre de usuario.'
    }

    if (!password) {
      fieldErrors.password = 'Ingresa tu contraseña.'
    }

    if (Object.keys(fieldErrors).length > 0) {
      this.setState({ fieldErrors })
      return false
    }

    return true
  }
}
