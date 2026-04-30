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
          ${AyudaHeroDecorations(IconFlower('#FFCD1C', '#334E9D', 80))}
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
                ${HeroAyudaStep(1, 'Cuando <strong>estés iniciando</strong>, dale el <strong>botón "Tú eres"</strong> y escoge el rol que quieras tener.')}
                ${HeroAyudaStep(2, 'Si vas a entregar dispositivos, <strong>elige usuario reciclador</strong>; si vas a recolos, <strong>selecciona usuario recolector</strong>.')}
              </div>
            </div>

            <div class="ayuda-hero__phones-pair">
              ${RolePhoneMockup('#DB0076')}
              ${RolePhoneMockup('#DB0076')}
            </div>
          </div>
        </section>

        <!-- ─── Modificar usuario ──────────────────────────────── -->
        <section class="ayuda-modificar">
          <div class="ayuda-modificar__inner">
            <div class="ayuda-modificar__phones">
              ${ModificarPhoneMockup(false)}
              ${ModificarPhoneMockup(true)}
            </div>

            <div class="ayuda-modificar__content">
              <p class="ayuda-modificar__pre">Modificar</p>
              <h2 class="ayuda-modificar__title">usuario</h2>
              <p class="ayuda-modificar__desc">
                Puedes actualizar tu información personal en cualquier momento para mantener tus datos al día.
              </p>

              <div class="ayuda-modificar__steps">
                ${HeroAyudaStep(1, 'Accede al <strong>apartado Usuario</strong> desde el menú inferior y Presiona el botón <strong>Editar perfil</strong>.')}
                ${HeroAyudaStep(2, 'Modifica nombre, teléfono, dirección o correo electrónico y <strong>confirma para actualizar tu información.</strong>')}
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
