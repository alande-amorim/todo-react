import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NewTodoList from "../NewTodoModal";
import Item from "./Item";
import useGetTodosQuery from "~/hooks/useGetTodosQuery";
import { format } from "date-fns";

function Todos() {
  const { data: todos } = useGetTodosQuery();
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <NewTodoList />
      {todos?.map((todo) => (
        <Item
          key={todo.id}
          elevation={1}
          onClick={() => navigate("/todo/" + todo.id)}
          id={todo.id}
          progress={
            (todo.items.filter((item) => item.completedAt).length /
              todo.items.length) *
            100
          }
        >
          <Typography>{todo.title}</Typography>
          <span>{format(new Date(todo.createdAt), "PPpp")}</span>
        </Item>
      ))}
    </Grid>
  );
}

export default Todos;
