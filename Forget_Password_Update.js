import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {  Container, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
export const Forget_Password_Update = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/UpdatePassword', {
        password: password
      });

      if (response.status === 200) {
        history.push('/login');
      } else {
        setError(Response.data.error);
      }
    } catch (error) {
      setError("User Not Found !", error);
    }
  };

  return (
    <>
      <form onSubmit={handlePasswordUpdate}>
        <Container>
          <div className=' d-flex  justify-content-center  ' style={{ marginTop: "150px" }}>
            <Card style={{ width: '30rem', border: 'none' }}>

              <h2 className='d-flex justify-content-center text-success mt-4 mb-4'>  Password Update  </h2>
              <Card.Body>
                <Card.Title>Enter Password : </Card.Title>
                <Form.Control className='d-flex justify-content-center'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <br />
                <Button variant="success" style={{ width: "100%" }} type='submit'>Update Password</Button>
                {error && <p className="text-danger mt-3">{error}</p>}
              </Card.Body>
            </Card>
          </div>
        </Container>
      </form>
    
    </>
  );
};
