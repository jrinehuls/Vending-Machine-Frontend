import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Snacks from "./snacks/Snacks";
import SnackPurchase from "./snacks/SnackPurchase";
import SnackGive from "./snacks/SnackGive";
import Footer from "./footer/Footer";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element= {<Snacks/>}></Route>
          <Route path="/purchase/:id" element= {<SnackPurchase/>}></Route>
          <Route path="/give" element= {<SnackGive/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
