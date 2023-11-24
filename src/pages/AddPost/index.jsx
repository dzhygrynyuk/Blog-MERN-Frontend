import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import { checkIsAuth } from "../../redux/slices/auth";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const isAuth = useSelector(checkIsAuth);
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">Upload preview</Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>Detele</Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Tags" fullWidth />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">Publish</Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
