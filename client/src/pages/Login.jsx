import { styled } from "styled-components";
import {GlobalContext} from "../context/GlobalContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const {isLoggedIn, setIsLoggedIn,navigate,setUser} = useContext(GlobalContext);
    const [isLoading,setIsLoading] =useState(false)
    const [signingUp,setSigningUp] =useState(false)
    const [details,setDetails] =useState({email:"",name:"",emailMessage:"",nameMessage:""})

    

    const handleSubmit = async (e)=>{

        e.preventDefault()

        if(details.email.length<6){
            setDetails(prev=>({...prev,emailMessage:"Email Can't Be this Short"}))
            if(details.email.length==0){
                setDetails(prev=>({...prev,emailMessage:"Please Enter Email"}))
            }
        }
        else{
            setDetails(prev=>({...prev,emailMessage:""}))
        }
        if(details.name.length<6){
            setDetails(prev=>({...prev,nameMessage:"Name Can't Be this Short"}))
            if(details.name.length==0){
                setDetails(prev=>({...prev,nameMessage:"Please Enter Name"}))
            }
            return
        }
        else{
            setDetails(prev=>({...prev,nameMessage:""}))
        }

        let email = details.email
        let name = details.name
        let response = await fetch("http://localhost:80/login",{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({email,name})
        })
        let json;
        if(response.status==401){
            setSigningUp(true)
            const response = await fetch("http://localhost:80/signup",{
                method:"POST",
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({email,name})
            })
            json = await response.json();
            if(response.ok){
                localStorage.setItem('user',JSON.stringify(json))
                setUser(json)
                navigate('/')
            }
        }
        json = await response.json();
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
                <input onChange={(e)=>{setDetails(prev=>({...prev,email:e.target.value}))}} value={details.email} type="email" name="email" id="" placeholder="Enter Your Email" />
                <div className="email-message message">&nbsp;{details.emailMessage}</div>
                <input onChange={(e)=>{setDetails(prev=>({...prev,name:e.target.value}))}} value={details.name} type="text" name="name" id="name" placeholder="Enter Your Name" />
                <div className="name-message message">&nbsp;{details.nameMessage}</div>
                <div className="button-flex">
                    <button >Login</button>
                    <Link to={"/"}>continue without login</Link>
                </div>
            </form>
            <div className="signup-dialogue" style={signingUp?{opacity:"1"}:{opacity:"0"}}>
               <span>Oh!,let's Sign you up</span>
            </div>
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
        color: var(--theme-color-2);
    }
    form {

    }
    .message{
        margin: 0 0 0 12px;
        font-size: 0.8rem;
        transform: translateY(-10px);
        color: orangered;
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
        border-bottom: 1px solid var(--theme-color-3);
        /* box-shadow: 0 0 10px inset #e4e4e4; */
    }
    form .button-flex >a {
        color: var(--theme-color-2);
        opacity: 0.8;
    }
    form .button-flex >a:hover {
        opacity: 1;
    }
    form .button-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    form button{
        background: var(--theme-color-3);
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
    .signup-dialogue span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: var(--theme-color-3);
        padding:16px 32px;
        color: var(--theme-color-4);
        box-shadow: 0 0 50px #b7b7b7;
        border-radius: 5px;

    }
    .signup-dialogue{
        position: absolute;
        opacity: 0;
        transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        user-select: none;
        pointer-events: none;
        inset: 0;
        background: #b7b7b777;
        justify-content: center;
        align-items: center;
    }
`
export default Login;