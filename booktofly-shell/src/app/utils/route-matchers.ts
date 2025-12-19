import { UrlMatcher, UrlSegment } from '@angular/router';

/**
 * Crea un matcher personalizado que verifica si la ruta comienza con el prefijo especificado
 * @param path El prefijo que debe tener la ruta
 * @returns UrlMatcher que consume todos los segmentos si coincide el prefijo
 */
export function startsWith(path: string): UrlMatcher {
  return (segments: UrlSegment[]) => {
    return segments.length > 0 && segments[0].path === path
      ? { consumed: segments }
      : null;
  };
}
