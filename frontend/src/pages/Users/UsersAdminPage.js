import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, deleteUserId } from "../../services/userService";
import NotFound from "../../components/NotFound/NotFound";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await getAllUsers();
        const filteredUsers = usersData.filter((user) => user.isAdmin === false);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    loadUsers();
  }, [searchTerm]);

  const UsersNotFound = () => {
    if (users && users.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/users/" linkText="Ver todo" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Regresar al dashboard" />
    );
  };

  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar al usuario ${user.name}?`
    );
    if (!confirmed) return;

    await deleteUserId(user.id);
    toast.success("Usuario eliminado correctamente.");
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="Administrar usuarios" margin="1rem auto" />
      <UsersNotFound />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users &&
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img
                src={user.perfilIMG}
                alt={user.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <span className="text-lg font-semibold">{user.name}</span>
              <div className="flex mt-4">
                <Link
                  to={`/admin/editUser/${user.id}`}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteUser(user)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
