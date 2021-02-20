import React from 'react'

import axios from "axios"
import {Doughnut, Line, Pie,defaults} from "react-chartjs-2"

import "./css/veri.css"
import {FaUser} from "react-icons/fa"

import CountUp from 'react-countup';

defaults.global.legend.position = "bottom"
function Veri() {
    const [personel,setPersonel] = React.useState([])
    const [kayitsiz,setKayitsizlar] = React.useState([])
    const [yapilangirisler,setGirisSayisi] = React.useState([]);
    const fetchUserApi = async() => {
        await axios.get('http://localhost:3080/api/personel')
    .then(function (response) {
      // handle success
     // console.log(response);
      setPersonel(response.data)
    })
    await axios.get("http://www.localhost:3080/api/personel/join")
    .then((response) => {
        console.log(response);
        setGirisSayisi([response.data])
    })
    }
    React.useEffect(()=>{
      fetchUserApi();
    },[])
    const kayitlipersoneller = personel.filter(data => data.Kayitli_mi == 1)
    const kayitsizpersoneller = personel.map(data=> data.Kayitli_mi == 0);
    const girissayisi = yapilangirisler.map(data=> parseInt(data.giris_sayisi));
    return (
        
        <div className="dashboard">
       
        <div className="margin">
        <div className="grafik-personel grafikanim1">
            <div className="grafik-header">Personel Kontrol</div>
            <div className="grafik-info">
                            <span>Kayıtlı Personel Sayısı: {kayitlipersoneller.length}</span>
                            <span>Kayıtsız Personel Sayısı:{kayitsizpersoneller.length - kayitlipersoneller.length}</span>
                        </div>
            <div className="grafik">
            <Doughnut
            data={{
                labels:["Kayıtsız Personel","Kayıtlı Personel"],
                datasets: [{
                    label:"# of votes",
                    data:[kayitsizpersoneller.length - kayitlipersoneller.length,kayitlipersoneller.length],
                    backgroundColor: [
                        "rgba(167, 169, 172,1)",
                        "rgba(0, 82, 136, 1)"
                        
                    ]}]
                }}
                width={100}
                height={200}
                options={{ maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks:{
                                    beginAtZero: true
                                }
                            }
                        ]
                        }}}/>
                      
            </div>
            

            
        </div>
        <div className="grafik-personel grafikanim2">
            <div className="grafik-header ">Personel işlemlerine yapılan giriş sayısı</div>
            <div className="grafik grafiktextcenter ">
                <span className="sayi"><CountUp end={Number(girissayisi)} duration={3} /> <FaUser/></span>
            </div>
        </div>
        </div>

      </div>
    )
}

export default Veri
