import {User} from '@react-native-google-signin/google-signin';
import {ReactElement, createContext, useState} from 'react';
import React from 'react';

interface IUserContext {
  user?: User;
  setUser?: any;
}

export const UserContext = createContext<IUserContext>({});

export function UserProvider({children}: {children: ReactElement}) {
  const [user, setUser] = useState();

  const value = {
    user: user,
    setUser: setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
