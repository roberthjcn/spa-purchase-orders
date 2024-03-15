import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import DialogCustomer from "./Dialog/Dialog";
import axios from "axios";
import { ICustomer } from "../../shared/interfaces/interfaces";

const Customer = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [customerEdit, setCustomerEdit] = useState<ICustomer | undefined>(
    undefined
  );

  const handleAddOrEditCustomer = async (customer: ICustomer) => {
    if (customerEdit) {
      try {
        await axios.put(
          `http://localhost:8080/clients/${customer.id}`,
          customer
        );
        setCustomers(
          customers.map((c) => (c.id === customer.id ? customer : c))
        );
      } catch (error) {
        console.error("Error editing client: ", error);
      }
    } else {
      try {
        const response = await axios.post<ICustomer>(
          "http://localhost:8080/clients",
          { name: customer.name, lastname: customer.lastname },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCustomers([...customers, response.data]);
        getCustomers();
      } catch (error) {
        console.error("Error adding client: ", error);
      }
    }
    setCustomerEdit(undefined);
    setOpenDialog(false);
  };

  const handleDeleteCustomer = (id: number) => {
    axios
      .delete(`http://localhost:8080/clients/${id}`)
      .then((response) => {
        getCustomers();
      })
      .catch((error) => {
        console.error("Error deleting client: ", error);
      });
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setCustomerEdit(undefined);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Grid>
      <Box paddingTop={2} paddingBottom={2}>
        <Button
          onClick={() => handleOpenDialog()}
          variant="contained"
          color="primary"
          startIcon={<PlaylistAddCheckCircleIcon />}
        >
          Agregar Cliente
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.lastname}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      setCustomerEdit(customer);
                      setOpenDialog(true);
                    }}
                  >
                    <DriveFileRenameOutlineIcon color="success"></DriveFileRenameOutlineIcon>
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDeleteCustomer(customer.id!)}
                  >
                    <DeleteSweepIcon color="error"></DeleteSweepIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogCustomer
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAddEdit={handleAddOrEditCustomer}
        customerEdit={customerEdit}
      />
    </Grid>
  );
};

export default Customer;
