import {
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AppBar from "~/components/AppBar";
import DrawerHeader from "~/components/Drawer/DrawerHead";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const barWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${barWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const menuItems = [
  {
    label: "TODOs",
    icon: <PlaylistAddCheckIcon />,
    path: "/todo",
  },
];

type LayoutProps = {
  pageTitle: string | JSX.Element;
};

function Layout({ pageTitle }: LayoutProps) {
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" width={barWidth} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar
        barWidth={barWidth}
        open={open}
        closeDrawer={handleDrawerClose}
        items={menuItems}
      />

      <Main open={open}>
        <DrawerHeader />
        <Container style={{ width: "100vw" }}>
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
}

export default Layout;
