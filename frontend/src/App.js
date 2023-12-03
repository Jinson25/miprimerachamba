import AppRoutes from "./AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Banner} from "./components/Banner/Banner"
import Header from "./components/Header/Header";

function App() {
  return (
    <>
    <Header/>
      <Banner />
      <AppRoutes />
    </>
  );
}

export default App;
