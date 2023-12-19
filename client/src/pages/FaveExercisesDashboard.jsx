import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useFetchSavedFaveExercisesListQuery } from "../slices/usersApiSlice";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import SearchAdd from "../assets/icons/search-add.png";
import WorkoutImage from "../assets/icons/sport-color.png";
import CompletedWorkoutImage from "../assets/icons/workout-calendar.png";
import VerticalLine from "../assets/icons/line.png";
import FavoriteExercisesList from "../components/FavoriteExercisesList";

/**
 * FaveExercisesDashboard is the parent component that displays user's favorite exercises.
 *
 * @returns {JSX.Element} - A component for displaying and updating the user's favorite exercises list.
 */

const FaveExercisesDashboard = () => {
  // Get logged-in user information from Redux store
  const user = useSelector((state) => state.auth.userInfo);

  // Use query hook to fetch saved exercises data
  const { data: fetchedSavedExercisesListDataFromMongoDB, isFetching, isLoading, refetch } = useFetchSavedFaveExercisesListQuery();

  // Get the current location to parse and initialize the currentPage from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageFromURL = searchParams.get("page");
  const parsedPage = parseInt(currentPageFromURL, 10);
  const [currentPage, setCurrentPage] = useState(isNaN(parsedPage) ? 1 : parsedPage);

  // Use the useEffect hook to refetch data when the component mounts or when the URL changes
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: "20px", mb: "110px"}}>
      <Box>
        <Typography fontWeight="700" sx={{ fontSize: { lg: "55px", xs: "30px"}}} lineHeight="normal" mb="5px" mt="110px" textAlign="center">
          {user && user.name}'s Favorite Exercises List
        </Typography>
      </Box>
      <FavoriteExercisesList 
        user={user} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchedSavedExercisesListDataFromMongoDB={fetchedSavedExercisesListDataFromMongoDB}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <Box className="button-group">
        <Link to="/exercise">
          <Tooltip title={"Exercises Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={SearchAdd} alt="exercises dashboard" className="icon" />
            </Button>
          </Tooltip>
        </Link>
        <Button disabled>
            <img src={VerticalLine} alt="line" className="icon" />
        </Button> 
        <Link to="/dashboard">
          <Tooltip title={"Future Feature... stay tuned! Back to Welcome Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={WorkoutImage} alt="workout list" className="icon" />
            </Button> 
          </Tooltip>
        </Link>
        <Button disabled>
          <img src={VerticalLine} alt="line" className="icon" />
        </Button> 
        <Link to="/dashboard">
          <Tooltip title={"Future Feature... stay tuned! Back to Welcome Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={CompletedWorkoutImage} alt="completed workout list" className="icon" />
            </Button>
          </Tooltip>
        </Link>
      </Box>
    </Stack>
  )
};

export default FaveExercisesDashboard;