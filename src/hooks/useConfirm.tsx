import * as React from "react";
import Confirm from "~/components/Confirm";

type useConfirmProps = {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const useConfirm = ({
  title,
  description,
  onCancel,
  onConfirm,
}: useConfirmProps) => {
  const [open, setOpen] = React.useState(false);

  const confirm = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmComponent = open && (
    <Confirm
      title={title}
      description={description}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );

  return {
    confirm,
    confirmComponent,
  };
};

export default useConfirm;
