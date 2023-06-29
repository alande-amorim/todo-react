import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DrawerHeader from "~/components/Drawer/DrawerHead";
import { useNavigate } from "react-router-dom";

type MenuItemType = {
  label: string;
  icon: JSX.Element;
  path: string;
};

type SideBarProps = {
  barWidth: number;
  open: boolean;
  closeDrawer: () => void;
  items: MenuItemType[];
};

function SideBar({ barWidth, open, closeDrawer, items }: SideBarProps) {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: barWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: barWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            direction: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Avatar>A</Avatar>
          John Doe
        </Box>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {items.map(({ label, icon, path }) => (
          <ListItem key={label} disablePadding onClick={() => navigate(path)}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
