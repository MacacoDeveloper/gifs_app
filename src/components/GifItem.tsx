import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Gif {
  id: string;
  title: string;
  url: string;
}

interface GifItemProps {
  gif: Gif;
}

export const GifItem: React.FC<GifItemProps> = ({ gif }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gif.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="group relative flex justify-center rounded-xl overflow-hidden bg-muted/50 hover:bg-muted transition-colors duration-200">
      <img 
        src={gif.url} 
        alt={gif.title} 
        loading="lazy"
        className="rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-all duration-300" 
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
        <p className="text-white text-sm font-medium px-4 text-center">
          {gif.title}
        </p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar
            </>
          )}
        </button>
      </div>
    </div>
  );
};
