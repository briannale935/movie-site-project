import React from 'react';
import { AppBar as MUIAppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
    const navigate = useNavigate();

    return (
        <MUIAppBar 
            position="static" 
            sx={{ 
                backgroundColor: 'rgba(255, 99, 71, 0.5)', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', 
                borderBottom: '2px solid rgba(255, 255, 255, 0.5)', 
                borderRadius: '8px',
                color: 'white',
                padding: '0 16px'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    MovieMatrix
                </Typography>
                <div>
                    <Button 
                        id="nav-landing" 
                        color="inherit" 
                        onClick={() => navigate('/')}
                        sx={{ marginLeft: '8px' }}
                    >
                        Landing
                    </Button>
                    <Button 
                        id="nav-search" 
                        color="inherit" 
                        onClick={() => navigate('/Search')}
                        sx={{ marginLeft: '8px' }}
                    >
                        Search
                    </Button>
                    <Button 
                        id="nav-review" 
                        color="inherit" 
                        onClick={() => navigate('/Review')}
                        sx={{ marginLeft: '8px' }}
                    >
                        Review
                    </Button>
                    <Button 
                        id="nav-myPage" 
                        color="inherit" 
                        onClick={() => navigate('/MyPage')}
                        sx={{ marginLeft: '8px' }}
                    >
                        MyPage
                    </Button>
                </div>
            </Toolbar>
        </MUIAppBar>
    );
};

export default AppBar;
