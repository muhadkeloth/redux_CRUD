import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import { setAdminCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';

const AdminLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const {adminInfo} = useSelector((state)=> state.auth);

  useEffect(()=>{
      if(adminInfo){
          navigate('/admin');
      }
  },[navigate,adminInfo])


  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      const res = await adminLogin({ username, password }).unwrap();
      console.log('3')
      dispatch(setAdminCredentials(res));
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Admin Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminLoginScreen;
