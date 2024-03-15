import {
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DialogOrder from "./DialogOrder/DialogOrder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IArticle, ICustomer, IOrder } from "../../shared/interfaces/interfaces";



const Order = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    getArticles();
    getCustomers();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get<IOrder[]>(
        "http://localhost:8080/orders"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error getting orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get<IArticle[]>(
        "http://localhost:8080/articles"
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error getting articles:", error);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get<ICustomer[]>(
        "http://localhost:8080/clients"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error getting clients:", error);
    }
  };

  const handleAgregarOrden = async (orden: IOrder) => {
    await axios
      .post("http://localhost:8080/orders", orden)
      .then((response) => {
        // Handle success, if needed
        setOpenDialog(false);
        setAlertOpen(true);
        getOrders();
      })
      .catch((error) => {
        console.error("Error add purchase order: ", error);
      });
  };


  return (
    <Grid paddingTop={2}>
      <Button
        onClick={() => setOpenDialog(true)}
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
      >
        Crear Orden de Compra
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Artículos</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const dateOrder = new Date(order.date!);
              const day = dateOrder.getDate();
              const month = dateOrder.getMonth() + 1; // Sumar 1 ya que los meses van de 0 a 11
              const year = dateOrder.getFullYear();
              const newDate = `${day}-${month}-${year}`;
              return (
                <TableRow key={order.uniqueCode}>
                  <TableCell>{order.uniqueCode}</TableCell>
                  <TableCell>{order.client?.name}</TableCell>
                  <TableCell>
                    {order.articles!.map((article) => (
                      <Chip
                        key={article.id}
                        label={article.name}
                        style={{ marginRight: 5, marginBottom: 5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{newDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogOrder
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAgregarOrden}
        customers={customers}
        articles={articles}
      />
    </Grid>
  );
};

export default Order;
