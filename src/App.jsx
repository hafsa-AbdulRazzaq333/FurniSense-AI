import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";

import Contact from "./pages/Contact";
import Footer from "./components/layout/Footer";

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F5F0] text-[#5F5F5F]">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
