import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../starCalificacion/StartRating";
import "./Thumbnails.css";

export default function Thumbnails({ libros }) {
  return (
    <ul className="list">
      {libros.map((libro) => (
        <li key={libro.id}>
          <Link to={`/libro/${libro.id}`}>
            <img
              className="image"
              src={libro.portadaIMG}
              alt={libro.name}
            />

            <div className="content">
              <div className="name">{libro.nombre} </div>
              <span
                className={`favorite ${libro.favorite ? "" : "not"}`}
              >
                ❤️
              </span>
              <div className="stars">
                <StarRating stars={libro.calificacion} />
              </div>
              <div className="origins">
                  {libro.categoria.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
              <div className="autor">{libro.autor} / {libro.anio}</div>
              
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
