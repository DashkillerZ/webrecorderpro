import Home from "./pages/Home"
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { GlobalContext } from './context/GlobalContext';
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [verify, setVerify] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();


  const verifyToken = async () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    if (token) {
        const response = await fetch("/verify", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.status);
        if (response.ok) {
          navigate("/")

        } else {
          navigate('/login')

        }
      return setVerify(response.ok)
    }
  };

  useEffect(() => {
  }, [])

  useEffect(() => {
    verifyToken()
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user)

    }catch{
    }
      
    // if(user?.token ){
    //   navigate("/")
    // }
    // else{
    //   navigate('/login')
    // }


  }, [])
  const handleLogout = () => {
    localStorage.removeItem('user')

  }

  return (
    <div>
      <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, navigate, user, handleLogout, user, setUser }}>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </GlobalContext.Provider>

    </div>
  )
}

export default App
