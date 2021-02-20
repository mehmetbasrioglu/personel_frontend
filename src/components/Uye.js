import React from 'react'
// axios api
import axios from "axios";

import $ from "jquery"


//material ui
import {Avatar} from "@material-ui/core"

import {FaUserCheck,FaUserTimes,FaUserEdit,FaCheckCircle} from "react-icons/fa"

// Context Provider Api
import { ContextProvider } from "../Global/Context"

function Uye() {
    const [personel,setPersonel] = React.useState([])
    const {user,setUser, profilePic} = React.useContext(ContextProvider)
  React.useEffect(()=>{
    axios.get('http://localhost:3080/api/personel')
  .then(function (response) {
    // handle success
   // console.log(response);
    setPersonel(response.data)
  })
  })
    const ref = React.createRef();
    return (
      <div className="dashboard " ref={ref}>
        
     <div className="margin">
     <div className="grafikanim1">
        {personel.map(item=>(
          <>
          {item.Personel_Adı  == user  && item.Kayitli_mi == 1 ? (
             <h1 style={{color:"green"}}>Personel Onaylandı</h1>
          ):""}
          {item.Personel_Adı  == user  && item.Kayitli_mi == 0 ? (
             <h1 style={{color:"red"}}>Hesabınız onaylı değil bilgi işlem ile iletişime geçiniz.</h1>
          ):""}
          </>
        ))}
        </div>
     </div>
      </div>
    )
}

export default Uye
