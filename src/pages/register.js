import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../component/loading';
import { Form, Button } from 'react-bootstrap';
import '../css/sb-admin-2.min.css';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../services/helper';
const Register = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/v2/users/register`, values);
      await new Promise((resolve) => setTimeout(resolve, 200));
      // message.success('Registration Successful');
      toast.success('Registration Successful',{duration:2000})
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong',{duration:2000})
      console.error('Error:', error);
    }
  };
    return (
        <>
 

    <div className="container">

    {loading && <Loading />}

  <div className="card o-hidden border-0 shadow-lg my-5">
    <div className="card-body p-0">

      {/* Nested Row within Card Body */}
      <div className="row">
        <div className="col-lg-5 d-none d-lg-block bg-register-image" />
        <div className="col-lg-7">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <Form className="user" onSubmit={submitHandle}>
              <div className="form-group">
              <Form.Group >
                    <Form.Control type="text" name="name" className="form-control form-control-user" placeholder="First Name" />
                  </Form.Group>
              </div>
              <div className="form-group">
              <Form.Group >
                    <Form.Control type="email" name="email" className="form-control form-control-user" placeholder="Email Address" />
                  </Form.Group>
              </div>
              <div className="form-group">
              <Form.Group >
                    <Form.Control type="password" name="password" className="form-control form-control-user" placeholder="Password" />
                  </Form.Group>
              </div>
              <Button variant="primary" className="btn-user btn-block" type="submit">
                    Register Account
                  </Button>
            </Form>
            <hr />
            <div className="text-center">
            <Link to="/login" className="small">
                    Already registered? Click here to login
                  </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Register