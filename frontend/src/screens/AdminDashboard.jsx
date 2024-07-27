import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form } from 'react-bootstrap';
import { useGetUsersQuery, useDeleteUserMutation,useAdminLogoutMutation, useUpdateUseradminMutation  } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import EditUserModal from '../components/EditUserModal';
import { setUserToEdit,clearUserToEdit,setUsers   } from '../slices/adminSlice';
import { useNavigate } from 'react-router-dom';



const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.auth);
  const { data : users, isLoading, error ,refetch} = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [adminLogout] = useAdminLogoutMutation();
  const [showEditModal , setShowEditModal] = useState(false);
   const userToEdit = useSelector((state) => state.admin.userToEdit); 


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);



  useEffect(() => {
    if (users) {     
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
        setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  
   useEffect(() => {
    if (users) {     
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);




  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



   const handleCreateUser = async () => {
    navigate('/admin/createuser');
    await refetch();
    console.log('helle')
  };




  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        await refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const editUserHandler = (user) => {
    dispatch(setUserToEdit(user));
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    dispatch(clearUserToEdit());
    setShowEditModal(false);
  };

  const handleLogout = async () => {
    try {
      await adminLogout().unwrap(); 
      dispatch(logout()); 
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

 




  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error);
    }
  }, [error]);





  if (isLoading) return <Loader />;

  return (
    <div>
    <h1>Admin Dashboard</h1>
    <div className="d-flex justify-content-between mb-3">
    <Button variant='primary' className='mb-3'onClick={handleCreateUser} >Create New User</Button>
    <div className="mb-3 d-flex ">
        <Form.Control type='text' placeholder='Search by name' value={searchTerm} onChange={handleSearchChange} />
        <Button className='ms-2' >Search</Button>
      </div>
    <Button variant='secondary' className='mb-3' onClick={handleLogout}>Logout</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
    {filteredUsers.map(user => (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Button className='me-2' variant='warning' onClick={() => editUserHandler(user)}>
                Edit 
              </Button>
              <Button variant='danger' onClick={() => deleteUserHandler(user._id)}>
                Delete
              </Button>
            </td>
          </tr>
      ))}
       
      </tbody>
    </Table>
    <EditUserModal show={showEditModal} handleClose={handleCloseEditModal} />
  </div>

  );
};

export default AdminDashboard;



