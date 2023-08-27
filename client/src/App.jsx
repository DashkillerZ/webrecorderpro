import Home from "./pages/Home"
import { Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import { GlobalContext } from './context/GlobalContext';
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);
  
  const navigate = useNavigate();
  let user = undefined;
  useEffect(()=>{
    user = JSON.parse(localStorage.getItem('user'));
    setUserName(user?.user?.name)
    // if(user?.token ){
    //   setIsLoggedIn(true)
    //   navigate("/")
    //   console.log(user);
    // }
    // else{
    //   navigate('/login')
    // }
    
    
  },[])
  const handleLogout= ()=>{
      navigate('/login')
      localStorage.removeItem('user')
      
  }
  return (
    <div>
      <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn,navigate,userName,handleLogout}}>

        <Routes>

          {<Route path="/" element={<Home/>} />}
          <Route path="/login" element={<Login/>} />

        </Routes>
      </GlobalContext.Provider> 
        
    </div>
  )
}

export default App
