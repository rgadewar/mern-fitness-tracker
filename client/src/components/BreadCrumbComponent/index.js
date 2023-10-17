// Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, makeStyles } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
}));

const Breadcrumb = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.breadcrumbs}
    >
      {pathnames.length > 0 ? (
        <Link component={Link} to="/">
          Home
        </Link>
      ) : (
        <Typography>Home</Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link component={Link} to={routeTo} key={name}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
