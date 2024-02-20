import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from  "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/loginSlice.js';
import { toast } from 'react-toastify';




const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector((state) => state.login);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // Redirect user if already logged in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try{
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch(err){
            if (err.data && err.data.message) {
                toast.error(err.data.message);
            } else {
                toast.error("An error occurred during login.");
            }
        }
    }
    return (
        <FormContainer>
            <h1>Înregistrare</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Numele</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Introdu numele'
                        value={name}
                        // required
                        onChange={(e)=>{setName(e.target.value)}}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Adresa de Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder='Introdu email-ul'
                        value={email}
                        // required
                        onChange={(e)=>{setEmail(e.target.value)}}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Parola</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Introdu parola'
                            value={password}
                            // required
                            onChange={(e)=>{setPassword(e.target.value)}}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirmă parola</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Confirmă parola'
                            value={confirmPassword}
                            // required
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className="mt-2"
                    disabled={isLoading}
                    >
                    Înregistrează-te
                </Button>
                {isLoading && <Loader/>}
                <Row className='py-3'>
                    <Col>
                        Ai deja un cont?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Loghează-te</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;
