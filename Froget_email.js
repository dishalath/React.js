import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
export const Froget_email = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ForgetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/forget-password",
        {
          email: email,
        }
      );
      if (response.status === 200) {
        history.push("/Forget_otp");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("User Not Found !", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div  style={{marginTop:"300px"}}  className="flex justify-center p-8 it-5ems-center">
        <Button size="lg" className="" variant="success" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2 "
          />
          Loading...
        </Button>
      </div>
    );
  }
  return (
    <>
      <form onSubmit={ForgetEmail}>
        <Container>
          <div
            className=" d-flex justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <Card style={{ width: "30rem", border: "none" }}>
              <h2 className="mt-4 mb-4 d-flex justify-content-center text-success">
                Forget Password ?{" "}
              </h2>
              <Card.Body>
                <Card.Title>Enter Email : </Card.Title>
                <Form.Control
                  className="d-flex justify-content-center"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <br />
                <Button
                  variant="success"
                  style={{ width: "100%" }}
                  type="submit"
                  disabled={loading}
                >
                  {" "}
                  {loading ? "Loading..." : "Reset Password"}
                </Button>
                {error && <p className="mt-3 text-danger">{error}</p>}
              </Card.Body>
            </Card>
          </div>
        </Container>
      </form>
    </>
  );
};
