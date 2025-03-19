import { useEffect, useState } from "react";
import { fetchGifs } from "../services/giphy.ts";
import { GifItem } from "./GifItem.tsx";
import { Loader2 } from "lucide-react";

interface Gif {
  id: string;
  title: string;
  url: string;
}

interface GridGifsProps {
  inputValue: string;
}

export const GridGifs: React.FC<GridGifsProps> = ({ inputValue }) => {
  const [gifs, setGifs] = useState<Gif[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGifs = async () => {
      if (!inputValue.trim()) {
        setGifs([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchGifs(inputValue);
        setGifs(data);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
        setGifs([]);
      } finally {
        setIsLoading(false);
      }
    };

    getGifs();
  }, [inputValue]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Buscando GIFs...</p>
      </div>
    );
  }

  if (!inputValue.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-muted-foreground">Comienza a buscar GIFs</p>
        <p className="text-sm text-muted-foreground">Escribe algo en el buscador</p>
      </div>
    );
  }

  if (gifs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-muted-foreground">No se encontraron GIFs</p>
        <p className="text-sm text-muted-foreground">Intenta con otros términos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {gifs.map((gif) => (
        <GifItem key={gif.id} gif={gif} />
      ))}
    </div>
  );
};
