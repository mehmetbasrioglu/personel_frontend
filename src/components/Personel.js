import React from 'react'
// axios api
import axios from "axios";

import $ from "jquery"


//material ui
import {Avatar} from "@material-ui/core"

import {FaUserCheck,FaUserTimes,FaUserEdit,FaCheckCircle} from "react-icons/fa"
import {BsPersonPlusFill,BsPersonDashFill} from "react-icons/bs"

function Staff() {
    const [personel,setPersonel] = React.useState([])
    const [secilipersonel,setSeciliPersonel] = React.useState("");
    const [secilenstate,setSecilenState] = React.useState(0);
    const [secilenAd,setSecilenAd] = React.useState("");
    const [secilenSoyAd,setSecilenSoyAd] = React.useState("");
    const [secilenEmail,setSecilenEmail] = React.useState("");
    const [secilenSifre,setSecilenSifre] = React.useState("");
    const [secilenKonum,setSecilenKonum] = React.useState("");
  React.useEffect(()=>{
    axios.get('http://localhost:3080/api/personel')
  .then(function (response) {
    // handle success
   // console.log(response);
    setPersonel(response.data)
  })
  })
  const onayla = (ad,soyad,email) => {
    axios.patch(`http://localhost:3080/api/personel?ad=${ad}&soyad=${soyad}&email=${email}&onay=true`).then((response)=>{
      // alert(response);
    })
  }
  const deneme = (id,ad,soyad,email,sifre,konum,kayitli) =>{
    if(secilenstate == 0 && ad != "Admin"){
     if(kayitli == 1){
       console.log(id)
       setEkleState(false)
      setSeciliPersonel(id)
      setSecilenAd(ad)
      setSecilenSoyAd(soyad)
      setSecilenEmail(email)
      setSecilenSifre(sifre)
      setSecilenKonum(konum)
      setSecilenState(1)
      console.log(id)
      ref.current.scroll({top:0,behavior:"smooth"})
      
     }
    }
    else {
      // Personel Ekle State her zaman false yap garantiye al
      setEkleState(false) 
      setSeciliPersonel("")
      setSeciliPersonel("")
      setSecilenAd("")
      setSecilenSoyAd("")
      setSecilenEmail("")
      setSecilenSifre("")
      setSecilenKonum("")
      setSecilenState(0)
    }
  }
  const iptalet = () => {
    setEkleState(false)
    setSeciliPersonel("")
    setSeciliPersonel("")
    setSecilenAd("")
    setSecilenSoyAd("")
    setSecilenEmail("")
    setSecilenSifre("")
    setSecilenKonum("")
    setSecilenState(0)
  }

  const kaydet = (ad,soyad,email,sifre,konum) => {
    axios.put(`http://localhost:3080/api/personel?ad=${ad}&soyad=${soyad}&email=${email}&sifre=${sifre}&konum=${konum}&id=${secilipersonel}`).then((response)=>{
      // alert(response.data.message);
    }).catch((error)=>{
      alert(error)
    })
  }
  
  const yeni = (ad,soyad,email,sifre,konum) => {
    axios.post(`http://localhost:3080/api/personel?ad=${ad}&soyad=${soyad}&email=${email}&sifre=${sifre}&konum=${konum}`)
    .then((response)=>{
      // alert("Başarılı")
    }).catch((error)=>{
      alert(error)
    })
  }

  const PersonelSil = async() => {
    await axios.post(`http://localhost:3080/api/personel/sil?id=${secilipersonel}`).then((response)=>{
      // alert("Silindi")
      setSeciliPersonel("")
      setSecilenState(0)
    })
  }

    const ref = React.createRef();

    const [ekle,setEkleState] = React.useState(false);
    return (
      <div className="dashboard " ref={ref}>
        
     <div className="margin">
     <div className="grafikanim1">
       {/* Table'dan personel secildiyse göster */}
        {secilipersonel ? (
          
         <div className="update_area">
           <div className="grafik-header update_area_flex1">Personel Düzenle</div>
         <div className="update_area_body">
         <div className="update_area_col1">
         <div className="inputupdate">
          <span>Personel Adı : </span>
         <input type="text" placeholder="Personel Adı" value={secilenAd} onChange={(e) => setSecilenAd(e.target.value)}/>
         </div>
         <div className="inputupdate">
          <span>Personel SoyAdı : </span>
          <input type="text" placeholder="Personel soyAdı" value={secilenSoyAd} onChange={(e) => setSecilenSoyAd(e.target.value)} />
         </div>
         <div className="inputupdate">
          <span>Personel Email : </span>
          <input type="text" placeholder="Personel Email" value={secilenEmail} onChange={(e) => setSecilenEmail(e.target.value)}/>
         </div>
         <div className="inputupdate">
          <span>Personel Şifre : </span>
          <input type="text" placeholder="Personel Şifre" value={secilenSifre} onChange={(e) => setSecilenSifre(e.target.value)}/>
         </div>
         <div className="inputupdate">
          <span>Personel Konumu : </span>
          <input type="text" placeholder="Personel Konum" value={secilenKonum} onChange={(e) => setSecilenKonum(e.target.value)}/>
         </div>
         
         </div>
         <div className="update_area_col1">
       
         <button type="submit" onClick={(e) => kaydet(secilenAd,secilenSoyAd,secilenEmail,secilenSifre,secilenKonum)}> Kaydet </button>
        
         <button type="submit" onClick={iptalet}> Iptal Et </button>
        
        
         
         </div>
           </div>
         </div>
        ):""}
        {/* Secili Personel yok ve Personel(Ekle) State(Durum) var ise göster */}
         {!secilipersonel  && ekle ? (
          
          <div className="update_area">
            <div className="grafik-header update_area_flex1">Yeni Personel Ekle</div>
          <div className="update_area_body">
          <div className="update_area_col1">
          <div className="inputupdate">
           <span>Personel Adı : </span>
          <input type="text" placeholder="Personel Adı" value={secilenAd} onChange={(e) => setSecilenAd(e.target.value)}/>
          </div>
          <div className="inputupdate">
           <span>Personel SoyAdı : </span>
           <input type="text" placeholder="Personel soyAdı" value={secilenSoyAd} onChange={(e) => setSecilenSoyAd(e.target.value)} />
          </div>
          <div className="inputupdate">
           <span>Personel Email : </span>
           <input type="text" placeholder="Personel Email" value={secilenEmail} onChange={(e) => setSecilenEmail(e.target.value)}/>
          </div>
          <div className="inputupdate">
           <span>Personel Şifre : </span>
           <input type="text" placeholder="Personel Şifre" value={secilenSifre} onChange={(e) => setSecilenSifre(e.target.value)}/>
          </div>
          <div className="inputupdate">
           <span>Personel Konumu : </span>
           <input type="text" placeholder="Personel Konum" value={secilenKonum} onChange={(e) => setSecilenKonum(e.target.value)}/>
          </div>
          
          </div>
          <div className="update_area_col1">
        
          <button type="submit" onClick={(e) => yeni(secilenAd,secilenSoyAd,secilenEmail,secilenSifre,secilenKonum)}> Kaydet </button>
         
          <button type="submit" onClick={iptalet}> Iptal Et </button>
         
         
          
          </div>
            </div>
          </div>
         ):""}
      
        <div id="customers">
            <div className="grafik-header">Personel Listesi</div>
            {!secilipersonel ? <BsPersonPlusFill className="svg" onClick={(e)=>setEkleState(true)}/> : ""}
            {secilipersonel ? <BsPersonDashFill className="svg" onClick={PersonelSil}/> : ""}
           
            <table id="customers">
               <tr>
               <th>Personel Adı SoyAdı</th>
               <th>Email</th>
               <th>Şifre</th>
               <th>Konum</th>
               </tr>
           {personel.map(item=>(
          <>
          <tr className="personelhover" onClick={(e)=>deneme(item.id,item.Personel_Adı,item.Personel_SoyAdı,item.Email,item.Şifre,item.Çalıştığı_Konum,item.Kayitli_mi)}>
            
            <td><div className="personel" >
              {secilipersonel == item.id ? <FaCheckCircle className="secilen"/> : ""}
          <Avatar  src={item.Fotoğraf_URL}/>
          <span className="max">{item.Personel_Adı} {item.Personel_SoyAdı}</span>
          </div></td>
          <td>
            {item.Email}
          </td>
          <td>
            {item.Şifre}
          </td>
          <td>
            {item.Çalıştığı_Konum}
          </td>
          <td>
            {!item.Kayitli_mi ? <button type="submit" className="onayla" onClick={(e)=>onayla(item.Personel_Adı,item.Personel_SoyAdı,item.Email)}><FaUserCheck/></button> : <span>Onaylandı</span>}
          </td>
          
          </tr>
          </>
        ))}
        </table>
        </div>
        </div>
     </div>
      </div>
    )
}

export default Staff
