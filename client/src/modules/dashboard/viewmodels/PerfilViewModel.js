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
import { userService } from '../services/UserService.js'

export class PerfilViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      user: null,
      points: 0,
      devicesRecycled: 0,
      kgAvoided: 0,
      isEditing: false,
      editForm: {
        nombre: '',
        telefono: '',
        direccion: ''
      },
      isLoading: false
    })
  }

  /** @override */
  async onMount() {
    // Estado inicial visual optimista (convertimos a objeto plano para la vista)
    this.setState({ user: authStore.user.toJSON() })
    
    try {
      // Cargar info fresca del servidor (manejando fallos individuales)
      const profilePromise = userService.fetchProfile().catch(e => {
        console.warn('No se pudo cargar perfil fresco', e)
        return { usuario: authStore.user.toJSON() }
      })
      const statsPromise = userService.fetchStats().catch(e => {
        console.warn('No se pudieron cargar stats', e)
        return { dispositivos_reciclados: 0, kg_evitados: 0 }
      })
      const pointsPromise = userService.fetchPoints().catch(e => {
        console.warn('No se pudieron cargar puntos', e)
        return { puntos: 0 }
      })

      const [profileRes, statsRes, pointsRes] = await Promise.all([
        profilePromise,
        statsPromise,
        pointsPromise
      ])

      const user = profileRes.usuario;
      this.setState({ 
        user,
        editForm: {
          nombre: user.nombre || '',
          telefono: user.telefono || '',
          direccion: user.direccion || ''
        },
        points: pointsRes.puntos || 0,
        devicesRecycled: statsRes.dispositivos_reciclados || 0,
        kgAvoided: statsRes.kg_evitados || 0
      })
      
      // Actualizar authStore para que el Header también se entere
      authStore.setSession({ token: authStore.token, user })
    } catch (err) {
      console.error('Error general cargando perfil:', err)
    }
  }

  toggleEdit() {
    this.setState({ isEditing: !this.getState('isEditing') })
  }

  updateEditField(field, value) {
    const form = { ...this.getState('editForm') }
    form[field] = value
    this.setState({ editForm: form })
  }

  async saveProfile() {
    this.setState({ isLoading: true })
    try {
      const data = this.getState('editForm');
      const res = await userService.updateProfile(data);
      const updatedUser = res.usuario;
      
      this.setState({ 
        user: updatedUser,
        isEditing: false,
        isLoading: false
      })
      
      authStore.setSession({ token: authStore.token, user: updatedUser })
    } catch (err) {
      console.error('Error actualizando:', err)
      alert('Error al actualizar perfil');
      this.setState({ isLoading: false })
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    eventBus.emit('auth:logout')
  }
}
