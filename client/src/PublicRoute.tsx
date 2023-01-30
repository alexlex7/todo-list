import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/authContext';

interface Props {
  children: ReactNode;
  restricted: boolean;
  redirectPath: string;
}

export default function PublicRoute({ children, restricted = false, redirectPath }: Props) {
  const auth = useAuthContext();
  const shouldRedirect = auth?.authInfo.isLoggedIn && restricted;
  if (shouldRedirect) {
    return <Navigate to={redirectPath} />;
  }
  return <>{children}</>;
}
