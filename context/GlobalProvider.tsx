import { app, db } from "@/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {},
  user: null,
  setUser: (user: any) => {},
  loading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    console.log("auth changed");
    if (!auth.currentUser) {
      setIsLogged(false);
      setUser(null);
      setLoading(false);
    }
    else {
      console.log("has current user");
      setIsLogged(true);

      const fetchData = async () => {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid.toString());
          const userDoc = await getDoc(userRef);
        
          if (userDoc.exists()) {
            const userData = userDoc.data();
        
            console.log("User data from Firestore:", userData);
        
            setUser(userData);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } 
    
      fetchData();

      setLoading(false);
    }
  }, [auth.currentUser]);

  console.log("GLOBAL PROV REFRESH");

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
