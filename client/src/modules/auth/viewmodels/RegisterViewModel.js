import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'
import { authService } from '../services/AuthService.js'

export class RegisterViewModel extends BaseViewModel {
  _initState() {
    this.setState({ 
      nombre: '', 
      cedula: '', 
      email: '', 
      password: '', 
      confirmPassword: '', 
      telefono: '', 
      direccion: '', 
      error: null 
    })
  }
  
  updateField(field, value) {
    console.log('[RegisterViewModel] updateField:', field, '=', value)
    this.setState({ [field]: value, error: null })
  }
  
  async submitRegister() {
    console.log('[RegisterViewModel] submitRegister() llamado. Estado actual:', JSON.stringify(this._state))
    const { nombre, cedula, email, password, confirmPassword, telefono, direccion } = this._state;
    
    if (!nombre || !cedula || !email || !password) {
      console.warn('[RegisterViewModel] Campos faltantes:', { nombre: !!nombre, cedula: !!cedula, email: !!email, password: !!password })
      alert('Error: Todos los campos son obligatorios (Nombre, Cédula, Correo, Contraseña).');
      this.setState({ error: 'Todos los campos son obligatorios' })
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Error: Las contraseñas no coinciden.');
      this.setState({ error: 'Las contraseñas no coinciden' })
      return;
    }
 
    try {
      this.setState({ error: 'Registrando...' })
      console.log('[RegisterViewModel] Enviando petición a /api/auth/register con:', { nombre, email, cedula, telefono, direccion })
      const res = await authService.register({ nombre, email, password, cedula, telefono, direccion });
      console.log('[RegisterViewModel] Respuesta del servidor:', res)
      // Guardar token y cerrar modal o auto-loguear
      if (res && res.token) {
        eventBus.emit('auth:loginSuccess', { user: res.usuario, token: res.token });
      } else {
        // Registro exitoso pero sin token, cerrar modal
        eventBus.emit('auth:closeModal')
      }
    } catch (err) {
      console.error('[RegisterViewModel] Error en registro:', err);
      alert('Error: ' + (err.message || 'Error al registrar usuario'));
      this.setState({ error: err.message || 'Error al registrar usuario' });
    }
  }
}
