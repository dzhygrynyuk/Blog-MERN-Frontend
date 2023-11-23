import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { fetchAuthLogin, checkIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid} 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuthLogin(values));
    
    if(!data.payload){
      return alert('Failed to login!');
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register('email', {required: 'Email is required.'})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Password"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register('password', {required: 'Password is required.'})}
          fullWidth 
        />
        <Button type="submit" size="large" variant="contained" fullWidth>Login</Button>
      </form>
    </Paper>
  );
};
