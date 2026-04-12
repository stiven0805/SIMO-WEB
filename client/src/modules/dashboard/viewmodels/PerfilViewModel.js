/**
 * PerfilViewModel
 * ----------------
 * Gestiona el estado de la vista de Perfil del usuario autenticado.
 *
 * Lee el usuario actual del authStore (solo lectura desde otro módulo).
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { authStore } from '../../auth/store/authStore.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class PerfilViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      user: null,
      points: 1100,
      devicesRecycled: 3,
      kgAvoided: 12,
    })
  }

  /** @override */
  async onMount() {
    // Lee el usuario del authStore — solo lectura (regla MVVM)
    this.setState({ user: authStore.user })
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    eventBus.emit('auth:logout')
  }
}
