import { Box, Chip, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";

export const AppContent = () => {
  const { todoList, filterStatus } = useSelector((state) => state.todo);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });
  return (
    <>
      {/* <Box display={"flex"} alignSelf={"center"} justifyContent={"center"}> */}
        <Paper elevation={3} sx={{marginTop:"15px" , padding:"10px"}}>
          {filteredTodoList && filteredTodoList.length > 0 ? (
            filteredTodoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <Chip label="ToDos Not Found" />
          )}
        </Paper>
      
    </>
  );
};
