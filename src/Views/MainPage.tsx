import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';


import { Input } from '@material-ui/core';
import { thisExpression } from '@babel/types';
interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
}

const SaveData = (oBook: IBook) => {
    oBook.id = 0;
    axios
        .post('https://localhost:44386/api/Books', oBook)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
}

const UpdateData = (oBook: IBook) => {
    axios
        .put('https://localhost:44386/api/Books/' + oBook.id, oBook)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
}

const DeleteBook = (oBook: IBook) => {
    axios
        .delete('https://localhost:44386/api/Books/' + oBook.id)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
}

const Selectitem = (e: any) => {

}

export const MainPage = () => {
    let oBook: IBook = {
        id: 0,
        author: "",
        description: "",
        name: ""
    }
    const lstdd: IBook[] = [];

    const [isLoading, setLoading] = useState(true);
    const [currentBook, setCurrentBook] = useState<IBook>(oBook);
    const [lstData, setLstData] = useState(lstdd);



    useEffect(() => {
        axios.get('https://localhost:44386/api/Books')
            .then((result: any) => {
                setLstData(result.data);
                setLoading(false);
            });
    }, [isLoading]);

    console.log(lstData);
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return <div>
        <Grid container direction={"row"}>
            <Grid container item xs={6} spacing={3}>
                <List>
                    {
                        lstData.map((oItem: IBook) => {
                            return (
                                <ListItem onClick={() => {
                                    let book: IBook = lstData.find((element: IBook) => element.id == oItem.id)!;
                                    console.log(book);
                                    setCurrentBook(book!);
                                }} key={1} button>
                                    <ListItemText inset primary={oItem.name} />
                                </ListItem>
                            );
                        })
                    }

                </List>
            </Grid>
            <Grid container item xs={6} spacing={3}>
                <Grid spacing={3} container direction="column">
                    <label>Title</label>
                    <Input value={currentBook.name}
                        onChange={(e: any) => {
                            setCurrentBook((prevState: any) => ({
                                ...prevState,
                                name: e.target.value
                            }));
                        }} />
                    <label>Author</label>
                    <Input value={currentBook.author}
                        onChange={(e: any) => {
                            setCurrentBook((prevState: any) => ({
                                ...prevState,
                                author: e.target.value
                            }));
                        }} />
                    <label>Description</label>
                    <Input value={currentBook.description}
                        onChange={(e: any) => {
                            setCurrentBook((prevState: any) => ({
                                ...prevState,
                                description: e.target.value
                            }));
                        }} />
                    <Grid direction={"row"}>
                        <button onClick={() => { UpdateData(currentBook); setLoading(true); }}>Save</button>
                        <button onClick={() => { SaveData(currentBook); setLoading(true); }}>Save new</button>
                        <button onClick={() => { DeleteBook(currentBook); setLoading(true); }}>Delete</button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>

}

export default MainPage;