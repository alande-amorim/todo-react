import { Box, Modal, Typography } from "@mui/material";

type TodoItemModalProps = {
  open: boolean;
  handleClose: () => void;
};

function TodoItemModal({ open, handleClose }: TodoItemModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
      </Box>
    </Modal>
  );
}

export default TodoItemModal;
