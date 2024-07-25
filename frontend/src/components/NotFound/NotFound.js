import React from "react";

export default function NotFound() {
  return (
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-6xl font-extrabold text-gray-900">404</h1>
        <p class="text-xl text-gray-600 mt-4">
          ¡Oops! La página que buscas no se encuentra.
        </p>
        <p class="text-gray-500 mt-2">
          Parece que no podemos encontrar lo que estás buscando.
        </p>
        <a
          href="/"
          class="mt-6 inline-block px-6 py-3 text-black bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

NotFound.defaultProps = {
  message: "No se encontraron resultados",
  linkRoute: "/",
  linkText: "Volver al inicio",
};
