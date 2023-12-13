import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useUpdateUserProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

const Profile = () => {
  // Redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');

  // Get logged-in user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setFitnessGoal(userInfo.fitnessGoal);
  }, [
    userInfo.name, 
    userInfo.email, 
    userInfo.fitnessGoal,
  ]);

  // Nagivates to dashboard page when clicked without updating Profile
  const handleBackButton = () => {
    navigate("/dashboard");
  };

  // Dispatch user information to complete update action when form is submitted
  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          fitnessGoal,
        }).unwrap();
        dispatch(setCredentials({ ...response }));
        toast.success("Profile information updated successfully. Please login again.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="py-3 mt-3">
        <FormContainer>
          <div className="justify-content-md-center">
            <div className="p-2">
              <h1>
                <FaUserCheck /> Update Profile
              </h1>
            </div>
            <div className="p-2">
              <h6>Change your username, email address, or password.</h6>
            </div>
          </div>
          <Form onSubmit={onSubmit}>
            <FloatingLabel className="my-2" controlId="name" label="Username">
              <Form.Control 
                type="text"
                value={name}
                placeholder="Username"
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </FloatingLabel>
            
            <FloatingLabel className="my-2" controlId="email" label="Email Address">
              <Form.Control 
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </FloatingLabel>

            <FloatingLabel className="my-2" controlId="password" label="Update Password">
              <Form.Control 
                type="password"
                value={password}
                placeholder="Update Password"
                onChange={(event) => setPassword(event.target.value)}
              ></Form.Control>
            </FloatingLabel>
            
            <FloatingLabel className="my-2" controlId="passwordConfirm" label="Confirm New Password">
              <Form.Control 
                type="password"
                value={passwordConfirm}
                placeholder="Confirm New Password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
              ></Form.Control>
            </FloatingLabel>

            <FloatingLabel className="my-2" controlId="fitnessGoal" label="My Fitness Goal is to:">
              <Form.Control 
                type="text"
                value={fitnessGoal}
                placeholder="Fitness Goal"
                onChange={(event) => setFitnessGoal(event.target.value)}
              ></Form.Control>
            </FloatingLabel>

            { isLoading && <Loader /> }

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg">
                Submit
              </Button>
              <Button type="submit" onClick={handleBackButton} variant="secondary" size="lg">
                Back to Home
              </Button>
            </div>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default Profile;