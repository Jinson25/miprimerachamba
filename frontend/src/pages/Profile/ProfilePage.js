import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

export default function ProfilePage() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { user, updateProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.perfilIMG || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg");

  useEffect(() => {
    if (user?.perfilIMG) {
      setProfileImage(user.perfilIMG);
    }
  }, [user]);

  const submit = (userData) => {
    updateProfile(userData);
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="flex items-center p-6 border rounded-lg w-full max-w-4xl mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
          }}
        />
        <div className="ml-6">
          <h2 className="text-xl font-semibold">{user.name} {user.apellido}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              defaultValue={user.name}
              type="text"
              {...register("name", { required: true, minLength: 3 })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              defaultValue={user.apellido}
              placeholder="Ingrese su apellido"
              type="text"
              {...register("apellido", { required: true })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">URL de la imagen de perfil</label>
            <input
              defaultValue={profileImage}
              type="text"
              {...register("perfilIMG")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.perfilIMG ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              defaultValue={user.email}
              type="email"
              {...register("email", { required: true })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar
            </button>
          </div>
        </form>
        <div className="mt-6">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
