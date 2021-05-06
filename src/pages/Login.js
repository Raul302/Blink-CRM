import React, { useState, useContext } from 'react'
import '../styles/GlobalStyles.css';
import * as FaIcons from 'react-icons/fa';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Row, Col, Button, Container, Form, Alert } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { callLogin, login } from '../actions/auth/auth';
import logo from '../resources/images/logoLogin.png'
function Login() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const { msgError } = useSelector(state => state.ui);
    const { register, handleSubmit, errors } = useForm();
    function onSubmit(data) {
        dispatch(callLogin(data));
    }

    return (
        <body className="TBody">
            <Container className="mt-5">
                <Row className="justify-content-md-center mt-5">
                    <Col className="login" xs={6} md={4}>
                        <Row className="justify-content-md-center mt-5">
                            <img width="100" src={logo} alt="Logo"></img>
                        </Row>
                        <Row className="justify-content-md-center mt-5">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {msgError &&
                                    (<Row className="justify-content-md-center">
                                        <div class="alert alert-danger" role="alert">
                                            {msgError}
                                        </div>
                                    </Row>
                                    )
                                }
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label className="justify-content-md-center">Email</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
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
                                    <Form.Control
                                        autoComplete="off"
                                        ref={register({
                                            required: true,
                                            minLength: 6,
                                        })}
                                        style={{ borderColor: errors.password && "red" }}
                                        type="password" name="password" placeholder="Contraseña" />
                                </Form.Group>
                                <Row className="justify-content-md-center mt-1">
                                    <Button
                                        disabled={ loading }
                                        variant="info" 
                                        type="submit" >Login
                                            </Button>
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
