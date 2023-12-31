import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { checkIsAuth, logout } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const onClickLogout = () => {
    if(window.confirm('Are you sure?')){
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Registration</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
