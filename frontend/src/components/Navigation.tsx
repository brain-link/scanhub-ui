import React from 'react';
import { Link as RouterLink, useLocation} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';

// Icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

import { useTheme } from '@mui/material/styles';

// Menu elements
const menuItems = [
    {id: 0, text: "Home", link: "/"},
    {id: 1, text: "Patients", link: "/patients"},
    {id: 2, text: "Devices", link: "/devices"},
];

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(true);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="primary" />;
    }

    return (
        <IconButton
            id="toggle-mode"
            variant="outlined"
            color="primary"
            size="sm"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function Navigation() {

    const loc = useLocation();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);

    return (
        <AppBar position="fixed" color='default' sx={{ zIndex: 'snackbar', maxHeight: theme.navigation.height }}>
            <Toolbar sx={{ gap: 2 }}>

                <IconButton variant="plain" href="https://www.brain-link.de/">
                    <img
                        src='https://avatars.githubusercontent.com/u/27105562?s=200&v=4'
                        alt=""
                        height="40"
                        className="d-inline-block"
                    />
                </IconButton>

                <Typography variant="h4" sx={{ mr: 5 }}>
                    ScanHub
                </Typography> 

                <>
                {
                    menuItems?.map( item => (
                        <Button
                            component={RouterLink}
                            to={item.link}
                            color="primary"
                            startDecorator={ item.link === "/" ? <HomeRoundedIcon/> : null }
                            disabled={ loc.pathname === item.link }
                            variant={ loc.pathname === item.link ? 'soft' : 'plain' }
                            key={item.id}
                        >
                            {item.text}
                        </Button>
                    ))
                }
                </>

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
                    <ColorSchemeToggle />
                </Box>

                {/* User menu */}
                <IconButton variant='plain' onClick={(event) => { setAnchorEl(event.currentTarget)}}>
                    <Avatar variant='soft' color="primary" />
                </IconButton>
                
                <Menu
                    id="positioned-demo-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => {setAnchorEl(null)}}
                    aria-labelledby="positioned-demo-button"
                    placement="bottom-end"
                    sx={{ zIndex: 'tooltip' }}
                >
                    <MenuItem key='profile' onClick={() => {setAnchorEl(null)}}>
                        <ListItemDecorator>
                            <PersonSharpIcon />
                        </ListItemDecorator>{' '}
                            Profile
                    </MenuItem>
                    <MenuItem key='settings' onClick={() => {setAnchorEl(null)}}>
                        <ListItemDecorator>
                            <AdminPanelSettingsSharpIcon />
                        </ListItemDecorator>{' '}
                            Settings
                    </MenuItem>
                    <ListDivider />
                    <MenuItem key='logout' disabled onClick={() => {setAnchorEl(null)}}>
                        <ListItemDecorator>
                            <LogoutSharpIcon />
                        </ListItemDecorator>{' '}
                            Logout
                    </MenuItem>
                </Menu>
                
            </Toolbar>
        </AppBar>
    );
}
