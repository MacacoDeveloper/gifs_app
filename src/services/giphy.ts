const URL_BASE = "https://api.giphy.com/v1/gifs/search";
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

// Función para sanitizar el input
const sanitizeInput = (input: string): string => {
  // Eliminar caracteres especiales y limitar longitud
  return input
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .slice(0, 50)
    .trim();
};

export const fetchGifs = async (topic: string): Promise<Gif[]> => {
  try {
    // Validar que el topic no esté vacío
    if (!topic || topic.trim().length === 0) {
      return [];
    }

    // Sanitizar el input
    const sanitizedTopic = sanitizeInput(topic);

    // Validar que la API key existe
    if (!API_KEY) {
      throw new Error('API key no configurada');
    }

    const url = `${URL_BASE}?api_key=${API_KEY}&q=${encodeURIComponent(sanitizedTopic)}&limit=20&rating=g&lang=es`;
    
    const res = await fetch(url);
    
    // Validar la respuesta
    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status}`);
    }

    const data = await res.json();

    // Validar que la respuesta tiene el formato esperado
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Formato de respuesta inválido');
    }

    const gifs: Gif[] = data.data.map((gif: Gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.downsized_medium.url,
    }));

    return gifs;
  } catch (error) {
    console.error('Error al obtener GIFs:', error);
    return [];
  }
};
