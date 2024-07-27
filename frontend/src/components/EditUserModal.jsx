import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUseradminMutation } from '../slices/adminApiSlice';
import { setUserToEdit, clearUserToEdit } from '../slices/adminSlice';
import { toast } from 'react-toastify';

const EditUserModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { userToEdit } = useSelector((state) => state.admin);
  // const { adminInfo } =useSelector((state) => state.auth);
  const [updateUseradmin ,{isLoading,error}] = useUpdateUseradminMutation();
  // const [updateUser] = useUpdateUserMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
    }
  }, [userToEdit]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('submitingHandler')
      // await updateUseradmin({ ...userToEdit, name, email }).unwrap();
      await updateUseradmin({ _id: userToEdit._id, name, email }).unwrap();
      toast.success('User updated successfully');
      dispatch(clearUserToEdit());
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-3'>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
