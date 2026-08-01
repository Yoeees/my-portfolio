import { ThemeProvider } from "./lib/theme";
import Portfolio from "./Portfolio";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  const isProjectsPage = window.location.pathname === "/projects";

  return (
    <ThemeProvider>
      {isProjectsPage ? <ProjectsPage /> : <Portfolio />}
    </ThemeProvider>
  );
}

export default App;
