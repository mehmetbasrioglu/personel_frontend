import React from 'react'


import Staff from '../components/Staff';
import Sidebar from '../components/Sidebar';
import Veri from '../components/Veri';

// Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";


  import Context from "../Global/Context"
// Context Provider Api


import Login from './Login';
import Personel from "./Personel"



import {ContextProvider} from "../Global/Context"
import Uye from './Uye';


function RouterPages() {
    
    // Context  Api'den user state'i çek.

    return (
        
        <Context>
            <Router>
       <Switch>
       
       <Route path="/admin/personel" exact>
       <div className="App ">
            <div className="App_body">
              {/**<Staff/> */}
              <Sidebar/>
              <Personel/>
            </div>
 
     </div>
       </Route>
       <Route path="/dashboard" exact>
        
        <div className="App ">
        <div className="App_body">
          {/**<Staff/> */}
          <Sidebar/>
          <Uye/>
          
          
        </div>

 </div>
    
    </Route>
        <Route path="/admin/dashboard" exact>
        
            <div className="App ">
            <div className="App_body">
              {/**<Staff/> */}
              <Sidebar/>
              
                 <Veri/>
              
            </div>
 
     </div>
        
        </Route>
        <Route path="/login" exact>
            <Login/>
        </Route>
        <Route >
        <Redirect to="/login"/>
        </Route>
       </Switch>
        </Router>
        </Context>
        

    )
}

export default RouterPages
