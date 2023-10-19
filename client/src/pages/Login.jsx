import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Grid from '@mui/material/Grid';
import Slider from './Slideshow'; 

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Convert the email to lowercase before further processing
    const lowercaseEmail = formState.email.toLowerCase();
    console.log("lowercaseEmail", lowercaseEmail);
  
    try {
      const { data } = await login({
        variables: {
          ...formState,
          email: lowercaseEmail, // Ensure the lowercase email is sent
        },
      });
  
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  
    // Clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  

  return (
    <Grid container spacing={2}>
      {/* Left Column - Slider */}
      <Grid item xs={12} sm={8}>
      <Slider />
      {/* <img
        src="/assets/running.jpg"  // Replace with the actual path to your image
        alt="RunTrack"
        style={{ width: '100%', height: 'auto' }}  // Adjust width and height as needed
      /> */}
</Grid>

      {/* Right Column - Login Form */}
      <Grid item xs={12} sm={4}>
        <main className="flex-row justify-center mb-4">
          <div className="col-12">
            <div className="card">
              <h4 className="card-header bg-dark text-light p-2">Login</h4>
              <div className="card-body">
                {data ? ( // Check if data is defined
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-block btn-info"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </Grid>
    </Grid>
  );
};

export default Login;
