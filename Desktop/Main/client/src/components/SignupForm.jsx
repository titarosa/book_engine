import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client'; // Apollo mutation hook
import { ADD_USER } from '../utils/mutations'; // GraphQL mutation for adding a user

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Mutation hook to add a user
  const [addUser, { error }] = useMutation(ADD_USER);

  // Effect to show the alert if there is an error from the mutation
  useEffect(() => {
    if (error) {
      setShowAlert(true); // Show alert on error
    } else {
      setShowAlert(false); // Hide alert when no error
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check form validation as per react-bootstrap docs
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Perform mutation to create a new user
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data); // Log the data returned by the mutation

      // Login the user with the token received from the mutation response
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    // Clear form data after submission
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* Form with noValidate and validated for form validation */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
          Something went wrong with your signup!
        </Alert>

        {/* Username field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit button */}
        <Button
          disabled={
            !(userFormData.username && userFormData.email && userFormData.password)
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
