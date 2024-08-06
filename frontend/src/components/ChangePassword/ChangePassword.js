import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../input/input";
import Title from "../Title/Title";
import Button from "../Title/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const { changePassword } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (passwords) => {
        try {
            await changePassword(passwords);
            setErrorMessage(""); // Clear any previous error message
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="">
            <div className="w-full  bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(submit)}>
                    <Title title="Cambiar contraseña" />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <Input
                        type="password"
                        label="Contraseña Actual"
                        {...register("currentPassword", {
                            required: true,
                        })}
                        error={errors.currentPassword}
                    />
                    <Input
                        type="password"
                        label="Nueva Contraseña"
                        {...register("newPassword", {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.newPassword}
                    />
                    <Input
                        type="password"
                        label="Confirmar Nueva Contraseña"
                        {...register("confirmNewPassword", {
                            required: true,
                            validate: (value) =>
                                value !== getValues("newPassword")
                                    ? "Las contraseñas no coinciden"
                                    : true,
                        })}
                        error={errors.confirmNewPassword}
                    />
                    <Button type="submit" text="Cambiar" />
                </form>
            </div>
        </div>
    );
}
