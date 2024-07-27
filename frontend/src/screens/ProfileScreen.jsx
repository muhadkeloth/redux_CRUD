import {useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials} from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';


const ProfileScreen = () => {

    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [confirmPassword,setConfirmPassword] =useState('');
    const [profileImage,setProfileImage] =useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=> state.auth);

    const [updateProfile,{isLoading}] = useUpdateUserMutation()


    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
        if(userInfo.image){
          setPreviewImage(`http://localhost:5000${userInfo?.image}`)
        }
    },[userInfo.name,userInfo.email,userInfo.image]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    };
  
  
  const submitHandler = async (e) => {
  e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
        }else{
          try {
            const formData = new FormData();
             formData.append('_id',userInfo._id);
             formData.append('name',name);
             formData.append('email',email);
             if(password) formData.append('password', password);
             if(profileImage) formData.append('profileImage', profileImage);
            const res = await updateProfile(formData).unwrap();
            dispatch(setCredentials(res))
            toast.success('Profile updated')
            navigate('/')
          } catch (err) {
            console.log('error',err)
            toast.error(err?.data?.message || err.error)
          }
        }
    }

  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler} encType="multipart/form-data">

        <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='profileImage'>
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type='file' onChange={handleImageChange} ></Form.Control>
            </Form.Group>

            {previewImage && (
              <div className="my-2">
                <img src={previewImage} alt="Profile Preview" width="100" height="100" />
              </div>
            )}

            {isLoading && <Loader />}


        <Button type='submit' variant='primary' className='nt-3'>Update</Button>



        </Form>
    </FormContainer>
  )
}

export default ProfileScreen