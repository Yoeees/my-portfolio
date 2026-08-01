import { ThemeProvider } from "./lib/theme";
import Portfolio from "./Portfolio";

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;
