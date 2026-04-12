/**
 * RolesView
 * ----------
 * Renderiza la página "Selección de roles y Modificar usuario" del menú dropdown de Ayuda.
 * Layout: Hero azul con "Roles..." + sección Modificar usuario + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con RolesViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { RolesViewModel } from '../viewmodels/RolesViewModel.js'
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

export class RolesView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new RolesViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la página "Selección de roles y Modificar usuario".
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        ${renderNav('', 'blue')}

        <!-- ─── HERO "ROLES" ──────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${this._renderHeroDecorations()}
          <div class="ayuda-hero__inner ayuda-hero__inner--roles">
            <div class="ayuda-hero__content">
              <h1 class="ayuda-hero__title--roles">Roles...</h1>
              <p class="ayuda-hero__desc">
                En SIMÖ puedes elegir el rol que mejor se adapte a tu participación
                dentro de la aplicación.
              </p>
              <p class="ayuda-hero__desc">
                Cada rol está diseñado para ofrecer funciones específicas según la
                forma en que desees contribuir: ya sea reciclando dispositivos o apoyando el proceso.
              </p>

              <div class="ayuda-roles__steps">
                <div class="ayuda-roles__step">
                  <span class="ayuda-roles__step-num">1</span>
                  <p class="ayuda-roles__step-text">Cuando <strong>estés iniciando</strong>, dale el <strong>botón "Tú eres"</strong> y escoge el rol que quieras tener.</p>
                </div>
                <div class="ayuda-roles__step">
                  <span class="ayuda-roles__step-num">2</span>
                  <p class="ayuda-roles__step-text">Si vas a entregar dispositivos, <strong>elige usuario reciclador</strong>; si vas a recolos, <strong>selecciona usuario recolector</strong>.</p>
                </div>
              </div>
            </div>

            <div class="ayuda-hero__phones-pair">
              ${this._renderRolePhone(1, '#DB0076')}
              ${this._renderRolePhone(2, '#DB0076')}
            </div>
          </div>
        </section>

        <!-- ─── Modificar usuario ──────────────────────────────── -->
        <section class="ayuda-modificar">
          <div class="ayuda-modificar__inner">
            <div class="ayuda-modificar__phones">
              ${this._renderModificarPhone(1)}
              ${this._renderModificarPhone(2)}
            </div>

            <div class="ayuda-modificar__content">
              <p class="ayuda-modificar__pre">Modificar</p>
              <h2 class="ayuda-modificar__title">usuario</h2>
              <p class="ayuda-modificar__desc">
                Puedes actualizar tu información personal en cualquier momento para mantener tus datos al día.
              </p>

              <div class="ayuda-modificar__steps">
                <div class="ayuda-modificar__step">
                  <span class="ayuda-modificar__step-num">1</span>
                  <p class="ayuda-modificar__step-text">Accede al <strong>apartado Usuario</strong> desde el menú inferior y Presiona el botón <strong>Editar perfil</strong>.</p>
                </div>
                <div class="ayuda-modificar__step">
                  <span class="ayuda-modificar__step-num">2</span>
                  <p class="ayuda-modificar__step-text">Modifica nombre, teléfono, dirección o correo electrónico y <strong>confirma para actualizar tu información.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones del hero.
   * @returns {string}
   */
  _renderHeroDecorations() {
    const flowerSvg = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="5" width="24" height="90" rx="2" fill="#FFCD1C"/>
        <rect x="5" y="38" width="90" height="24" rx="2" fill="#FFCD1C"/>
        <rect x="18" y="18" width="24" height="64" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <rect x="18" y="18" width="64" height="24" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <circle cx="50" cy="50" r="18" fill="#FFCD1C"/>
        <circle cx="50" cy="50" r="13" fill="#334E9D"/>
      </svg>
    `
    return `
      <div class="ayuda-hero__decor ayuda-hero__decor--flower-1">${flowerSvg}</div>
    `
  }

  /**
   * Renderiza un mockup de celular para la sección de Roles.
   * @param {number} num
   * @param {string} accentColor
   * @returns {string}
   */
  _renderRolePhone(num, accentColor) {
    return `
      <div class="ayuda-phone">
        <div class="ayuda-phone__screen">
          <div class="ayuda-phone__topbar">
            <span class="ayuda-phone__logo">SIMÖ</span>
            <span style="font-size:0.55rem; color:#999;">●●●</span>
          </div>
          <div class="ayuda-phone__body">
            <p style="font-family:'Outfit',sans-serif; font-size:0.7rem; font-weight:800; color:#1a1a1a; margin-bottom:4px;">¡HOLA!<br>BIENVENIDO</p>
            <div style="background:${accentColor}; border-radius:20px; padding:4px 0; text-align:center; color:#fff; font-size:0.6rem; font-weight:700; margin-bottom:6px;">Iniciar sesión</div>
            <div style="background:#f0f0f0; border-radius:20px; padding:4px 0; text-align:center; color:#1a1a1a; font-size:0.6rem; font-weight:700;">INICIAR COMO APP</div>
          </div>
          <div class="ayuda-phone__bottombar">
            <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
          </div>
        </div>
      </div>
    `
  }

  /**
   * Renderiza un mockup de celular para la sección de Modificar Usuario.
   * @param {number} num
   * @returns {string}
   */
  _renderModificarPhone(num) {
    const isSecond = num === 2
    return `
      <div class="ayuda-phone">
        <div class="ayuda-phone__screen">
          <div class="ayuda-phone__topbar">
            <span class="ayuda-phone__logo">SIMÖ</span>
            <span style="font-size:0.55rem; color:#999;">●●●</span>
          </div>
          <div class="ayuda-phone__body">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
              <div style="width:28px; height:28px; background:#FFCD1C; border-radius:50%;"></div>
              <div>
                <div style="background:#eee; height:8px; border-radius:4px; width:60px; margin-bottom:3px;"></div>
                <div style="background:#eee; height:7px; border-radius:4px; width:40px;"></div>
              </div>
            </div>
            ${isSecond ? `
              <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px;"></div>
              <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px;"></div>
              <div style="background:#eee; height:11px; border-radius:4px; margin-bottom:4px; width:70%;"></div>
              <div style="background:#DB0076; border-radius:20px; padding:3px 0; text-align:center; color:#fff; font-size:0.55rem; font-weight:700; margin-top:4px;">Confirmar</div>
            ` : `
              <div style="background:#DB0076; border-radius:6px; height:22px; margin-bottom:4px;"></div>
              <div style="background:#eee; height:10px; border-radius:4px; margin-bottom:4px;"></div>
              <div style="background:#eee; height:10px; border-radius:4px; width:60%;"></div>
            `}
          </div>
          <div class="ayuda-phone__bottombar">
            <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
          </div>
        </div>
      </div>
    `
  }

  // ─── Binding ──────────────────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {}

  /** @override */
  _bindEvents() {
    bindNavEvents(this)
    bindFooterEvents(this)
  }
}
