import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link'

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));



const SearchAppBar = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState('');

  const search = () => {
    console.log(process.env.NEXT_PUBLIC_OPEN_WEATHER)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER}`;
    axios.get(url).then((resp) => {
      setData(resp.data);
      console.log(resp.data);
    })
  }
  return (
    <div>
      <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Open Skies
          </Typography>
          <Link href='/'>
            index
          </Link>
          <Link href='/Movie'>
            index
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange = {(e)=>setQuery(e.target.value)}
              onKeyPress = {(e) => {
                if(e.key === 'Enter')
                {search()}
              } 
            }
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
        <div>
          {data.name ? <h1>{data.name}</h1> : null}
          {data.main ? <h1>{data.main.temp}</h1> : null}
          {data.weather ? <h1>{data.weather[0].description}</h1> : null}
        </div>
    </div>
  )
}

export default SearchAppBar