import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Item from "../Todos/Item";

import useCreateTodoMutation from "~/hooks/useCreateTodoMutation";
import queryClient from "~/config/queryClient";
import { Todo } from "~/types";
import { useNavigate } from "react-router-dom";

function NewTodoList() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const { mutate } = useCreateTodoMutation({
    onSuccess: ({ id }: Todo) => {
      queryClient.invalidateQueries(["todos"]);
      navigate("/todo/" + id);
    },
  });

  const handleCreate = () => {
    mutate({
      title,
    });
    setOpen(false);
  };

  return (
    <>
      <Item
        onClick={() => setOpen(true)}
        sx={{
          border: "3px dashed #ddd",
        }}
      >
        + TODO
      </Item>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 8,
            boxShadow: 24,
            py: 4,
            px: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AddCircleOutlineIcon fontSize="large" />
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h3"
            textAlign="center"
          >
            Create TODO list
          </Typography>
          <Divider
            orientation="horizontal"
            sx={{ my: 1, flex: 1, width: "100%" }}
          />
          <Typography>
            Give a name to your new TODO list to start adding tasks to it:
          </Typography>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            fullWidth
            label="List name"
            variant="outlined"
          />
          <Divider
            orientation="horizontal"
            sx={{ my: 1, flex: 1, width: "100%" }}
          />
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
          >
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default NewTodoList;
