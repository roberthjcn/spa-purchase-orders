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
import { IArticle, IDialogArticle } from "../../../shared/interfaces/interfaces";



const DialogArticle = (props: IDialogArticle) => {
    const { open, onClose, onAdd } = props;
    const [name, setName] = useState('');
    const [uniqueCode, SetUniqueCode] = useState('');
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setLoading(true);
        const newArticle: IArticle = {
            name,
            price,
            uniqueCode
        };
        onAdd(newArticle);
        onClose();
    };
    useEffect(() => {
        setLoading(false);
    }, [open]);

    return (
        <Box>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    Agregar Artículo
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Código"
                        fullWidth
                        value={uniqueCode}
                        onChange={(e) => SetUniqueCode(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Precio"
                        fullWidth
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleAdd} color="primary">
                        {loading ? <CircularProgress size={24} /> : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DialogArticle;
