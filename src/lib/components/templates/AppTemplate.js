import React, { useContext, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Box, CssBaseline, Drawer as MuiDrawer, IconButton, Toolbar, Divider, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet, useNavigate } from "react-router-dom";
import { FireactContext } from "../Fireact";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export const AppTemplate = ({logo, drawerMenu, toolbarChildren, toolBarMenu}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {config} = useContext(FireactContext);
    const brand = config.brand;
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: '36px',
                      ...(open && { display: 'none' }),
                    }}>
                        <MenuIcon />
                    </IconButton>
                    {toolbarChildren}
                    <div style={{
                        marginLeft: "auto",
                        marginRight: "0px",
                    }}>{toolBarMenu}</div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && <div style={{marginLeft:'0px', marginRight:'auto', display:'inline-flex',alignItems: 'center', flexWrap: 'wrap'}}>
                        <Button style={{color: "#000000"}} onClick={() => navigate("/")}>
                          <div style={{display: 'inline-flex', paddingRight: '20px'}}>
                              {logo}
                          </div>
                          <Typography variant="h6">{brand}</Typography>
                        </Button>
                    </div>}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                    {drawerMenu}
                <Divider />
            </Drawer>
            <Box component="main" sx={{
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                height: '100vh',
                overflow: 'auto'
            }}>
                <DrawerHeader />
                <div style={{position: 'relative'}}>
                    <Box mt={5} ml={3} mr={3} mb={3}>
                      <Outlet /> 
                    </Box>
                </div>
            </Box>
        </Box>
    )
}