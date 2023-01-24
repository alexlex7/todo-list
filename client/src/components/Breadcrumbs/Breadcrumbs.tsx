import { Link, Breadcrumbs as MUIBreadcrumbs, Box } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export function Breadcrumbs() {
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <div>
      <MUIBreadcrumbs>
        {pathnames.length === 0 ? (
          <Box component={'span'} color="#47beff">
            Home page
          </Box>
        ) : (
          <Link component={RouterLink} to="/" underline="none" sx={{ color: 'grey.900' }}>
            Home page
          </Link>
        )}
        {pathnames.length > 0 &&
          pathnames.map((item, index, arr) => {
            const isCurrent = arr.length - 1 === index;
            return isCurrent ? (
              <Box key={index} component={'span'} color="#47beff">
                {item}
              </Box>
            ) : (
              <Link
                key={index}
                component={RouterLink}
                to={'/' + item}
                underline="none"
                sx={{ color: 'grey.900' }}
              >
                {item}
              </Link>
            );
          })}
      </MUIBreadcrumbs>
    </div>
  );
}
