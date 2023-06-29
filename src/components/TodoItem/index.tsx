import { Box, Checkbox, IconButton, Paper, Typography } from "@mui/material";
import { PropsWithChildren, useMemo } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TodoItem } from "~/types";
import { useConfirm } from "material-ui-confirm";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type Controller = {
  editItem: (itemId: TodoItem["id"], data: TodoItem) => void;
  deleteItem: (itemId: TodoItem["id"]) => void;
};

type TodoItemProps = PropsWithChildren<{
  item: TodoItem;
  controller: Controller;
}>;

export default function TodoItem({ item, controller }: TodoItemProps) {
  const isComplete = useMemo(() => !!item.completedAt, [item.completedAt]);
  const confirm = useConfirm();

  function handleEdit(e: React.FocusEvent<HTMLSpanElement, Element>) {
    controller.editItem(item.id, {
      ...item,
      title: e.target.textContent as string,
      updatedAt: new Date(),
    });
  }

  function toggleComplete(e: React.ChangeEvent<HTMLInputElement>) {
    item.completedAt = e.target.checked ? new Date() : null;

    controller.editItem(item.id, {
      ...item,
      updatedAt: new Date(),
    });
  }

  function handleDelete() {
    confirm({
      title: "Delete item",
      description: "Are you sure you want to delete this item?",
      confirmationText: "Delete",
      cancellationText: "Cancel",
      dialogProps: {
        maxWidth: "xs",
      },
    })
      .then(() => {
        controller.deleteItem(item.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Paper
      elevation={1}
      sx={{
        px: 1,
        py: 2,
        mb: 2,
        "& .drag": {
          display: "none",
          // mr: 1,
          cursor: "grab",
        },
        ":hover > *": {
          opacity: 1,
          "& .drag": {
            display: "block",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          opacity: isComplete ? 0.3 : 1,
          transition: "opacity 0.1s ease-in-out",
        }}
      >
        {!isComplete && <DragIndicatorIcon className="drag" />}
        <Checkbox checked={isComplete} onChange={toggleComplete} />{" "}
        <Typography
          flex={1}
          contentEditable={!isComplete}
          suppressContentEditableWarning={!isComplete}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              (e.target as HTMLSpanElement).blur();
              return;
            }
          }}
          onBlur={handleEdit}
          sx={{
            textDecoration: isComplete ? "line-through" : "none",
            cursor: isComplete ? "default" : "text",
          }}
        >
          {item.title}
        </Typography>
        {!isComplete && (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
