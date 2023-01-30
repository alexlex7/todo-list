import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/authContext';

interface Props {
  children: ReactNode;
  redirectPath: string;
}

export default function PrivateRoute({ children, redirectPath }: Props) {
  const auth = useAuthContext();

  if (!auth?.authInfo.isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
