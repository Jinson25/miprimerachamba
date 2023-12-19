import React, { useEffect, useState } from "react";
import classes from "./usersAdminPage.module.css";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, deleteUserId, } from "../../services/userService";
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
        const filteredUsers = usersData.filter(user => user.isAdmin === false);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
        // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
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
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Administrar usuarios" margin="1rem auto" />
        <UsersNotFound />
        {users &&
          users.map((user) => (
            <div key={user.id} className={classes.list_item}>
              <img src={user.perfilIMG} alt={user.name} />
              <span>{user.name}</span>
              <div className={classes.actions}>
                <Link to={`/admin/editUser/${user.id}`}>Editar</Link>
                <Link onClick={() => deleteUser(user)}>Eliminar</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
