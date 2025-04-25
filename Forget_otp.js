import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";
export const Forget_otp = () => {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ForgetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const Response = await axios.post("http://localhost:8000/api/VerifyOTP", {
        otp: otp,
      });
      if (Response.status === 200) {
        history.push("/Forget_Password_Update");
      } else {
        setError(Response.data.error);
      }
    } catch (error) {
      setError("Invalid Otp  !", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div style={{marginTop:"300px"}} className="flex items-center justify-center p-8">
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
                {" "}
                OTP Verification{" "}
              </h2>
              <Card.Body>
                <Card.Title>Enter OTP : </Card.Title>
                <Form.Control
                  className="d-flex justify-content-center"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <br />
                <Button
                  variant="success"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Verify OTP
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
