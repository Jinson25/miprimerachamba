import React, { useState, useEffect } from "react";
import classes from "./header.module.css";
import { Link, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Search from "../Search/Search";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const { user, logout} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight *0.5;
      if(location.pathname === '/'){
        setScrolled(isScrolled && location.pathname === '/');
      }else{
        setScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  useEffect(() => {
    setShowSearch(scrolled);
  }, [scrolled]);

  return (
    <header className={`${classes.header} ${scrolled ? classes.scrolled : ""} ${location.pathname !== '/' ? classes.customColor : ""}`}>
      <Container className={classes.container}>
        <Link to="/" className={classes.logo}>
          YAVIBOOK
        </Link>
        {showSearch && <Search />}
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
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
