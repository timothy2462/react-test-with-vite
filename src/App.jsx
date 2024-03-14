import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Main />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
