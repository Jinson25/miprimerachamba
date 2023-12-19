import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  updateUserById,
  getCurrentUser,
} from "../../services/userService";

const UserForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    name: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    perfilIMG: "",
    fondoIMG: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (userId) {
      const loadUserData = async () => {
        try {
          const userData = await updateUserById(userId);
          setFormData(userData);
        } catch (error) {
          console.error("Error cargando datos del usuario:", error);
        }
      };
      loadUserData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userId) {
        await updateUserById(userId, formData);
        console.log("Usuario actualizado:", formData);
      } else {
        await createUser(formData);
        console.log("Usuario creado:", formData);
      }

      navigate("/admin/users");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container mt-4">
      <h2>{userId ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {currentUser && currentUser.isAdmin && (
          <>
            <div className="mb-3">
              <label htmlFor="isAdmin" className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      isAdmin: !formData.isAdmin,
                    })
                  }
                />
                Es Administrador
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="perfilIMG" className="form-label">
                Foto de Perfil
              </label>
              <input
                type="text"
                className="form-control"
                id="perfilIMG"
                name="perfilIMG"
                value={formData.perfilIMG}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fondoIMG" className="form-label">
                Foto de Fondo
              </label>
              <input
                type="text"
                className="form-control"
                id="fondoIMG"
                name="fondoIMG"
                value={formData.fondoIMG}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {userId ? "Guardar Cambios" : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
