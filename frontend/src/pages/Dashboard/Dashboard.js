import React from "react";
import classes from "./Dashboard.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter(item => user.isAdmin || !item.forAdmin)
          .map(item => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: "PERFIL",
    imageUrl: "/icons/person-badge.svg",
    url: "/profile",
    bgColor: '#1565c0',
    color: 'white',
  },
  {
    title: "USUARIOS",
    imageUrl: "/icons/people-fill.svg",
    url: "/admin/users/",
    forAdmin: true,
    bgColor: '#00bfa5',
    color: 'white',
  },
  {
    title: "LIBROS",
    imageUrl: "/icons/book-half.svg",
    url: "/admin/books",
    forAdmin: true,
    bgColor: '#e040fb',
    color: 'white',
  },
];
