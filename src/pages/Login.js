import React, { useState, useContext } from 'react'
import '../styles/GlobalStyles.css';
import * as FaIcons from 'react-icons/fa';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Row, Col, Button, Container, Form, Alert } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

function Login({ history }) {
    const { dispatch }= useContext(AuthContext)
    const alert = useAlert()

    const { register, handleSubmit, errors } = useForm();

    function onSubmit(data) {
        if(data.email === 'user@blink.com' && data.password === '12345678'){
            // history.push('/');
            // history.replace('/');
            dispatch({
                type: types.login,
                payload: { 
                    name: 'User'
                }
            });
            history.replace('/dashboard');

        } else {
            alert.show('Credenciales invalidas!')

        }
       
    }

    return (
        <body className="TBody">
       
            <Container className="mt-5">
                <Row className="justify-content-md-center mt-5">
                    <Col className="login" xs={6} md={4}>
                        <Row className="justify-content-md-center mt-5">
                            <FaIcons.FaUserCircle style={{ fill: 'gray' }} size={86} />
                        </Row>
                        <Row className="justify-content-md-center mt-5">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label className="justify-content-md-center">Email</Form.Label>
                                    <Form.Control
                                        ref={register({
                                            required: true,
                                            validate: (input) => isEmail(input), // returns true if valid
                                        })}
                                        type="email" name="email" placeholder="Email"
                                        style={{ borderColor: errors.email && "red" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control ref={register({
                                        required: true,
                                        minLength: 6,
                                    })}
                                        style={{ borderColor: errors.password && "red" }}
                                        type="password" name="password" placeholder="Contraseña" />
                                </Form.Group>
                                <Row className="justify-content-md-center mt-1">
                                    <Button variant="primary" type="submit" >Login</Button>
                                </Row>
                            </Form>
                        </Row>
                    </Col>
                    <Row>
                    </Row>
                </Row>
            </Container>

        </body>

    )
}

export default Login
