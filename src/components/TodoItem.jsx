import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useState , useEffect } from "react";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/slices/todo";
import { toast } from "react-hot-toast";
import { TodoModal } from "./TodoModal";

export const TodoItem = ({ todo }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  return (
    <>
      <Box>
        <List>
          <ListItem
            secondaryAction={
              <Box>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ color: "#DC3545"}} fontSize="large"/>
                </IconButton>
                <IconButton onClick={handleUpdate}>
                  <EditIcon color="primary" fontSize="large" />
                </IconButton>
              </Box>
            }
          >
            <ListItemAvatar>
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                inputProps={{ "aria-label": "controlled" }}
                size="large"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                checked ? (
                  <Box sx={{ textDecoration: "line-through" ,fontWeight:"bold" }}>
                    {todo.title}
                  </Box>
                ) : (
                  <Box sx={{fontWeight:"bold" }} >{todo.title}</Box>
                )
              }
              secondary={todo.time}
            />
          </ListItem>
          <Divider variant="inset" component="li" sx={{ backgroundColor: '#FF8400' }} />
        </List>
      </Box>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
};
