import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import Orders from "./Orders";


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/cart" element={<Cart/>}></Route>
        <Route exact path="/orders" element={<Orders/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
