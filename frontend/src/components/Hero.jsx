import {Container, Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {

    const {userInfo} = useSelector((state)=> state.auth);
    console.log('userInfo',userInfo)

    
  return (
    <div className='py-5'>
        <Container className='d-flex justify-content-center'>
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <div className='d-flex'>
                    {userInfo?.image ?
                    (<img src={`http://localhost:5000${userInfo?.image}`} width="100" height="100" alt="Profile" />)
                : <></> }                    
                    </div>
                <h1 className="text-center mb-4">
                 {userInfo?.name}
                </h1>
                <p className="text-center mb-4">
                    {userInfo?.email ? 'welcome back ' : 'hello there...'}
                    
                    <h6>{userInfo?.email}</h6>
                </p>
                {userInfo ? <></>                
            :
            
                <div className="d-flex">
                    <LinkContainer to='/login'>
                    <Button className="me-3" variant='primary' >
                    Sign In
                    </Button>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                    <Button variant='secondary'>Register</Button>
                    </LinkContainer>
                </div>
            }
            </Card>
        </Container>
    </div>
  )
}

export default Hero