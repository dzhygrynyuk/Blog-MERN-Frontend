import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import axios from '../../axios';
import { checkIsAuth } from "../../redux/slices/auth";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [text, setText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const imputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Failed to upload file!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text, 
        tags: tags.split(','),
        imageUrl
      };

      console.log('fields', fields);

      const { data } = await axios.post('/posts', fields);
      const id = data._id;

      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn(error);
      alert('Failed to create post!');
    }
  };

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
      <Button onClick={() => imputFileRef.current.click()} variant="outlined" size="large">Upload preview</Button>
      <input ref={imputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>Detele</Button>
          <img className={styles.image} src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Tags"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">Publish</Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
