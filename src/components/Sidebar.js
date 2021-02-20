import React from 'react'
import "./css/sidebar.css"


import logo from "./assets/logo.png"



import {MdDashboard} from "react-icons/md"
import {FaDatabase} from "react-icons/fa"
import {FiLogOut} from "react-icons/fi"
import { Avatar } from '@material-ui/core'
import axios from "axios"


import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useHistory
  } from "react-router-dom";

  

// Context Provider Api
import { ContextProvider } from "../Global/Context"

axios.defaults.withCredentials = true;
function Sidebar() {
    let location = useLocation();
    const history = useHistory();
    // Context  Api'den user state'i çek.
    const {user,setUser, profilePic} = React.useContext(ContextProvider)
    const [currentPage,setCurrentPage] = React.useState(0);
    React.useEffect(()=>{
        if(location.pathname == "/admin/dashboard"){
            setCurrentPage(0)
        }
        if(location.pathname == "/admin/personel"){
            setCurrentPage(1)
        }
    })

    const logout = () => {
        axios.post(`http://localhost:3080/api/logout`).then((res)=>{
            console.log("Çıkış Yapıldı")
            setUser(null)
            history.push("/login")
            
        })
    }

    return (
        <div className="sidebar">
            <div className="sidebar_avatar">
                <Avatar className="avatar" src={profilePic}/>
                <span style={{marginTop:"10px"}}><strong>Hoşgeldin </strong>{user}</span>
            </div>
            <div className="sidebar_header">
                {/* <img src={logo}/> */}
                <h4 style={{color:"#A7A9AC"}}>LOGO ALANI</h4>
            </div>

            <div className="sidebar_links">
                <ul>
                   {user == "Admin" ? (
                       <>
                       <li className={currentPage == 0 ? "li_aktif" : ""} onClick={(e)=> history.push("/admin/dashboard")}><MdDashboard/> <span>Dashboard</span></li>
                       <li  className={currentPage == 1 ? "li_aktif" : ""} onClick={(e)=> history.push("/admin/personel")}><FaDatabase/> <span>Personel İşlemleri</span></li>
                       </>
                   ):""}
                    <li onClick={logout}><FiLogOut/> <span>Çıkış</span></li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar
