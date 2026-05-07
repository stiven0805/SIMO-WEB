/**
 * PerfilView
 * -----------
 * Vista principal del perfil de usuario autenticado.
 * Layout: Nav con icono usuario + Hero rosa con datos + Sección impacto + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con PerfilViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { PerfilViewModel } from '../viewmodels/PerfilViewModel.js'
import { bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'
import { eventBus } from '../../../shared/utils/eventBus.js'
import { AuthNav, SharedFooter } from '../../../shared/components/Layouts.js'
import { IconFlower } from '../../../shared/components/Icons.js'

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
    return `
      <div class="landing">

        ${AuthNav('perfil')}

        <!-- ─── HERO PERFIL ──────────────────────────────────── -->
        <section class="perfil-hero">
          <div class="perfil-hero__inner">

            <!-- Columna izquierda: Datos del usuario -->
            <div class="perfil-hero__left">
              <div id="perfil-display-mode">
                <div class="perfil-info-list">
                  
                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-user.png" alt="Usuario" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDExYTMgMyAwIDExIDAtNiAzIDMgMCAwMSAwIDZ6bTAgMmE5IDkgMCAwMC05IDloMThhOSA5IDAgMDAtOS05eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=='">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-name">Usuario</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-cedula.png" alt="Cédula" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIgNWg0djE0SDJ6bTYgMGgxNHYySjh6bTAgNGgxNHYyaC0xNHptMCA0aDE0djJoLTE0em0wIDRoOHYyaC04eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=='">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-cedula">--</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-telefono.png" alt="Teléfono" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTYuNjIgMTAuNzlhMTUuMDUgMTUuMDUgMCAwMDYuNTkgNi41OWwyLjItMi4yYTEgMSAwIDAxMS4xMS0uMjcgMTEuNTggMTEuNTggMCAwMDMuNjkgLjdtLjA5IDEtMSAxIDAgMDFhMSAxIDAgMDAtMSAxdi0zLjU5YTEgMSAwIDAxLjU5LS44OGwxLjEtMS4xYTEgMSAwIDAwLjI3LTEuMTEgMTEuNTggMTEuNTggMCAwMC0uNy0zLjY5IDEgMSAwIDAxLjI3LTEuMTFsMi4yLTIuMmExIDEgMCAwMTYuNTkgNi41OXoiIGZpbGw9IiMzMzMiLz48L3N2Zz4='">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-telefono">--</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-direccion.png" alt="Dirección" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVhMi41IDIuNSAwIDExIDAtNSAyLjUgMi41IDAgMDEgMCA1eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=='">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-direccion">--</span>
                  </div>

                  <div class="perfil-info-item">
                    <div class="perfil-info-item__icon">
                      <img src="./assets/styles/images/ic-email.png" alt="Email" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwIDRIYTRhMiAyIDAgMDAtMiAy djEybDAgMmE0IDQgMCAwMCA0IDRoMTZhMiAyIDAgMDAtMi0ydi0xMmwwLTJhMiAyIDAgMDAtMi0yek00IDZsOCA1IDgtNXYyek00IDE4VjhsOCA1IDgtNVYxOEg0eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=='">
                    </div>
                    <span class="perfil-info-item__text" id="perfil-email">--</span>
                  </div>

                </div>
                <button class="perfil-btn perfil-btn--edit" id="perfil-edit-btn">Editar información</button>
              </div>

              <!-- Formulario de Edición (Oculto por defecto) -->
              <div id="perfil-edit-mode" style="display: none; width: 100%;">
                <form id="perfil-edit-form" class="auth-modal__form" style="padding: 0;">
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Nombre</label>
                    <input class="auth-modal__input" type="text" id="edit-nombre" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Teléfono</label>
                    <input class="auth-modal__input" type="text" id="edit-telefono" />
                  </div>
                  <div class="auth-modal__form-group">
                    <label class="auth-modal__label">Dirección</label>
                    <input class="auth-modal__input" type="text" id="edit-direccion" />
                  </div>
                  <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="perfil-btn perfil-btn--edit" id="perfil-save-btn">Guardar</button>
                    <button type="button" class="perfil-btn" id="perfil-cancel-btn" style="background: transparent; border: 1px solid white; color: white;">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Columna derecha: Avatar + Puntos -->
            <div class="perfil-hero__right">
              
              <div class="perfil-avatar-container">
                <!-- Botón de cerrar cuenta -->
                <button class="perfil-btn perfil-btn--logout" id="perfil-logout-btn">Cerrar cuenta</button>
                
                <!-- Avatar -->
                <div class="perfil-avatar">
                  <img src="./assets/styles/images/usuario.png" alt="Avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iI0Y1QzE2QyIvPjxwYXRoIGQ9Ik0yMCAxMDBjMC0zMCAxMC00MCAzMC00MHMzMCAxMCAzMCA0MHoiIGZpbGw9IiM2QzM4RkYiLz48cmVjdCB4PSIyMCIgeT0iNzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGQ0QxQyIvPjwvc3ZnPg=='">
                  <!-- Tag con el nombre -->
                  <div class="perfil-avatar__name-tag" id="perfil-avatar-name">
                    Usuario
                  </div>
                </div>
              </div>

              <!-- Puntos -->
              <div class="perfil-points-badge">
                <div class="perfil-points-badge__flower">
                  <img src="./assets/styles/images/flor.png" alt="Flor" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <span class="perfil-points-badge__num" id="perfil-points">1100</span>
              </div>
            </div>

          </div>
        </section>

        <!-- ─── IMPACTO ──────────────────────────────────────── -->
        <section class="perfil-impacto">
          <div class="perfil-impacto__inner">
            <!-- Botones navegación -->
            <div class="perfil-impacto__nav">
              <button class="perfil-impacto__nav-btn" id="btn-historial">Historial</button>
              <button class="perfil-impacto__nav-btn" id="btn-notificaciones">Notificaciones</button>
            </div>

            <!-- Sección ¡Impacto con SIMÖ! -->
            <div class="perfil-impacto__content">
              <h2 class="perfil-impacto__title">¡Impacto con SIMÖ!</h2>
              <div class="perfil-impacto__body">
                <div class="perfil-impacto__text-block">
                  <p class="perfil-impacto__stat" id="perfil-stat-devices">Has reciclado <strong>3 dispositivos</strong></p>
                  <p class="perfil-impacto__stat" id="perfil-stat-kg">Evitaste <strong>12 kg de residuos electrónicos</strong></p>
                  <p class="perfil-impacto__desc">
                    Gracias por ayudar a reducir la contaminación y construir una<br>
                    Medellín más sostenible.
                  </p>
                  <p class="perfil-impacto__thanks">¡Muchas gracias por ser parte del cambio!</p>
                </div>
                <div class="perfil-impacto__icon">
                  <img src="./assets/styles/images/reciclaje.png" alt="Reciclaje" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMzEgMjhMNTAgOEw2OSAyOE01MCA4djY0TDMxIDUybTM4IDBMMTUgNjhMMzEgNTJtMzggMEw4NSA2OEw2OSA1MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMkU3RDMyIiBzdHJva2Utd2lkdGg9IjUiLz48L3N2Zz4='">
                </div>
              </div>
            </div>

          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {
    this._subscribe('user', user => {
      if (!user) return
      const nameEl = this.$('#perfil-name')
      const cedulaEl = this.$('#perfil-cedula')
      const telefonoEl = this.$('#perfil-telefono')
      const direccionEl = this.$('#perfil-direccion')
      const emailEl = this.$('#perfil-email')
      const avatarNameEl = this.$('#perfil-avatar-name')
      
      if (nameEl) nameEl.textContent = user.nombre || 'Usuario'
      if (cedulaEl) cedulaEl.textContent = user.cedula || '--'
      if (telefonoEl) telefonoEl.textContent = user.telefono || '--'
      if (direccionEl) direccionEl.textContent = user.direccion || '--'
      if (emailEl) emailEl.textContent = user.email || '--'
      
      // Avatar (primer nombre + primer apellido simplificado)
      if (avatarNameEl) {
        const parts = (user.nombre || 'Usuario').split(' ')
        avatarNameEl.innerHTML = parts.slice(0, 2).join('<br>')
      }
    })

    this._subscribe('editForm', form => {
      const editNombre = this.$('#edit-nombre')
      const editTelefono = this.$('#edit-telefono')
      const editDireccion = this.$('#edit-direccion')
      
      if (editNombre && editNombre.value !== form.nombre) editNombre.value = form.nombre
      if (editTelefono && editTelefono.value !== form.telefono) editTelefono.value = form.telefono
      if (editDireccion && editDireccion.value !== form.direccion) editDireccion.value = form.direccion
    })

    this._subscribe('isEditing', isEditing => {
      const displayMode = this.$('#perfil-display-mode')
      const editMode = this.$('#perfil-edit-mode')
      if (displayMode && editMode) {
        displayMode.style.display = isEditing ? 'none' : 'block'
        editMode.style.display = isEditing ? 'block' : 'none'
      }
    })

    this._subscribe('points', points => {
      const el = this.$('#perfil-points')
      if (el) el.textContent = points
    })
    
    this._subscribe('devicesRecycled', count => {
      const el = this.$('#perfil-stat-devices')
      if (el) el.innerHTML = `Has reciclado <strong>${count} dispositivos</strong>`
    })

    this._subscribe('kgAvoided', kg => {
      const el = this.$('#perfil-stat-kg')
      if (el) el.innerHTML = `Evitaste <strong>${kg} kg de residuos electrónicos</strong>`
    })
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)

    // Editar Perfil
    this._addEvent('#perfil-edit-btn', 'click', () => {
      this._viewModel.toggleEdit()
    })
    
    this._addEvent('#perfil-cancel-btn', 'click', () => {
      this._viewModel.toggleEdit()
    })

    this._addEvent('#edit-nombre', 'input', e => {
      this._viewModel.updateEditField('nombre', e.target.value)
    })
    this._addEvent('#edit-telefono', 'input', e => {
      this._viewModel.updateEditField('telefono', e.target.value)
    })
    this._addEvent('#edit-direccion', 'input', e => {
      this._viewModel.updateEditField('direccion', e.target.value)
    })

    this._addEvent('#perfil-edit-form', 'submit', e => {
      e.preventDefault()
      this._viewModel.saveProfile()
    })

    // Logout
    this._addEvent('#perfil-logout-btn', 'click', () => {
      this._viewModel.logout()
    })

    // Navegación
    this._addEvent('#btn-historial', 'click', () => {
      eventBus.emit('landing:navigate', 'historial')
    })

    this._addEvent('#btn-notificaciones', 'click', () => {
      eventBus.emit('landing:navigate', 'notificaciones')
    })
  }
}
