/**
 * LandingView
 * ------------
 * Renderiza la interfaz premium de la Landing Page principal.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con LandingViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { LandingViewModel } from '../viewmodels/LandingViewModel.js'

export class LandingView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new LandingViewModel()
    super({ ...options, viewModel })
  }

  // ─── Renderizado inicial ──────────────────────────────────────────────────

  /**
   * Genera el HTML completo de la landing page.
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        <!-- ─── NAV ─────────────────────────────────────────────────── -->
        <header class="landing-nav">
          <div class="landing-nav__inner">
            <div class="landing-nav__brand">
              <span class="landing-nav__icon">◆</span>
              <span class="landing-nav__name">AppMVVM</span>
            </div>
            <nav class="landing-nav__links">
              <a href="#features" class="landing-nav__link">Características</a>
              <a href="#stats" class="landing-nav__link">Métricas</a>
              <a href="#cta" class="landing-nav__link">Contacto</a>
              <button id="nav-login-btn" class="landing-nav__btn">Iniciar Sesión</button>
            </nav>
          </div>
        </header>

        <!-- ─── HERO ────────────────────────────────────────────────── -->
        <section class="landing-hero">
          <div class="landing-hero__glow landing-hero__glow--one"></div>
          <div class="landing-hero__glow landing-hero__glow--two"></div>
          <div class="landing-hero__glow landing-hero__glow--three"></div>

          <div class="landing-hero__content">
            <span class="landing-hero__badge">✨ Arquitectura MVVM Modular</span>
            <h1 class="landing-hero__title" id="landing-title">
              Construye aplicaciones<br/>
              <span class="landing-hero__highlight">escalables y elegantes</span>
            </h1>
            <p class="landing-hero__subtitle" id="landing-desc">
              Plataforma moderna con patrón MVVM por módulos para equipos de desarrollo.
              Rápido, modular y listo para producción.
            </p>
            <div class="landing-hero__actions">
              <button id="hero-login-btn" class="landing-btn landing-btn--primary">
                Comenzar Ahora
                <span class="landing-btn__arrow">→</span>
              </button>
              <button id="hero-demo-btn" class="landing-btn landing-btn--ghost">
                Ver Demo
              </button>
            </div>
          </div>

          <div class="landing-hero__visual">
            <div class="landing-hero__card landing-hero__card--one">
              <div class="landing-hero__card-header">
                <span class="landing-hero__dot landing-hero__dot--red"></span>
                <span class="landing-hero__dot landing-hero__dot--yellow"></span>
                <span class="landing-hero__dot landing-hero__dot--green"></span>
              </div>
              <div class="landing-hero__card-body">
                <code class="landing-hero__code">
                  <span class="code-keyword">class</span> <span class="code-class">UserViewModel</span> {<br/>
                  &nbsp;&nbsp;<span class="code-keyword">async</span> <span class="code-fn">fetchData</span>() {<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">const</span> data = <span class="code-keyword">await</span> service.<span class="code-fn">get</span>()<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.<span class="code-fn">setState</span>({ data })<br/>
                  &nbsp;&nbsp;}<br/>
                  }
                </code>
              </div>
            </div>
            <div class="landing-hero__card landing-hero__card--two">
              <div class="landing-hero__card-icon">📊</div>
              <div class="landing-hero__card-stat">+98%</div>
              <div class="landing-hero__card-label">Rendimiento</div>
            </div>
            <div class="landing-hero__card landing-hero__card--three">
              <div class="landing-hero__card-icon">🔒</div>
              <div class="landing-hero__card-stat">Seguro</div>
              <div class="landing-hero__card-label">Auth integrado</div>
            </div>
          </div>
        </section>

        <!-- ─── FEATURES ────────────────────────────────────────────── -->
        <section class="landing-features" id="features">
          <div class="landing-features__inner">
            <span class="landing-section__badge">Características</span>
            <h2 class="landing-section__title">Todo lo que necesitas para desarrollar</h2>
            <p class="landing-section__desc">Una arquitectura pensada para equipos que buscan velocidad, calidad y escalabilidad.</p>

            <div class="landing-features__grid">
              <div class="landing-feature">
                <div class="landing-feature__icon">⚡</div>
                <h3 class="landing-feature__title">Ultra Rápido</h3>
                <p class="landing-feature__desc">Vite + módulos ES nativos. Recarga instantánea en desarrollo y builds optimizados.</p>
              </div>
              <div class="landing-feature">
                <div class="landing-feature__icon">🧩</div>
                <h3 class="landing-feature__title">Modular</h3>
                <p class="landing-feature__desc">Cada módulo es independiente con su propio Model, View, ViewModel, Service y Store.</p>
              </div>
              <div class="landing-feature">
                <div class="landing-feature__icon">🔐</div>
                <h3 class="landing-feature__title">Autenticación</h3>
                <p class="landing-feature__desc">Sistema de auth completo con JWT, sesión persistente y protección de rutas.</p>
              </div>
              <div class="landing-feature">
                <div class="landing-feature__icon">📡</div>
                <h3 class="landing-feature__title">Event Bus</h3>
                <p class="landing-feature__desc">Comunicación desacoplada entre módulos usando un sistema de eventos centralizado.</p>
              </div>
              <div class="landing-feature">
                <div class="landing-feature__icon">🎨</div>
                <h3 class="landing-feature__title">Diseño Limpio</h3>
                <p class="landing-feature__desc">CSS con convención BEM, variables reutilizables y diseño responsivo de fábrica.</p>
              </div>
              <div class="landing-feature">
                <div class="landing-feature__icon">🧪</div>
                <h3 class="landing-feature__title">Testing</h3>
                <p class="landing-feature__desc">Vitest integrado para testing unitario y de integración con cobertura incluida.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── STATS ───────────────────────────────────────────────── -->
        <section class="landing-stats" id="stats">
          <div class="landing-stats__inner">
            <div class="landing-stat">
              <span class="landing-stat__number">5+</span>
              <span class="landing-stat__label">Módulos listos</span>
            </div>
            <div class="landing-stat">
              <span class="landing-stat__number">100%</span>
              <span class="landing-stat__label">JavaScript puro</span>
            </div>
            <div class="landing-stat">
              <span class="landing-stat__number">0</span>
              <span class="landing-stat__label">Dependencias pesadas</span>
            </div>
            <div class="landing-stat">
              <span class="landing-stat__number">∞</span>
              <span class="landing-stat__label">Escalabilidad</span>
            </div>
          </div>
        </section>

        <!-- ─── CTA ─────────────────────────────────────────────────── -->
        <section class="landing-cta" id="cta">
          <div class="landing-cta__inner">
            <h2 class="landing-cta__title">¿Listo para comenzar?</h2>
            <p class="landing-cta__desc">Únete y descubre cómo la arquitectura MVVM modular transforma tu flujo de trabajo.</p>
            <button id="cta-login-btn" class="landing-btn landing-btn--primary landing-btn--lg">
              Crear Cuenta Gratis
              <span class="landing-btn__arrow">→</span>
            </button>
          </div>
        </section>

        <!-- ─── FOOTER ──────────────────────────────────────────────── -->
        <footer class="landing-footer">
          <div class="landing-footer__inner">
            <div class="landing-footer__brand">
              <span class="landing-nav__icon">◆</span> AppMVVM
            </div>
            <p class="landing-footer__copy">© 2026 AppMVVM. Todos los derechos reservados.</p>
          </div>
        </footer>

      </div>
    `
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /**
   * Se suscribe a cambios de estado del ViewModel para actualizar el DOM.
   */
  _bindViewModel() {
    this._subscribe('title', title => {
      const el = this.$('#landing-title')
      if (el) el.textContent = title
    })

    this._subscribe('description', description => {
      const el = this.$('#landing-desc')
      if (el) el.textContent = description
    })
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /**
   * Enlaza los botones de la UI con los comandos del ViewModel.
   */
  _bindEvents() {
    const handleLoginClick = () => {
      this._viewModel.goToLogin()
    }

    this._addEvent('#nav-login-btn', 'click', handleLoginClick)
    this._addEvent('#hero-login-btn', 'click', handleLoginClick)
    this._addEvent('#cta-login-btn', 'click', handleLoginClick)

    // Smooth scroll para enlaces internos
    this._addEvent('#hero-demo-btn', 'click', () => {
      const featuresSection = document.querySelector('#features')
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }
}
