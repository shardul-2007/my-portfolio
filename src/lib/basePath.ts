// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Base Path Resolution Helper
// Ensures assets load seamlessly on both GitHub Pages and Vercel
// ═══════════════════════════════════════════════════════════════

export function getBasePath(): string {
  // If hosted on GitHub Pages in production without custom domain
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/my-portfolio')) {
      return '/my-portfolio';
    }
    return '';
  }
  // Server/SSG fallback matching next.config.js
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL ? '/my-portfolio' : '';
}

export function assetPath(path: string): string {
  const base = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
