import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}
export default App;
