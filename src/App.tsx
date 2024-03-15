import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Customer from "./components/Customer/Customer";
import Article from "./components/Article/Article";
import Order from "./components/Order/Order";

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Store Aplicación
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Clientes
            </Button>
            <Button color="inherit" component={Link} to="/articles">
              Artículos
            </Button>
            <Button color="inherit" component={Link} to="/purchase-order">
              Órdenes de Compra
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/articles" element={<Article />}></Route>
          <Route path="/purchase-order" element={<Order />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
