/**
 * PerfilView
 * -----------
 * Vista principal del perfil de usuario autenticado.
 */

import { BaseView } from '../../../core/BaseView.js'
import { PerfilViewModel } from '../viewmodels/PerfilViewModel.js'
import { bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'
import { eventBus } from '../../../shared/utils/eventBus.js'
import { AuthNav, SharedFooter } from '../../../shared/components/Layouts.js'

export class PerfilView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new PerfilViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la vista de Perfil.
   * @returns {string}
   */
  render() {
    const user = this._viewModel.getState('user') || {}
    const points = this._viewModel.getState('points') || 0
    const devicesRecycled = this._viewModel.getState('devicesRecycled') || 0
    const kgAvoided = this._viewModel.getState('kgAvoided') || 0
    const isEditing = this._viewModel.getState('isEditing')
    const editForm = this._viewModel.getState('editForm') || {}
    const isLoading = this._viewModel.getState('isLoading')

    // Avatar (primer nombre + primer apellido simplificado)
    const parts = (user.nombre || 'Usuario').split(' ')
    const avatarNameHtml = parts.slice(0, 2).join('<br>')

    return `
      <div class="landing">

        ${AuthNav('perfil', 'default')}

        <!-- ─── HERO PERFIL ──────────────────────────────────── -->
        <section class="perfil-hero">
          <div class="perfil-hero__inner">

            <!-- Columna izquierda: Datos del usuario -->
            <div class="perfil-hero__left">
              
              <div id="perfil-display-mode" style="display: ${isEditing ? 'none' : 'block'};">
                <div class="perfil-info-list">
                  
                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-user.png" alt="Usuario">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-name">${user.nombre || 'Usuario'}</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-cedula.png" alt="Cédula">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-cedula">${user.cedula || '--'}</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-telefono.png" alt="Teléfono">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-telefono">${user.telefono || '--'}</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-direccion.png" alt="Dirección">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-direccion">${user.direccion || '--'}</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-email.png" alt="Email">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-email">${user.email || '--'}</span>
                  </div>

                </div>
                <button class="perfil-btn perfil-btn--edit" id="perfil-edit-btn">Editar información</button>
              </div>

              <!-- Formulario de Edición -->
              <div id="perfil-edit-mode" style="display: ${isEditing ? 'block' : 'none'}; width: 100%;">
                <form id="perfil-edit-form" class="auth-modal__form" style="padding: 0;">
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Nombre</label>
                    <input class="auth-modal__input" type="text" id="edit-nombre" value="${editForm.nombre || ''}" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Teléfono</label>
                    <input class="auth-modal__input" type="text" id="edit-telefono" value="${editForm.telefono || ''}" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Dirección</label>
                    <input class="auth-modal__input" type="text" id="edit-direccion" value="${editForm.direccion || ''}" />
                  </div>
                  <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="perfil-btn perfil-btn--edit" id="perfil-save-btn">
                      ${isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button type="button" class="perfil-btn" id="perfil-cancel-btn" style="background: transparent; border: 1px solid white; color: white;">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Columna derecha: Avatar + Puntos -->
            <div class="perfil-hero__right">
              
              <div class="perfil-avatar-container">
                <button class="perfil-btn perfil-btn--logout" id="perfil-logout-btn">Cerrar cuenta</button>
                
                <div class="perfil-avatar">
                  <img src="./assets/styles/images/usuario.png" alt="Avatar">
                  <div class="perfil-avatar__name-tag">
                    ${avatarNameHtml}
                  </div>
                </div>
              </div>

              <!-- Puntos -->
              <div class="perfil-points-badge">
                <div class="perfil-points-badge__flower">
                  <img src="./assets/styles/images/flor.png" alt="Flor" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <span class="perfil-points-badge__num">${points}</span>
              </div>
            </div>

          </div>
        </section>

        <!-- ─── IMPACTO ──────────────────────────────────────── -->
        <section class="perfil-impacto">
          <div class="perfil-impacto__inner">
            <div class="perfil-impacto__nav">
              <button class="perfil-impacto__nav-btn" id="btn-historial">Historial</button>
              <button class="perfil-impacto__nav-btn" id="btn-notificaciones">Notificaciones</button>
            </div>

            <div class="perfil-impacto__content">
              <h2 class="perfil-impacto__title">¡Impacto con SIMÖ!</h2>
              <div class="perfil-impacto__body">
                <div class="perfil-impacto__text-block">
                  <p class="perfil-impacto__stat">Has reciclado <strong>${devicesRecycled} dispositivos</strong></p>
                  <p class="perfil-impacto__stat">Evitaste <strong>${kgAvoided} kg de residuos electrónicos</strong></p>
                  <p class="perfil-impacto__desc">
                    Gracias por ayudar a reducir la contaminación y construir una<br>
                    Medellín más sostenible.
                  </p>
                  <p class="perfil-impacto__thanks">¡Muchas gracias por ser parte del cambio!</p>
                </div>
                <div class="perfil-impacto__icon">
                  <img src="./assets/styles/images/reciclaje.png" alt="Reciclaje">
                </div>
              </div>
            </div>

          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }

  /** @override */
  _bindViewModel() {
    this._subscribe('user', () => this.refresh())
    this._subscribe('points', () => this.refresh())
    this._subscribe('devicesRecycled', () => this.refresh())
    this._subscribe('kgAvoided', () => this.refresh())
    this._subscribe('isEditing', () => this.refresh())
    this._subscribe('isLoading', () => this.refresh())
  }

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)

    this._addEvent('#perfil-edit-btn', 'click', () => this._viewModel.toggleEdit())
    this._addEvent('#perfil-cancel-btn', 'click', () => this._viewModel.toggleEdit())

    this._addEvent('#edit-nombre', 'input', e => this._viewModel.updateEditField('nombre', e.target.value))
    this._addEvent('#edit-telefono', 'input', e => this._viewModel.updateEditField('telefono', e.target.value))
    this._addEvent('#edit-direccion', 'input', e => this._viewModel.updateEditField('direccion', e.target.value))

    this._addEvent('#perfil-edit-form', 'submit', e => {
      e.preventDefault()
      this._viewModel.saveProfile()
    })

    this._addEvent('#perfil-logout-btn', 'click', () => this._viewModel.logout())
    this._addEvent('#btn-historial', 'click', () => eventBus.emit('landing:navigate', 'historial'))
    this._addEvent('#btn-notificaciones', 'click', () => eventBus.emit('landing:navigate', 'notificaciones'))
  }
}
