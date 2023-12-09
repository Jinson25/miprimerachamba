import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}
export default App;