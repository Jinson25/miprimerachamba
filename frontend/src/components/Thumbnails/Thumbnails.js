import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../starCalificacion/StartRating";
import "./Thumbnails.css"

export default function Thumbnails({ libros }) {

  return (
    <section className="booklist">
          <div className="container">
      <div className="row">
            <ul className="list grid">
                {libros ? libros.map((libro) => (
                
                <li key={libro.id}>
                  
                  <Link to={`/book/${libro.id}`}>
                    <img
                      className="image"
                      src={libro.portadaIMG}
                      alt={libro.name}
                    />
                    

                    <div className="libro-container">
                      <div className="name">{libro.titulo} </div>
                      <div className="stars">
                        <StarRating stars={libro.calificacion} />
                      </div>
                      <div className="autor">
                        <p><span>Autor:</span> {libro.autor}</p>
                        <p><span>Publicado:</span> {libro.anio}</p>
                      </div>
                      <div className="publicacion">
                        
                        </div>
                    </div>
                  </Link>
                </li>
                )) : <h1>Cargando...</h1>}
              </ul>
          </div>
      </div>
      </section>
  );
}
