import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    IArticle,
    ICustomer,
    IDialogOrder,
    IOrder,
} from "../../../shared/interfaces/interfaces";

const DialogOrder = (props: IDialogOrder) => {
    const { open, onClose, onAdd, customers, articles } = props;
    const [customerId, setCustomerId] = useState<number>(0);
    const [articlesSelected, setArticlesSelected] = useState<IArticle[]>([]);
    const [customersFiltered, setCustomersFiltered] = useState<ICustomer[]>([]);
    const [articlesFiltered, setArticlesFiltered] = useState<IArticle[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveOrder = () => {
        setLoading(true);
        const newOrder: IOrder = {
            clientId: customerId!,
            articleIds: articlesSelected.map((articles) => articles.id!),
        };
        onAdd(newOrder);
    };

    const handleSearchCustomer = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        const filteredCustomer = customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCustomersFiltered(filteredCustomer);
    };

    const handleSearchArticle = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        const filteredArticles = articles.filter((article) =>
            article.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setArticlesFiltered(filteredArticles);
    };

    useEffect(() => {
        setArticlesSelected([]);
        setCustomerId(0);
        setLoading(false);
    }, [open]);

    return (
        <Box>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Agregar Orden de Compra</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Autocomplete
                            options={customers}
                            getOptionLabel={(customer: ICustomer) => customer.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Buscar Cliente"
                                    variant="outlined"
                                    onChange={(e) => handleSearchCustomer(e.target.value)}
                                />
                            )}
                            value={
                                customers.find((customer) => customer.id === customerId) || null
                            }
                            onChange={(event, newValue) => {
                                setCustomerId(newValue!.id!);
                            }}
                        />
                        <Box paddingTop={2}>
                            {customersFiltered.map((customer) => (
                                <Chip
                                    key={customer.id}
                                    label={customer.name}
                                    onClick={() => setCustomerId(customer.id!)}
                                    style={{ marginRight: 5, marginBottom: 5 }}
                                />
                            ))}
                        </Box>
                    </FormControl>

                    <FormControl fullWidth>
                        <Autocomplete
                            options={articlesFiltered}
                            getOptionLabel={(article) => article.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Buscar Artículo"
                                    variant="outlined"
                                    onChange={(e) => handleSearchArticle(e.target.value)}
                                />
                            )}
                            multiple
                            value={articlesSelected}
                            onChange={(event, newValue) => {
                                setArticlesSelected(newValue);
                            }}
                        />
                    </FormControl>
                    <Box paddingTop={2}>
                        {articlesSelected.map((article) => (
                            <Chip
                                key={article.id}
                                label={article.name}
                                onDelete={() => {
                                    setArticlesSelected((prevArticles) =>
                                        prevArticles.filter(
                                            (prevArticle) => prevArticle.id !== article.id
                                        )
                                    );
                                }}
                                style={{ marginRight: 5, marginBottom: 5 }}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSaveOrder} color="primary">
                        {loading ? <CircularProgress size={24} /> : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DialogOrder;
