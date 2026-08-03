import { ThemeProvider } from "./lib/theme";
import Portfolio from "./Portfolio";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";

function App() {
  const isProjectsPage = window.location.pathname === "/projects";
  const isExperiencePage = window.location.pathname === "/experience";

  return (
    <ThemeProvider>
      {isExperiencePage ? <ExperiencePage /> : isProjectsPage ? <ProjectsPage /> : <Portfolio />}
    </ThemeProvider>
  );
}

export default App;
