import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
    const user = {
        name: "Jinson",
    };
    const logout = () => { };

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                    YAVIBOOKshop
                </Link>
                <nav>
                    <ul>
                        {user ? (
                            <li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">PERFIL</Link>
                                    <a href="/" onClick={logout}>SALIR</a>
                                </div>
                            </li>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
