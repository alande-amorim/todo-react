import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Todo } from "~/types";
import useDeleteTodoMutation from "~/hooks/useDeleteTodoMutation";
import { useConfirm } from "material-ui-confirm";

const ITEM_HEIGHT = 48;

type ItemMenuProps = {
  id: Todo["id"];
};

function ItemMenu({ id }: ItemMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: deleteFn } = useDeleteTodoMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    confirm({
      title: "Delete todo",
      description: "Are you sure you want to delete this todo?",
      confirmationText: "Delete",
      cancellationText: "Cancel",
      dialogProps: {
        maxWidth: "xs",
      },
    })
      .then(() => {
        deleteFn(id);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const confirm = useConfirm();

  return (
    <div style={{ position: "absolute", right: 0, zIndex: 10 }}>
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 3,
  position: "relative",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 200,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}));

type ItemProps = React.PropsWithChildren<{
  id?: Todo["id"];
  sx?: any;
  elevation?: number;
  onClick: () => void;
  progress?: number;
}>;

export default function Item({
  children,
  sx,
  elevation,
  onClick,
  id,
  progress,
}: ItemProps) {
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Paper
        elevation={elevation || 0}
        sx={{
          ...sx,
          height: 240,
          position: "relative",
        }}
      >
        {id && <ItemMenu id={id} />}
        {id && <BorderLinearProgress variant="determinate" value={progress} />}

        <Button
          onClick={onClick}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Button>
      </Paper>
    </Grid>
  );
}
