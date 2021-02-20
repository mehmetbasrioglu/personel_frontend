import React, { createContext } from "react";
import axios from "axios"

export const ContextProvider = createContext();

const Context = (props) => {

  const [user, setUser] = React.useState("");
  const [profilePic,setProfilePic] = React.useState("");
  console.log(user);
  React.useLayoutEffect(()=>{
    axios.get("http://localhost:3080/api/login").then((response) => {
        console.log(response)
        //console.log(response.data[0].Email)
        setUser(response.data[0].Personel_Adı)
        setProfilePic(response.data[0].Fotoğraf_URL)
    })
  },[])
  return (
    <ContextProvider.Provider
      value={{
        user,
        setUser,
        profilePic,
        setProfilePic
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;