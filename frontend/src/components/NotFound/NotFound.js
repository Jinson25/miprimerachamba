import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.css" ;

export default function NotFound({ message, linkRoute, linkText }) {
  return (
    <div className={classes.contenedor}>
      {message}
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
}

NotFound.defaultProps = {
  message: "No se encontraron resultados",
  linkRoute: "/",
  linkText: "Volver al inicio",
};
