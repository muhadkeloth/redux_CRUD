import {useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button,Row, Col} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials} from '../slices/authSlice';



const RegisterScreen = () => {

    const [name,setName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [confirmPassword,setConfirmPassword] =useState('');
    const [profileImage,setProfileImage] =useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=> state.auth);

    const [register,{isLoading}] = useRegisterMutation();

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
        }else{

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            if(profileImage){
                formData.append('profileImage', profileImage);
            }



            try{
                const res = await register(formData).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/')
            }catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));        
    }

  return (
    <FormContainer>
        <h1>Sign up</h1>
        <Form onSubmit={submitHandler}>

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
                <Form.Label>Profile Image*</Form.Label>
                <Form.Control type='file'   onChange={handleImageChange}></Form.Control>
            </Form.Group>

            {previewImage && (
                <div>
                    <img src={previewImage} alt="Preview" width="100" height="100"  />
                </div>
            )}

            {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='nt-3'>Sign Up</Button>

        <Row className="py-3">
            <Col>
            Already Have An Account? <Link to='/login'>Login</Link></Col>
        </Row>

        </Form>
    </FormContainer>
  )
}

export default RegisterScreen