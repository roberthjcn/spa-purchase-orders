import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DialogArticle from './Dialog/DialogArticle';
import axios from "axios";
import InventoryIcon from '@mui/icons-material/Inventory';
import { IArticle } from '../../shared/interfaces/interfaces';



const Article = () => {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddArticle = async (article: IArticle) => {
        try {
            const response = await axios.post<IArticle>(
                "http://localhost:8080/articles",
                { name: article.name, price: article.price, uniqueCode: article.uniqueCode },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            setArticles([...articles, response.data]);
            getArticles();
        } catch (error) {
            console.error("Error adding article: ", error);
        }
    }

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

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <Grid>
            <Box paddingTop={2} paddingBottom={2}>
                <Button
                    onClick={() => setOpenDialog(true)}
                    variant="contained"
                    color="primary"
                    startIcon={<InventoryIcon />}
                >
                    Agregar Artículo
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell>{article.name}</TableCell>
                                <TableCell>{article.uniqueCode}</TableCell>
                                <TableCell>{article.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogArticle
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onAdd={handleAddArticle}
            />
        </Grid>
    )
}

export default Article;