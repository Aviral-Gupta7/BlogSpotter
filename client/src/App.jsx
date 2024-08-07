import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "../views";
import { Header, Footer } from "../components";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
