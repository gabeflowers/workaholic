export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateSafe = (date: Date | string): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    return dateObj.toLocaleDateString('pt-BR');
  } catch (error) {
    return 'Data inválida';
  }
};

export const extractSpotifyEmbedUrl = (url: string): string | null => {
  // Remove prefixos de localização e limpa a URL
  const cleanUrl = url.replace(/\/intl-[a-z]{2}\//, '/').split('?')[0];
  
  // Converte URLs do Spotify para formato embed
  const spotifyRegex = /https:\/\/open\.spotify\.com\/(playlist|album|track)\/([a-zA-Z0-9]+)/;
  const match = cleanUrl.match(spotifyRegex);
  
  if (match) {
    const [, type, id] = match;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
  }
  
  // Se já for uma URL embed, retorna como está
  if (cleanUrl.includes('open.spotify.com/embed/')) {
    return cleanUrl;
  }
  
  return null;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}; 