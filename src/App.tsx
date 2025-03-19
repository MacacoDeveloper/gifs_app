import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { SearchLayout } from '@/Layout/SearchLayout'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SearchLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
