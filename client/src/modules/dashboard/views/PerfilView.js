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
import { renderAuthNav, renderFooter, bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

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
    const flowerSvg = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="5" width="24" height="90" rx="2" fill="#FFCD1C"/>
        <rect x="5" y="38" width="90" height="24" rx="2" fill="#FFCD1C"/>
        <rect x="18" y="18" width="24" height="64" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <rect x="18" y="18" width="64" height="24" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <circle cx="50" cy="50" r="18" fill="#FFCD1C"/>
        <circle cx="50" cy="50" r="13" fill="#DB0076"/>
      </svg>
    `

    return `
      <div class="landing">

        ${renderAuthNav('perfil')}

        <!-- ─── HERO PERFIL ──────────────────────────────────── -->
        <section class="perfil-hero">
          <div class="perfil-hero__inner">

            <!-- Columna izquierda: Datos del usuario -->
            <div class="perfil-hero__left">
              <div class="perfil-info-list">
                <div class="perfil-info-item">
                  <span class="perfil-info-item__icon">👤</span>
                  <span class="perfil-info-item__text" id="perfil-name">Juan Sebastián Restrepo Gómez</span>
                </div>
                <div class="perfil-info-item">
                  <span class="perfil-info-item__icon">🪪</span>
                  <span class="perfil-info-item__text">2045049292</span>
                </div>
                <div class="perfil-info-item">
                  <span class="perfil-info-item__icon">📞</span>
                  <span class="perfil-info-item__text">312.458.7692</span>
                </div>
                <div class="perfil-info-item">
                  <span class="perfil-info-item__icon">🏠</span>
                  <span class="perfil-info-item__text">Calle 45 #72–18</span>
                </div>
                <div class="perfil-info-item">
                  <span class="perfil-info-item__icon">✉</span>
                  <span class="perfil-info-item__text" id="perfil-email">juan.restrepo@gmail.com</span>
                </div>
              </div>
              <button class="perfil-btn perfil-btn--edit" id="perfil-edit-btn">Editar información</button>
            </div>

            <!-- Columna derecha: Avatar + Puntos -->
            <div class="perfil-hero__right">
              <div class="perfil-avatar-block">
                <div class="perfil-avatar">
                  <div class="perfil-avatar__figure"></div>
                </div>
                <span class="perfil-avatar__name" id="perfil-avatar-name">Juan<br>Sebastián</span>
              </div>
              <button class="perfil-btn perfil-btn--logout" id="perfil-logout-btn">Cerrar cuenta</button>
              <div class="perfil-points-badge">
                <div class="perfil-points-badge__flower">${flowerSvg}</div>
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
                  <p class="perfil-impacto__stat">Has reciclado <strong>3 dispositivos</strong></p>
                  <p class="perfil-impacto__stat">Evitaste <strong>12 kg de residuos electrónicos</strong></p>
                  <p class="perfil-impacto__desc">
                    Gracias por ayudar a reducir la contaminación y construir una<br>
                    Medellín más sostenible.
                  </p>
                  <p class="perfil-impacto__thanks">¡Muchas gracias por ser parte del cambio!</p>
                </div>
                <div class="perfil-impacto__icon">
                  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                    <path d="M40 8 C20 8 8 22 8 38 C8 54 20 68 40 72" stroke="#2E7D32" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <path d="M40 8 C60 8 72 22 72 38 C72 54 60 68 40 72" stroke="#2E7D32" stroke-width="5" fill="none" stroke-linecap="round"/>
                    <path d="M30 20 L40 8 L50 20" fill="#2E7D32"/>
                    <path d="M56 55 L40 72 L24 55" fill="#2E7D32"/>
                    <path d="M8 38 L20 30 L20 46 Z" fill="#2E7D32"/>
                    <path d="M72 38 L60 30 L60 46 Z" fill="#2E7D32"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {
    this._subscribe('user', user => {
      if (!user) return
      const nameEl = this.$('#perfil-name')
      const emailEl = this.$('#perfil-email')
      const avatarNameEl = this.$('#perfil-avatar-name')
      if (nameEl) nameEl.textContent = user.name || 'Usuario'
      if (emailEl) emailEl.textContent = user.email || ''
      if (avatarNameEl) avatarNameEl.textContent = user.name || 'Usuario'
    })

    this._subscribe('points', points => {
      const el = this.$('#perfil-points')
      if (el) el.textContent = points
    })
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)

    this._addEvent('#perfil-logout-btn', 'click', () => {
      this._viewModel.logout()
    })

    this._addEvent('#btn-historial', 'click', () => {
      eventBus.emit('landing:navigate', 'historial')
    })

    this._addEvent('#btn-notificaciones', 'click', () => {
      eventBus.emit('landing:navigate', 'notificaciones')
    })
  }
}
