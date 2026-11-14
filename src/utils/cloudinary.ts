/** Cloud Name público de la cuenta Cloudinary del cliente (no es un dato secreto). */
export const CLOUDINARY_CLOUD_NAME = 'mmk0thjj';

/** Construye la URL base de una imagen subida a Cloudinary a partir de su public ID. */
export function cloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
}

/**
 * Optimiza automáticamente cualquier URL de Cloudinary inyectando
 * parámetros de compresión inteligente (f_auto, q_auto) y redimensionado.
 * Si la imagen es local o de otra fuente (Unsplash), la devuelve intacta o ajustada.
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  if (!url) return '/logo-quintana-roo-comunica.png';

  const { width = 1000, height, crop = 'fill' } = options;

  // Si es una imagen subida a Cloudinary
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Evitar duplicar transformaciones si ya están presentes
    if (url.includes('/upload/f_auto')) return url;

    const transforms = [`f_auto`, `q_auto:good`, `w_${width}`];
    if (height) {
      transforms.push(`h_${height}`, `c_${crop}`, `g_auto`);
    } else {
      transforms.push(`c_limit`);
    }

    return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
  }

  // Si es una imagen de muestra de Unsplash, aseguramos compresión WebP y ancho exacto
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
  }

  return url;
}

/**
 * Formatea una fecha al estilo periodístico en español
 * Ejemplo: "30 de octubre de 2026"
 */
export function formatEditorialDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Calcula el tiempo estimado de lectura en minutos
 */
export function getReadingTime(content: string = ''): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
