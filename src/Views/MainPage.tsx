import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import "../styles/MainPage.scss";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
}

export const MainPage = () => {
    const oBook: IBook = {
        id: 0,
        author: "",
        description: "",
        name: ""
    }
    const lst: IBook[] = [];

    const [isLoading, setLoading] = useState(true);
    const [currentBook, setCurrentBook] = useState<IBook>(oBook);
    const [lstData, setLstData] = useState(lst);

    const SaveData = (oBook: IBook) => {
        if (!ValidateData(oBook)) {
            return;
        }
        oBook.id = 0;
        axios
            .post('https://localhost:44319/api/Books', oBook)
            .then((res) => {
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    const UpdateData = (oBook: IBook) => {
        if (!ValidateData(oBook)) {
            return;
        }
        axios
            .put('https://localhost:44319/api/Books/' + oBook.id, oBook)
            .then((res) => {
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    const DeleteBook = (oBook: IBook) => {
        axios
            .delete('https://localhost:44319/api/Books/' + oBook.id)
            .then((res) => {
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    const ValidateData = (oBook: IBook) => {
        if (oBook.name === "") {
            window.alert("Enter name!");
            return false;
        }
        if (oBook.author === "") {
            window.alert("Enter author!");
            return false;
        }
        return true;
    }

    useEffect(() => {
        axios.get('https://localhost:44319/api/Books')
            .then((result: any) => {
                setLstData(result.data);
                setLoading(false);
            });
    }, [isLoading]);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return <div className={"page"}>
        <Grid container direction={"row"}>
            <Grid className={"tbBooks"} container item xs={5} spacing={4}>
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <TableBody>
                            {
                                lstData.map((row) => (
                                    <TableRow className={currentBook.id === row.id ? "selectedRow" : "tRow"} key={row.id}
                                        onClick={() => {
                                            let book: IBook = lstData.find((element: IBook) => element.id === row.id)!;
                                            setCurrentBook(book!);
                                        }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.author}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid style={{marginLeft: 55, marginTop: 30, maxWidth: 400}} container item xs={5} spacing={4}>
                <div className="form">
                    <Grid spacing={3} container direction="column">
                        <label>Title</label>
                        <TextField variant="outlined" value={currentBook.name}
                            onChange={(e: any) => {
                                setCurrentBook((prevState: any) => ({
                                    ...prevState,
                                    name: e.target.value
                                }));
                            }} />
                        <label>Author</label>
                        <TextField variant="outlined" value={currentBook.author}
                            onChange={(e: any) => {
                                setCurrentBook((prevState: any) => ({
                                    ...prevState,
                                    author: e.target.value
                                }));
                            }} />
                        <label>Description</label>
                        <TextField variant="outlined" value={currentBook.description}
                            onChange={(e: any) => {
                                setCurrentBook((prevState: any) => ({
                                    ...prevState,
                                    description: e.target.value
                                }));
                            }} />
                        <Grid direction={"row"}>
                            <button onClick={() => { SaveData(currentBook);}}>Save new</button>
                            <button onClick={() => { UpdateData(currentBook); setCurrentBook(oBook);}} disabled={currentBook.id === 0}>Save</button>
                            <button onClick={() => { DeleteBook(currentBook); setCurrentBook(oBook);}} disabled={currentBook.id === 0}>Delete</button>
                        </Grid>
                    </Grid>
                    </div>
            </Grid>
        </Grid>
    </div>
}

export default MainPage;
