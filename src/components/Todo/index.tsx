import {
  Box,
  Divider,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

import TodoItem from "~/components/TodoItem";
import CheckIcon from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddItem from "~/components/TodoItem/AddItem";
import { useParams } from "react-router-dom";
import useGetTodoQuery from "~/hooks/useGetTodoQuery";
import { TodoItem as TodoItemType, Todo as TodoType } from "~/types";
import useUpdateTodoMutation from "~/hooks/useUpdateTodoMutation";

function Todo() {
  const { id } = useParams();
  const { data: todo } = useGetTodoQuery(id as string);
  const { mutate: updateTodo } = useUpdateTodoMutation();

  const editTitle = (e: React.FormEvent<HTMLSpanElement>) => {
    if (todo) {
      todo.title = e.currentTarget.textContent as string;
      updateTodo([id as string, todo as TodoType]);
    }
  };

  const addItem = (itemTitle: string) => {
    todo?.items.push({
      id: Math.random().toString(36).substr(2, 9),
      title: itemTitle,
      order: todo.items.length,
      createdAt: new Date(),
      completedAt: null,
      updatedAt: null,
    });
    updateTodo([id as string, todo as TodoType]);
  };

  const editItem = (itemId: TodoItemType["id"], data: TodoItemType) => {
    if (todo) {
      const index = todo.items.findIndex(({ id }) => id === itemId);
      todo.items[index] = data;
      updateTodo([id as string, todo]);
    }
  };

  const deleteItem = (itemId: TodoItemType["id"]) => {
    if (todo) {
      const index = todo.items.findIndex(({ id }) => id === itemId);
      todo.items.splice(index, 1);
      updateTodo([id as string, todo]);
    }
  };

  const itemController = {
    addItem,
    editItem,
    deleteItem,
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          color: "#888",
          gap: 1,
          ":hover svg": {
            color: "#353535",
          },
        }}
      >
        <CheckIcon />{" "}
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.5rem",
            flex: "1",
            fontWeight: 500,
            ":hover": {
              color: "#353535",
            },
          }}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              (e.target as HTMLSpanElement).blur();
              return;
            }
          }}
          onBlur={(e) => editTitle(e)}
        >
          {todo?.title}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} orientation="horizontal" />

      {false && (
        <>
          <Box sx={{ display: "flex", py: 1 }}>
            <FormControl sx={{ flex: 1 }} variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Filter tasks
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterAltIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Divider sx={{ my: 2 }} orientation="horizontal" />
        </>
      )}

      <AddItem addItem={addItem} />

      {todo?.items.map((item) => (
        <TodoItem item={item} key={item.id} controller={itemController} />
      ))}

      {/* <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={}
      >
        <AddTaskIcon />
      </Fab> */}
    </>
  );
}

export default Todo;
