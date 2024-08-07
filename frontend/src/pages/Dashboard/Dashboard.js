import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allItems
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <img src={item.imageUrl} alt={item.title} className="w-12 h-12 mb-4" />
              <h2 className="text-xl font-bold">{item.title}</h2>
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
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "USUARIOS",
    imageUrl: "/icons/people-fill.svg",
    url: "/admin/users/",
    forAdmin: true,
    bgColor: "#00bfa5",
    color: "white",
  },
  {
    title: "LIBROS",
    imageUrl: "/icons/book-half.svg",
    url: "/admin/books",
    forAdmin: true,
    bgColor: "#e040fb",
    color: "white",
  },
  {
    title: "PRÉSTAMOS",
    imageUrl: "/icons/book-half.svg", // Añade el icono adecuado aquí
    url: "/admin/loans",
    forAdmin: true,
    bgColor: "#ff9800",
    color: "white",
  },
];
