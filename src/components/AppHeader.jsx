import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../store/slices/todo";
import { TodoModal } from "./TodoModal";

export const AppHeader = () => {
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  //Toggle TodoModal
  const [modalOpen, setModalOpen] = useState(false);
  const handleClickOpen = () => {
    setModalOpen(true);
  };

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>

        <ToggleButtonGroup
          color="light"
          sx={{ backgroundColor:"#159895"}}
          value={filterStatus}
          exclusive
          onChange={updateFilter}
          aria-label="Platform"

        >
          <ToggleButton value="all" sx={{ color: '#fff' ,'&.Mui-selected': { backgroundColor: '#57C5B6' } }} >
            All
          </ToggleButton>
          <ToggleButton value="complete" sx={{ color: '#fff' ,'&.Mui-selected': { backgroundColor: '#57C5B6' } }}>
            Completed
          </ToggleButton>
          <ToggleButton value="incomplete" sx={{ color: '#fff' ,'&.Mui-selected': { backgroundColor: '#57C5B6' } }}>
            Incomplete
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Box>
  );
};
