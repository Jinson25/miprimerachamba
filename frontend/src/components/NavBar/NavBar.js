import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "react-bootstrap";
import classes from "./NavBar.module.css";

export default function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  if (location.pathname === "/" || location.pathname.startsWith("/search")) {
    return null;
  }
  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link to="/" className={classes.logo}>
          YAVIBOOK
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">
                  {user.name}
                </Link>
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
