import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../store/slices/todo/todoSlice";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

export const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setStatus("incomplete");

    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      //Add Task
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuidv4(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added successfully");
      }
      // Update Task
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => {
          setTitle("");
          setStatus("incomplete");
          return setModalOpen(false);
        }}
        maxWidth={"sm"}
      >
        <DialogTitle>{type === "add" ? "Add" : "Update"} Task</DialogTitle>
        <DialogContent>
          <form id="formulario" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Nombre de la tarea"
              label="Title"
              variant="outlined"
              sx={{ marginTop: "10px" }}
            />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="incomplete">Incomplete</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setTitle("");
              setStatus("incomplete");
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="formulario"
            // onClick={() => setModalOpen(false)}
          >
            {type === "add" ? "Add Task" : "Update Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
