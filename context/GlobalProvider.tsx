import React, { createContext, useContext, useState, useEffect } from 'react';
const GlobalContext = createContext({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {},
  user: null,
  setUser: (user: any) => {},
  loading: true,
});

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // getCurrentUser()
      //   .then((res) => {
      //     if (res) {
      //       setIsLogged(true);
      //       setUser(res);
      //     } else {
      //       setIsLogged(false);
      //       setUser(null);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }, []);
  
    return (
      <GlobalContext.Provider
        value={{
          isLogged,
          setIsLogged,
          user,
          setUser,
          loading,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };
  
  export default GlobalProvider;