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
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter, AyudaHeroDecorations } from '../../../shared/components/Layouts.js'
import { HeroAyudaStep, RolePhoneMockup, ModificarPhoneMockup } from '../../../shared/components/Cards.js'
import { IconFlower } from '../../../shared/components/Icons.js'

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

        ${PublicNav('', 'blue')}

        <!-- ─── HERO "ROLES" ──────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          <div class="ayuda-hero__inner ayuda-hero__inner--roles">
            <div class="ayuda-hero__content">
              <h1 class="ayuda-hero__title ayuda-hero__title--roles">Roles<span style="color: var(--simo-amarillo, #FFCD1C);">...</span></h1>
              <p class="ayuda-hero__desc">
                En SIMÖ puedes elegir el rol que mejor se adapte a tu participación
                dentro de la aplicación.
              </p>
              <p class="ayuda-hero__desc">
                Cada rol está diseñado para ofrecer funciones específicas según la
                forma en que desees contribuir: ya sea reciclando dispositivos, recolectando
                dispositivos o apoyando el proceso.
              </p>

              <div class="ayuda-roles__steps">
                ${HeroAyudaStep(1, 'Cuando <strong style="color: #FFCD1C;">estés iniciando, dale al botón "Tú eres"</strong> y escoge el rol que quieras tener.')}
                ${HeroAyudaStep(2, 'Si vas a reciclar dispositivos, elige <strong style="color: #FFCD1C;">usuario reciclador</strong>; si vas a recibirlos, selecciona <strong style="color: #FFCD1C;">usuario recolector</strong>.')}
              </div>
            </div>

            <div class="ayuda-hero__phones-pair">
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num" style="color: #FFCD1C;">1</span>
                <img src="./assets/styles/images/celular blanco 1.png" class="ayuda-mockups__phone-img" alt="Rol Paso 1" />
              </div>
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num" style="color: #FFCD1C;">2</span>
                <img src="./assets/styles/images/celular blanco 2.png" class="ayuda-mockups__phone-img" alt="Rol Paso 2" />
              </div>
            </div>
          </div>
        </section>

        <!-- ─── Modificar usuario ──────────────────────────────── -->
        <section class="ayuda-modificar">
          <div class="ayuda-modificar__inner">
            <div class="ayuda-modificar__phones">
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">1</span>
                <img src="./assets/styles/images/editar 1.png" class="ayuda-mockups__phone-img" alt="Editar Paso 1" />
              </div>
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">2</span>
                <img src="./assets/styles/images/editar 2.png" class="ayuda-mockups__phone-img" alt="Editar Paso 2" />
              </div>
            </div>

            <div class="ayuda-modificar__content">
              <h2 class="ayuda-modificar__title" style="display:flex; flex-direction:column; line-height:0.9;">
                <span style="font-size:3rem; color:#1a1a1a;">Modificar</span>
                <span style="font-size:4.5rem; color:#334E9D;">usuario</span>
              </h2>
              <p class="ayuda-modificar__desc">
                Puedes actualizar tu información personal en cualquier momento para mantener tus datos al día.
              </p>

              <div class="ayuda-modificar__steps">
                ${HeroAyudaStep(1, 'Accede al <strong style="color:#334E9D;">apartado Usuario</strong> desde el menú inferior y Presiona el botón <strong style="color:#334E9D;">Editar perfil</strong>.')}
                ${HeroAyudaStep(2, '<strong style="color:#334E9D;">Modifica</strong> nombre, teléfono, dirección o correo electrónico y confirma para <strong style="color:#334E9D;">actualizar</strong> tu información.')}
              </div>
            </div>
          </div>
        </section>

        ${SharedFooter()}

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
