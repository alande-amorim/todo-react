import { InputAdornment, Paper, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

type addItemProps = {
  addItem: (e: any) => void;
};

function AddItem({ addItem }: addItemProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(task);
    setTask("");
  };

  return (
    <Paper
      elevation={1}
      sx={{
        px: 2,
        py: 2,
        mb: 2,
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyboardArrowRightIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </form>
    </Paper>
  );
}

export default AddItem;
