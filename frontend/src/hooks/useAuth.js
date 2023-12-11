import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUsers());
  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Inicio de sesión exitosa");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Registro exitoso");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Cierre de sesión exitosa");
  };

  const updateProfile = async (user) => {
    const updateUser = await userService.updateProfile(user);
    toast.success("Perfil actualizado");
    if (updateUser) {
      setUser(updateUser);
    }
  };

  const changePassword = async (passwords) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Contraseña actualizada. vuelva a iniciar sesión");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
