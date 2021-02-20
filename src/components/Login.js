import React from 'react'


import {FaUser,FaLock} from "react-icons/fa"

import axios from "axios"

import {ContextProvider} from "../Global/Context"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
  } from "react-router-dom";



function Login() {

    const [email,setEmail] = React.useState("");
    const [password,setPass] = React.useState("");
    const [ad,setAd] = React.useState("");
    const [soyad,setSoyAd] = React.useState("");


    const { user , setUser, setProfilePic } = React.useContext(ContextProvider);
    const history = useHistory()


    const onSubmit =  async (e) => {
        e.preventDefault();
       await axios.post(`http://localhost:3080/api/login?email=${email}&sifre=${password}`)
        .then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
            }
            else{
                if(response.data[0].Personel_Adı == "Admin"){
                    history.push("/admin/dashboard")
                }
                else{
                    history.push("/dashboard")
                }
                setUser(response.data[0].Personel_Adı);
                setAd(response.data[0].Personel_Adı);
                setSoyAd(response.data[0].Personel_SoyAdı);
                setProfilePic(response.data[0].Fotoğraf_URL);
                axios.post(`http://localhost:3080/api/personel/join?ad=${response.data[0].Personel_Adı}&soyad=${response.data[0].Personel_SoyAdı}&email=${email}`)
        .then((res) => {
            console.log("başarılı")
        })
                
                console.log(`Giriş Yapıldı Ad:${response.data[0].Personel_Adı} Soyad:${response.data[0].Personel_SoyAdı}`);

            }
        })
        
        
        
    }
    return (
        
        <div className="App_body_img_main">
        <div className="App_body_img">
        <div className="App_body_left">
        {/* <img src="http://localhost:3080/assets/img/logo.png" /> */}
        <h1 style={{color:"white"}}>LOGO ALANI</h1>

        </div>
        <div className="App_body_right">
        <form onSubmit={onSubmit}>
        <div className="App_body_right_login">
        <div className="text">
        <h1>Giriş Yap</h1>
        </div>
        <div className="inputarea">
            <FaUser/>
            <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="inputarea">
            <FaLock/>
            <input type="password" placeholder="Password" onChange={(e)=> setPass(e.target.value)}/>
        </div>
        <div className="checkarea">
        <input type="checkbox" id="bilgilerikaydet" name="bilgi" value="bilgi"/>
        <label >Kullanıcı adımı ve şifremi kaydet</label>
        </div>
        <button className="girisyap" type="submit" onClick={onSubmit}>Giriş Yap</button>
        <span className="text2">Yeni personel iseniz bilgi işlem ile iletişiem geçiniz.</span>
        
        </div>
        </form>
        </div>

        </div>
    </div>
    )
}

export default Login
