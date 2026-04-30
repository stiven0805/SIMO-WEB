/**
 * ComoReciclarView
 * -----------------
 * Renderiza la página "Cómo reciclar" del menú dropdown de Ayuda.
 * Layout: Hero azul con título + 4 pasos numéricos + 4 mockups de celular + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con ComoReciclarViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { ComoReciclarViewModel } from '../viewmodels/ComoReciclarViewModel.js'
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter, AyudaHeroDecorations } from '../../../shared/components/Layouts.js'
import { HeroAyudaStep, AyudaPhoneMockup } from '../../../shared/components/Cards.js'
import { IconFlower } from '../../../shared/components/Icons.js'

export class ComoReciclarView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new ComoReciclarViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la página "Cómo reciclar".
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        ${PublicNav('', 'blue')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${AyudaHeroDecorations(IconFlower('#DB0076', '#FFCD1C', 80))}
          <div class="ayuda-hero__decor ayuda-hero__decor--triangle-1">▲</div>
          <div class="ayuda-hero__decor ayuda-hero__decor--triangle-2">▶</div>
          <div class="ayuda-hero__inner">
            <div class="ayuda-hero__content">
              <p class="ayuda-hero__pre">Cómo</p>
              <h1 class="ayuda-hero__title">Reciclar</h1>
              <p class="ayuda-hero__desc">
                Reciclar en SIMÖ es un <strong>proceso simple y accesible</strong> que te permite
                entregar tus dispositivos electrónicos de manera responsable,
                contribuyendo activamente al cuidado del medio ambiente.
              </p>
              <p class="ayuda-hero__desc">
                A través de un sistema fácil de usar, <strong>puedes registrar los
                equipos que deseas reciclar</strong>, coordinar su entrega y asegurarte
                de que sean gestionados correctamente.
              </p>
            </div>

            <div class="ayuda-hero__steps">
              ${HeroAyudaStep(1, 'Desde la pantalla principal, <strong>ingresa al menú</strong> de Opciones y selecciona la sección Reciclar para comenzar el proceso.')}
              ${HeroAyudaStep(2, 'Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.')}
              ${HeroAyudaStep(3, 'Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.')}
              ${HeroAyudaStep(4, 'Revisa la información y <strong>confirma la solicitud.</strong> El estado cambiará cuando el proceso sea validado.')}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${[
        { num: 1, label: 'Desde la pantalla principal, ingresa al menú de Opciones y selecciona la sección Reciclar para comenzar el proceso.', color: '#FFCD1C' },
        { num: 2, label: 'Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.', color: '#DB0076' },
        { num: 3, label: 'Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.', color: '#FFCD1C' },
        { num: 4, label: 'Revisa la información y confirma la solicitud. El estado cambiará cuando el proceso sea validado.', color: '#334E9D' },
      ].map(s => `
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">${s.num}</span>
                <div class="ayuda-phone">
                  <div class="ayuda-phone__screen">
                    <div class="ayuda-phone__topbar">
                      <span class="ayuda-phone__logo">SIMÖ</span>
                    </div>
                    <div class="ayuda-phone__body">
                      <div class="ayuda-phone__block" style="background:${s.color}; height: 28px; border-radius: 6px; margin-bottom: 8px;"></div>
                      <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
                      <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 70%;"></div>
                      <div class="ayuda-phone__block" style="background: ${s.color}33; height: 40px; border-radius: 8px; margin-top: 8px;"></div>
                    </div>
                    <div class="ayuda-phone__bottombar">
                      <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
                    </div>
                  </div>
                </div>
                <p class="ayuda-mockups__caption">${s.label}</p>
              </div>
            `).join('')}
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
