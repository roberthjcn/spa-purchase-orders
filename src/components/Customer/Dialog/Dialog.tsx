import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ICustomer, IDialogCustomer } from "../../../shared/interfaces/interfaces";



const DialogCustomer = (props: IDialogCustomer) => {
    const { open, onClose, onAddEdit, customerEdit } = props;
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (customerEdit) {
            setName(customerEdit.name);
            setLastname(customerEdit.lastname);
        }
    }, [customerEdit]);

    useEffect(() => {
        setLoading(false);
        if (!customerEdit) {
            setName('');
            setLastname('');
        }
    }, [open])

    const handleAddOrEdit = () => {
        if (customerEdit) {
            onAddEdit({ ...customerEdit, name, lastname });
        } else {
            const newCustomer: ICustomer = {
                name,
                lastname
            };
            onAddEdit(newCustomer);
        }
        onClose();
    };

    const handleCancelar = () => {
        setName('');
        setLastname('');
        onClose();
    }

    return (
        <Box>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{customerEdit ? 'Editar Cliente' : 'Agregar Cliente'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Apellido"
                        fullWidth
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelar}>Cancelar</Button>
                    <Button onClick={handleAddOrEdit} color="primary">
                        {loading ? <CircularProgress size={24} /> : customerEdit ? 'Editar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DialogCustomer;
