import { Link, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export function Breadcrumbs() {
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <div>
      <MUIBreadcrumbs>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            color: 'text.primary',
          }}
        >
          Home page
        </Link>
        {pathnames.length > 0 &&
          pathnames.map((item, index) => {
            return (
              <Link
                key={index}
                component={RouterLink}
                to={'/' + item}
                underline="none"
                sx={{
                  color: 'text.primary',
                }}
              >
                {item}
              </Link>
            );
          })}
      </MUIBreadcrumbs>
    </div>
  );
}
