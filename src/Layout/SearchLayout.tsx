// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { GridGifs } from "../components/GridGifs";
import { Search, X } from "lucide-react";

export const SearchLayout = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GIFs Search
            </h1>
          </div>
          <ModeToggle />
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            className="relative flex items-center space-x-2 mb-8"
            onSubmit={handleSubmit}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                className="w-full h-12 pl-10 pr-10 rounded-full border-2 focus:border-primary transition-colors"
                placeholder="Busca tus GIFs favoritos..."
                onChange={handleInputChange}
                value={inputValue}
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <main>
        <GridGifs inputValue={inputValue} />
      </main>
    </header>
  );
};
