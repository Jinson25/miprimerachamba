import React, { useEffect, useReducer } from "react";
import { getAll } from "../../services/bibliotecaService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";

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

    useEffect(() => {
        getAll().then((libros) =>
            dispatch({ type: "LIBROS_LOADED", payload: libros })
        );
    }, []);
    return (
        <>
            <Thumbnails libros={libros}/>
        </>
    );
}
