import { styled } from "styled-components";
import {GlobalContext} from "../context/GlobalContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const {isLoggedIn, setIsLoggedIn,navigate,setUser} = useContext(GlobalContext);
    const [email,setEmail] =useState("")
    const [name,setName] =useState("")
    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const response = await fetch("http://localhost:80/login",{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({email,name})
        })
        const json = await response.json();
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            setUser(json)
            navigate('/')
        }
    }
    return (
        <StyledLogin>
            <form action="" onSubmit={handleSubmit}>
                <div className="title">JWT Login</div>
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" name="email" id="" placeholder="Enter Your Email" />
                <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" name="name" id="name" placeholder="Enter Your Name" />
                <div className="button-flex">
                    <button>Login</button>
                    <Link to={"/"}>continue without login</Link>
                </div>
            </form>
        </StyledLogin>
    );
}
 
const StyledLogin = styled.div`

    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    .title{
        font-size: 1.6rem;
        font-weight: bold;
        color: #3c3c3c;
    }
    form {

    }
    form input{
        display: block;
        margin: 16px 0px;
        padding: 0 0 0 10px;
        font-size: 1.1rem;
        height: 40px;
        width: 400px;
        border: none;
        border-bottom: 1px solid #dddddd;
        transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

        
    }
    @media screen and (max-width:460px){
        form input{
            width: 250px;
        }
        
    }
    form input:focus{
        outline: none;
        border-bottom: 1px solid #818181;
        /* box-shadow: 0 0 10px inset #e4e4e4; */
    }
    form .button-flex >a {
        color: #818181;
    }
    form .button-flex >a:hover {
        color: #3c3c3c;
    }
    form .button-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    form button{
        background: #2079ff;
        color: white;
        font-size: 1.1rem;
        border-radius:5px;
        border: none;
        padding: 8px 20px;
    }
    input[type=email]{
        
    }
    input[type=text]{


    }
`
export default Login;