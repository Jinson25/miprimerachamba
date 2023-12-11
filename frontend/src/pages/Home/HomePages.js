import React, { useEffect, useReducer } from "react";
import { getAll, search } from "../../services/bibliotecaService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from 'react-router-dom';
import {Banner} from "../../components/Banner/Banner";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";

const initialState = { libros: [] };
const reducer = (state, action) => {
    switch (action.type) {
        case "LIBROS_LOADED":
            return { ...state, libros: action.payload };
        default:
            return state;
    }
};
export default function HomePages() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { libros } = state;
    const { searchTerm } = useParams();

    useEffect(() => {
        const loadedBooks = searchTerm ? search(searchTerm) : getAll();
        loadedBooks.then((libros => dispatch({ type: "LIBROS_LOADED", payload: libros })));
    }, [searchTerm]);
    return (
        <>
            <Header/>
            <Banner />
            {libros.lenght === 0 && <NotFound linkRoute="Resetea la busqueda" />}
            <Thumbnails libros={libros}/> 
        </>
    );
}
