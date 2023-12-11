import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';
import AnatomyHeroBannerImage from "../assets/icons/anatomy.png";
import SearchAdd from "../assets/icons/search-add.png";
import FaveList from "../assets/icons/favorites-list.png";
import WorkoutImage from "../assets/icons/sport-color.png";
import CompletedWorkoutImage from "../assets/icons/workout-calendar.png";

/**
 * DashboardHero component to display the dashboard's welcome message and options.
 *
 * @returns {JSX.Element} - A child component for the Dashboard's welcome message and options.
 */

const DashboardHero = () => {

  // Get logged-in user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Box 
        sx={{
          mt: { lg: "150px", sx: "70px"},
          ml: { sm: "50px"},
          pt: { sx: "20px" }
        }}
        position="relative"
        p="20px"
        marginTop="50px"
        marginBottom="80px"
      >
        <Typography color="#ff2625" fontWeight="700" fontSize="36px">
          {userInfo && userInfo.name}, welcome to your dashboard!
        </Typography>
        <Typography fontWeight="700" sx={{ fontSize: { lg: "44px", xs: "40px"}}}>
          Plan your workout and <br /> 
          let's accomplish your <br /> 
          fitness goal to {userInfo && userInfo.fitnessGoal}!
        </Typography>
        <Typography fontSize="22px" lineHeight="35px">
          Search for exercises and learn how to safely perform them.
        </Typography>
        <Link to="/exercise">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
          <img 
              src={SearchAdd} 
              alt="favorite exercises list" 
              style={{ 
                width: "32px", 
                height: "32px", 
                verticalAlign: "center",
                marginRight: "7px",
              }}
            /> Search and add exercises to favorites list
          </Button> 
        </Link>
        <br />
        <Link to="/favoriteexercisesdashboard">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            <img 
              src={FaveList} 
              alt="favorite exercises list" 
              style={{ 
                width: "32px", 
                height: "32px", 
                verticalAlign: "center",
                marginRight: "7px",
              }}
            /> View your current favorite exercises list
          </Button> 
        </Link>
        <br />
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            <img 
              src={WorkoutImage} 
              alt="favorite exercises list" 
              style={{ 
                width: "32px", 
                height: "32px", 
                verticalAlign: "center",
                marginRight: "7px",
              }}
            /> Workouts (Future Feature... stay tuned!)
          </Button> 
        <br />
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            <img 
              src={CompletedWorkoutImage} 
              alt="favorite exercises list" 
              style={{ 
                width: "32px", 
                height: "32px", 
                verticalAlign: "center",
                marginRight: "7px",
              }}
            /> View previously completed workouts (Future Feature... stay tuned!)
          </Button> 
        <br />
        <img src={AnatomyHeroBannerImage} alt="anatomy-sport" className="hero-banner-img" />
      </Box>
    </>
  )
};

export default DashboardHero;