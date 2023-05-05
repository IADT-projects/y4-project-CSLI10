import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  // const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [errorAuth, setErrorAuth] = useState("");

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://golf-backend-app.vercel.app/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        let userID = response.data._id;
        let userToken = response.data.token;
        //   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userToken);
        //   setUserInfo(userInfo);
        //   setUserID(userInfo._id)
        setUserToken(userToken);
        getUser(userID);

        console.log("user info:", userInfo);
        console.log("User Token: " + userToken);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
        setErrorAuth("Invalid email or password");
      });
    // setUserToken('iuiasuhd');
    // AsyncStorage.setItem('userToken', userToken);
    setIsLoading(false);
  };

  const getUser = (id) => {
    axios
      .get(`https://golf-backend-app.vercel.app/api/users/${id}`)
      .then((response) => {
        let userInfo = response.data;
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    console.log("user token:", userToken);
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
    console.log("user token after:", userToken);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getUser,
        isLoading,
        userToken,
        userInfo,
        errorAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 