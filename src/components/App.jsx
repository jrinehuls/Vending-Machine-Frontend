import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";

import Footer from "./footer/Footer";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
