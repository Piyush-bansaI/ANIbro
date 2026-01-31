import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { typeContext } from './TypeContext'
import { useNavigate } from 'react-router-dom'
import { messageContext } from './MessageContext'
export const SignUp = createContext()

const SignUpContext = ({children}) => {
  const [mode, setMode, imageFetcher, jiken, langType, setLangType, langChanger, backend_URL, setUserDataRefresh, userDataRefresh, loc, nav, isAdult, setIsAdult, showhentai] =  useContext(typeContext)
   const {createMsg} =  useContext(messageContext)
  // sign up variables
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('e')
    const [passwordStrength, setPasswordStrength] = useState("")
    const [usernameAvilable, setUsernameAvilable] = useState('')
    // is user logged in
    const [isLoggedIn, setIsLoggedIn] = useState(() => (
    JSON.parse(localStorage.getItem("userLogin")) || false
    ))

    useEffect(() => {
      const checkPassword = () => {
        const wordNumber = /[1-9a-z]/i.test(password);
        const word = /[a-z]/i.test(password);
        const number = /[1-9]/i.test(password);
        const symbols = /[!@#$%^&*]/i.test(password);


        if (password === "") {
            setPasswordStrength("")
        }
        else if (wordNumber && !symbols) {
            setPasswordStrength("it's weak")
        }
        else if ((wordNumber && symbols && password.length > 8)) {
            setPasswordStrength("hella strong 💪")
        }
        else if (symbols && !wordNumber) {
            setPasswordStrength("pretty strong")
        }
        else if ((wordNumber && symbols)) {
            setPasswordStrength("pretty strong")
        }
      }
      checkPassword();
    }, [password])
    

    useEffect(() => {
        setUsernameAvilable(''); 
        if (username.trim() === '') return
       
      const checkUser = setTimeout( async () => {
        try {
            const findUser = await backend_URL.get("/auth/check-username", { params: {username: username.trim()} })
            setUsernameAvilable(findUser.data.message);
        } catch (error) {
            setUsernameAvilable(error.response.data.message);
        }

      }, 700);
    
      return () => clearTimeout(checkUser)
    }, [username])
    

    const validation = () => {

        setUsername(username.trim())
        setEmail(email.trim())
        setPassword(password.trim())

        const timer = setTimeout(() => {
            setMessage("e")
        }, 5000);

        if (username === "" && email === "" && password === "") {
            setMessage("give me your details 1st Bro")
            timer
            return false
        }
        else if (username === "" || email === "" || password === "") {
            setMessage("Fill other field as well bro")
            timer
            return false
        }
        else if (username.length < 5){
            setMessage("bro, enter a valid username")
            timer
            return false
        }
        else if (!email.includes("@") || !email.includes(".") || email.length < 10){
            setMessage("bro, enter a valid email")
            timer
            return false
        }
        else if (passwordStrength === "pretty strong"){
            setMessage("bro, your password is pretty weak, make sure to add words and numbers too")
            timer
            return false
        }
        else if (passwordStrength === "it's weak"){
            setMessage("bro, your password is weak, make sure to add symbols too")
            timer
            return false
        }
        return true
    }

    const dataSender = async () => {
        try {
            const sendData = await backend_URL.post("/auth/signup", {
                username,
                email,
                password,
                isAdult
            })

            console.log(sendData.data.message)

            if (sendData.data.message === "User Registered"){
                nav("/verify/pending")
                createMsg(sendData.data.message, "success");
                setUserDataRefresh(prev => prev+1)
            } else {
                setMessage(sendData.data.message)

                setTimeout(() => {
                    setMessage('e')
                }, 5000);
            }
            
        } catch (error) {
            console.log("err: ", error)

            if (error.response) {
                setMessage(error?.response.data.message)
                createMsg(error?.response.data.message, "failed");
                setTimeout(() => {
                    setMessage('e')
                }, 5000);
            }
        }
    }

    const signUp = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            dataSender()
        }
    }

    const getToken = async (token) => {
        try {
            const giveToken = await backend_URL.post("/auth/token-check", {
                token: token
            })
            console.log(giveToken.data.message)
            if (giveToken.data.message === "Email Verified") {
                nav("/")
                setIsLoggedIn(true)
                createMsg(giveToken.data.message, "success");
                localStorage.setItem('userLogin', JSON.stringify(true))
            }
        } catch (error) {
            console.log("err: ", error)
        }
    }
  return (
    <SignUp.Provider value={{username, setUsername, email, setEmail, password, setPassword, signUp, message, passwordStrength, getToken, usernameAvilable, dataSender, isLoggedIn, setIsLoggedIn}}>
        {children}
    </SignUp.Provider>
  )
}

export default SignUpContext
