import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { SearchTerm } = useParams();

  useEffect(() => {
    setTerm(SearchTerm ?? '');
  }, [SearchTerm]);

  const search = async () => {
    term ? navigate(`/search/${term}`) : navigate("/");
  };
  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Buscar tu libro favorito"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        value={term}
      />
    </div>
  );
}
