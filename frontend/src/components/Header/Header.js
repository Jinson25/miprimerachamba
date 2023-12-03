import React, { useState, useEffect } from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const user = {
        name: "Jinson",
    };
    const logout = () => {};

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${classes.header} ${scrolled ? classes.scrolled : ""}`}>
            <Container className={classes.container}>
                <Link to="/" className={classes.logo}>
                    YAVIBOOK
                </Link>
                <nav>
                    <ul>
                        {user ? (
                            <li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">PERFIL</Link>
                                    <a href="/" onClick={logout}>
                                        SALIR
                                    </a>
                                </div>
                            </li>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
