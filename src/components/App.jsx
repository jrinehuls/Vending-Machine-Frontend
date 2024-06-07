import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import ShowSnacks from "./snacks/SnackTable";
import Footer from "./footer/Footer";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element= {<ShowSnacks/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
