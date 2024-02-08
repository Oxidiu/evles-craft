import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from  "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader.jsx';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/loginSlice.js';
import { toast } from 'react-toastify';




const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

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
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <FormContainer>
            <h1>Logare</h1>
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                    Loghează-te
                </Button>
                {isLoading && <Loader/>}
                <Row className='py-3'>
                    <Col>
                        Nu ai cont?
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Înregistrează-te acum</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;
