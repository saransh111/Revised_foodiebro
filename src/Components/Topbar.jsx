import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../Appwrite/auth';
import { AppBar, Toolbar, Button, Typography, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function TopBar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loginbutton = () => {
    navigate('/login');
  };

  const registerbutton = () => {
    navigate('/register');
  };

  const mycartbutton = () => {
    navigate('/Cart');
  };

  const signOut = async () => {
    console.log("signout_clicked");
    await authService.logout();
    window.location.reload();
  };

  const getemail = async () => {
    try {
      const userdata = await authService.getCurrentUser();
      return userdata;
    } catch (error) {
      console.error('Failed to fetch user data', error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const currentuser = await getemail();
      console.log("current user", currentuser);
      setUser(currentuser);
    }

    fetchUser();
  }, []);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6">
          FoodieBro
        </Typography>
        <Box ml="auto" display="flex" alignItems="center">
          {!props.LoggedIn ? (
            <>
              <Button
                onClick={loginbutton}
                startIcon={<LoginIcon />}
                variant="contained"
                color="inherit"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                onClick={registerbutton}
                startIcon={<PersonAddIcon />}
                variant="contained"
                color="inherit"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Hi, {user ? user.name : 'User'}
              </Typography>
              <IconButton
                color="inherit"
                onClick={mycartbutton}
                sx={{ mr: 2 }}
              >
                <ShoppingCartIcon />
              </IconButton>
              <Button
                onClick={signOut}
                startIcon={<ExitToAppIcon />}
                variant="contained"
                color="secondary"
              >
                Sign Out
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
