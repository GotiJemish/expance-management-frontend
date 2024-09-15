// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../component/loading';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../css/sb-admin-2.min.css';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../services/helper';

const Login = () => {
  const [loading, setLoading] = useState(false);

  // Navigate to a different route
  const navigate = useNavigate();

  // Check if the user is already logged in and redirect if true
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  // Handle form submission
  const submitHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {};

    // Extract form data into values object
    formData.forEach((value, key) => {
      values[key] = value;
    });

    try {
      setLoading(true);
      // Send login request
      const { data } = await axios.post(`${BACKEND_URL}/api/v2/users/login`, values);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(false);

      // Display success message
      toast.success('Login Successful', { duration: 2000 });

      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify({ ...data.oneuser, password: '' }));

      // Navigate to the home page after successful login
      navigate('/');
    } catch (error) {
      setLoading(false);
      
      toast.error('something went wrong', { duration: 2000 });
      console.error('Error:', error);
    }
  };

  return (
    <>
   <div className="container">
    
   {loading && <Loading />} {/* Render loading component if loading is true */}
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            {/* Left Column with Background Image (Visible on Large Screens) */}
            <div className="col-lg-6 d-none d-lg-block bg-login-image" />
            
            {/* Right Column for Login Form */}
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>


                {/* Login Form */}
                <Form className="user" onSubmit={submitHandle}>
                  <div className="form-group">
                    {/* Email Input */}
                    <Form.Group >
                      <Form.Control
                        type='email'
                        name='email'
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group">
                    {/* Password Input */}
                    <Form.Group >
                      <Form.Control
                        type='password'
                        name='password'
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </div>
                  {/* Submit Button */}
                  <Button variant='primary' type='submit' className="btn-user btn-block">Login</Button>
                  <hr />
                </Form>
                <hr />
                <div className="text-center">
                  {/* Link to Registration Page */}
                  <Link to='/register' className="small">Not a user? Click here to register</Link>
                </div>
              </div>
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

export default Login