import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { useSaveExerciseToFaveListMutation, useDeleteSavedExerciseFromListMutation } from "../slices/usersApiSlice";
import { addSavedExerciseToList, removeSavedExerciseFromList } from "../slices/authSlice";
import { toast } from "react-toastify";
import BodyPartImageIcon from "../assets/icons/bodyPart-target.png";
import EquipmentImageIcon from "../assets/icons/fitness-equipment.png";
import TargetImageIcon from "../assets/icons/body-target.png";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import Loader from "./Loader";

/**
 * Detail is the child component of ExerciseDetailPage that displays information about a specific exercise.
 *
 * @param {Object} props - Props containing exerciseDetailToDisplay and user.
 *    - exerciseDetailToDisplay: Object representing the details of the exercise to display.
 *    - user: Object representing the logged-in user information.
 * @returns {JSX.Element} - A component for displaying details about a specific exercise.
 */

const Detail = ({ exerciseDetailToDisplay, user }) => {
  const { 
    id,
    bodyPart, 
    equipment, 
    gifUrl, 
    name, 
    target, 
    secondaryMuscles, 
    instructions,
   } = exerciseDetailToDisplay;

   if (exerciseDetailToDisplay) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Additional exercise details to display
  const extraExerciseDetailToDisplay = [
    {
      icon: BodyPartImageIcon,
      name: bodyPart,
    },
    {
      icon: TargetImageIcon,
      name: target,
    },
    {
      icon: EquipmentImageIcon,
      name: equipment,
    },
  ];

  // Get logged-in user information from Redux store
  // Initialize useDispatch to dispatch the save exercise action
  const dispatch = useDispatch();
  const savedFavoriteExercisesList = useSelector((state) => state.auth.userInfo.savedFavoriteExercisesList);

  // Local state to track and initialize isLoading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to check if the exercise is saved in the user's saved favorite exercises list Redux state
  const isExerciseSaved = () => {
    if (!exerciseDetailToDisplay || typeof exerciseDetailToDisplay.id === 'undefined' || !savedFavoriteExercisesList) {
      console.error("Exercise, exercise id, or savedFavoriteExercisesList is not defined");
      return false;
    }
  
    const isSaved = savedFavoriteExercisesList.some((item) => item.exercise && item.exercise.id === exerciseDetailToDisplay.id.toString());
  
    return isSaved;
  };

  // Use Mutation to interact with MongoDB
  const [saveExercise] = useSaveExerciseToFaveListMutation();
  const [deleteExercise] = useDeleteSavedExerciseFromListMutation();
  
  // Define the function to handle the click event when adding or removing the exercise
  const handleExerciseClick = async () => {
    // Start loading
    setIsLoading(true);

    try {
      if (isExerciseSaved()) {
        // Remove the saved exercise from saved favorite exercises list
        await removeExerciseFromSavedExerciseList(id);
      } else {
        // Add the exercise to saved favorite exercises list
        await addExerciseToSavedExerciseList(id, exerciseDetailToDisplay);
      }
    } catch (err) {
      toast.error(err?.exerciseToBeSavedData?.message || err.error);
    } finally {
      // Always stop loading after the action, whether it succeeded or failed
      setIsLoading(false);
    }
  };

  const addExerciseToSavedExerciseList = async (exerciseId, exercise) => {
    // Check if the exercise is already saved
    if (isExerciseSaved()) {
      toast.warning("Exercise is already in your saved favorite exercises list");
    } else {
      // Exercise is not in the saved favorite exercises list, can proceed to add it
      await saveExercise({
        userId: user.id,
        exerciseId: exerciseId.toString(),
        exercise: exercise,
      });
      // Dispatch the action to add the exercise to savedExericseList
      dispatch(addSavedExerciseToList({ exerciseId: exerciseId, exercise: exercise }));
      toast.success("Exercise added successfully to your saved favorite exercises list");
    }
  };

  const removeExerciseFromSavedExerciseList = async (exerciseId) => {
    // Remove the saved exercise from saved favorite exercises list
    await deleteExercise({ userId: user.id, exerciseId });
    // Dispatch the action to remove the exercise from savedExericseList
    dispatch(removeSavedExerciseFromList({ exerciseId: exerciseId }));
    toast.success("Exercise removed successfully from your saved favorite exercises list");
  };

  return (
    <Stack gap="60px" sx={{flexDirection: { lg: "row" }, pt: "20px", alignItems: "center"}}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" sx={{ flex: 0.5 }} />
      <Stack sx={{ gap: { lg: "15px", xs: "10px" }, flex: 3 }}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="h6">
          is a great exercise for your {bodyPart}. The {name} is an amazing exercise that builds stamina, cardiovascular endurance, muscular endurance, and even strength depending on your training intensity! Some of the muscles worked include your {secondaryMuscles ? secondaryMuscles.join(', ') : ''}, and {target}.
        </Typography>
        <Typography variant="h4">
          Exercise instructions:
        </Typography>
        <Typography variant="h6">
          {instructions ? instructions.join(' ') : ''}
        </Typography>
        {extraExerciseDetailToDisplay.map((iconList) => (
          <Stack key={iconList.name} direction="row" gap="24px" alignItems="center">
            <Button disabled sx={{ background: "#fff2db", borderRadius: "50%", width: "100px", height: "100px" }}>
              <img src={iconList.icon} alt={bodyPart} style={{ width: "50px", height: "50px" }} />
            </Button>
            <Typography variant="h5" textTransform="capitalize">
              {iconList.name}
            </Typography>
            {user && (
              <Tooltip title={`Click to ${isExerciseSaved() ? "REMOVE" : "ADD"} exercise ${isExerciseSaved() ? "from" : "to"} your saved favorite exercises list`.toUpperCase()} arrow>
                <Button onClick={handleExerciseClick}  className={`exercise-card-${isExerciseSaved() ? "check" : "add"}-btn`}>
                  {isLoading ? (<Loader />) : isExerciseSaved() ? <CheckIcon fontSize="large" /> : <AddIcon fontSize="large" />}
                </Button>
              </Tooltip>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
};

export default Detail;