import { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
  children?: ReactNode;
}

interface AuthInfo {
  email: string;
  access_token: string;
  isLoggedIn: boolean;
}

const UserContext = createContext<{
  authInfo: AuthInfo;
  changeAuthInfo: (authInfo: AuthInfo) => void;
  resetAuthInfoToDefault: () => void;
} | null>(null);

export const useAuthContext = () => useContext(UserContext);

const defaultValues: AuthInfo = {
  email: '',
  access_token: '',
  isLoggedIn: false,
};

export const AuthProvider = ({ children }: Props) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(defaultValues);

  const changeAuthInfo = (info: AuthInfo) => {
    setAuthInfo(info);
  };

  const resetAuthInfoToDefault = () => {
    setAuthInfo(defaultValues);
  };

  return (
    <UserContext.Provider value={{ authInfo, resetAuthInfoToDefault, changeAuthInfo }}>
      {children}
    </UserContext.Provider>
  );
};
