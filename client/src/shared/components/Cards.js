/**
 * Cards.js
 * ---------
 * Componentes de tarjetas reutilizables para SIMÖ.
 */

import { IconFlower, DeviceIcon } from './Icons.js';

import FlorNegra from '../../../assets/styles/images/FlorNegra.png';
import flor from '../../../assets/styles/images/flor.png';

/**
 * Tarjeta de Ideal (Usada en Quiénes Somos)
 */
export const IdealCard = ({ id, name, desc, iconSvg }) => `
  <div class="about-ideals__card" id="ideal-${id}">
    <div class="about-ideals__card-icon">${iconSvg}</div>
    <h3 class="about-ideals__card-name">${name}</h3>
    <p class="about-ideals__card-desc">${desc}</p>
  </div>
`;

/**
 * Tarjeta de Historial (Usada en Historial)
 */
export const HistorialCard = (item) => `
  <div class="historial-card historial-card--${item.color}">
    <div class="historial-card__device">
      <span class="historial-card__qty">${item.quantity}</span>
      <div class="historial-card__img-container">
        <img src="./assets/styles/images/${item.img}.png" alt="${item.device}" class="historial-card__img" />
      </div>
      <span class="historial-card__label">${item.device}</span>
    </div>
    <div class="historial-card__info">
      <p class="historial-card__company">${item.company} <span class="historial-card__status-text">${item.status}</span></p>
      <p class="historial-card__desc">${item.statusDesc}</p>
      <p class="historial-card__date">Fecha: ${item.date}</p>
    </div>
  </div>
`;

/**
 * Tarjeta de Notificación (Usada en Notificaciones)
 */
export const NotificacionCard = (item) => {
  return `
    <div class="notif-card notif-card--${item.color}" id="notif-${item.id}">
      <div class="notif-card__device">
        <span class="notif-card__qty">${item.quantity}</span>
        <div class="notif-card__img-container">
          <img src="./assets/styles/images/${item.img}.png" alt="${item.device}" class="notif-card__img" />
        </div>
        <span class="notif-card__label">${item.device}</span>
      </div>
      <div class="notif-card__info">
        <div class="notif-card__details">
          <p class="notif-card__row">Destino: <strong>${item.destination}</strong></p>
          <p class="notif-card__row">Electrodoméstico: ${item.device}</p>
          <p class="notif-card__row">Fecha: ${item.date}</p>
        </div>
        <div class="notif-card__points">
          <img src=${flor} alt="Puntos" class="notif-card__flower" />
          <span>${item.points}</span>
        </div>
        <div class="notif-card__footer">
          <p class="notif-card__status">Estado: <span class="notif-card__status-val--${item.statusColor}">${item.status}</span></p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Tarjeta de Paso (Usada en Descargar/Ayuda)
 */
export const StepCard = ({ number, title, desc }) => `
  <div class="download-steps__card">
    <div class="download-steps__card-number">${number}</div>
    <h3 class="download-steps__card-title">${title}</h3>
    <p class="download-steps__card-desc">${desc}</p>
  </div>
`;

/**
 * Logo de Colaborador (Usado en Colaboraciones)
 */
export const ColabLogo = ({ name, type }) => `
  <div class="colabs-logo colabs-logo--${type}">
    <span>${name}</span>
  </div>
`;

/**
 * Paso numerado del Hero en Ayuda
 */
export const HeroAyudaStep = (num, text) => `
  <div class="ayuda-hero__step">
    <span class="ayuda-hero__step-num">${num}</span>
    <p class="ayuda-hero__step-text">${text}</p>
  </div>
`;

/**
 * Mockup de teléfono para Ayuda
 */
export const AyudaPhoneMockup = (accentColor) => `
  <div class="ayuda-phone">
    <div class="ayuda-phone__screen">
      <div class="ayuda-phone__topbar">
        <span class="ayuda-phone__logo">SIMÖ</span>
      </div>
      <div class="ayuda-phone__body">
        <div class="ayuda-phone__points-badge" style="background:${accentColor};">
          <span>🪙</span>
          <strong>1100</strong>
        </div>
        <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
        <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 75%;"></div>
        <div style="display:flex; gap:6px; margin-top:8px;">
          <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
          <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
        </div>
      </div>
      <div class="ayuda-phone__bottombar">
        <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
      </div>
    </div>
  </div>
`;

/**
 * Mockup de teléfono para la sección de Roles
 */
export const RolePhoneMockup = (accentColor = '#DB0076') => `
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
`;

/**
 * Mockup de teléfono para la sección de Modificar Usuario
 */
export const ModificarPhoneMockup = (isConfirmation = false) => `
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
        ${isConfirmation ? `
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
`;

/**
 * Tarjeta de Oferta (Usada en Landing)
 */
export const OfferCard = (offer) => {
  return `
    <div class="offer-card">
      <span class="offer-card__badge">${offer.quantity}</span>
      
      <div class="offer-card__image-container">
        ${offer.imgSrc ? `<img src="${offer.imgSrc}" alt="${offer.name}" class="offer-card__img" />` : (offer.img ? `<img src="./assets/styles/images/${offer.img}.png" alt="${offer.name}" class="offer-card__img" />` : offer.icon)}
      </div>

      <div class="offer-card__points">
        <span class="offer-card__points-icon">
          <img src=${FlorNegra} alt="Puntos" class="offer-card__points-img" />
        </span>
        <span class="offer-card__points-value">${offer.points}</span>
      </div>

      <h4 class="offer-card__name">${offer.name}</h4>
      <p class="offer-card__dest">Destino: ${offer.destination}</p>
    </div>
  `;
};
