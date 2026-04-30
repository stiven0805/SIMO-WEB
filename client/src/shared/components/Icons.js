/**
 * Icons.js
 * ---------
 * Repositorio de iconos SVG reutilizables para toda la aplicación.
 * Centraliza el diseño para facilitar cambios globales.
 */

/**
 * Icono de Flor SIMÖ (Usado en el landing y perfil)
 * @param {string} petalColor
 * @param {string} centerColor
 * @param {number} size
 * @returns {string}
 */
export const IconFlower = (petalColor = '#DB0076', centerColor = '#FFCD1C', size = 80) => `
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect x="38" y="5" width="24" height="90" rx="2" fill="${petalColor}"/>
    <rect x="5" y="38" width="90" height="24" rx="2" fill="${petalColor}"/>
    <rect x="18" y="18" width="24" height="64" rx="2" fill="${petalColor}" transform="rotate(45 50 50)"/>
    <rect x="18" y="18" width="64" height="24" rx="2" fill="${petalColor}" transform="rotate(45 50 50)"/>
    <circle cx="50" cy="50" r="18" fill="${petalColor}"/>
    <circle cx="50" cy="50" r="13" fill="${centerColor}"/>
  </svg>
`;

/**
 * Icono de Check (Simplicidad)
 */
export const IconCheck = () => `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="#334E9D" stroke-width="3" fill="none"/>
    <path d="M16 24L22 30L32 18" stroke="#334E9D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

/**
 * Icono de Hoja (Conciencia Ambiental)
 */
export const IconLeaf = () => `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4z" stroke="#2E7D32" stroke-width="3" fill="none"/>
    <path d="M16 32c0-8 8-12 8-20s8 12 8 20" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M18 28h12" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
  </svg>
`;

/**
 * Icono de Personas (Comunidad)
 */
export const IconPeople = () => `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
    <circle cx="30" cy="20" r="7" stroke="#DB0076" stroke-width="2.5" fill="none"/>
    <path d="M10 38c0-6 4-10 8-10h12c4 0 8 4 8 10" stroke="#DB0076" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </svg>
`;

/**
 * Icono de Estrella (Innovación)
 */
export const IconStar = () => `
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6l4 12h12l-10 7 4 13-10-8-10 8 4-13-10-7h12z" stroke="#FFCD1C" stroke-width="2.5" fill="none"/>
  </svg>
`;

/**
 * Icono de Usuario (Nav)
 */
export const IconUser = () => `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
`;

/**
 * Iconos de Dispositivos para Historial/Notificaciones
 */
export const DeviceIcon = (type) => {
  const icons = {
    'Celular': '📱',
    'Batería': '🔋',
    'Baterías': '🔋',
    'Tablet': '📟',
    'Laptop': '💻'
  };
  return icons[type] || '📦';
};

/**
 * Icono de Flor Grande para Hero
 */
export const IconHeroFlower = (size = 120) => `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect x="45" y="5" width="30" height="110" rx="2" fill="#FFCD1C"/>
    <rect x="5" y="45" width="110" height="30" rx="2" fill="#FFCD1C"/>
    <rect x="21" y="21" width="30" height="78" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
    <rect x="21" y="21" width="78" height="30" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
    <circle cx="60" cy="60" r="22" fill="#FFCD1C"/>
    <circle cx="60" cy="60" r="17" fill="#334E9D"/>
  </svg>
`;
