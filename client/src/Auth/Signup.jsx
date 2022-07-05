import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import md5 from 'md5'
import { useRef } from 'react'
import axios from '../axios'
export default ({ setLogged, setUser}) => {
    const refPass=useRef()
    const refUser=useRef()    
    const refConfPass=useRef()
    const refName=useRef()
    
    const navigate = useNavigate()

    function validity() {
        const elemUser = refUser.current
        const elemPass = refPass.current
        const elemConfPass = refConfPass.current
        const elemName = refName.current
        let errors={}
        if(elemUser.value.length<6) {
            errors.user=true;
        }
        if(elemPass.value.length<8) {
            errors.passLength=true
        }
        if(elemPass.value!=elemConfPass.value) {
            errors.passConf=true
        }
        if(elemName.value.length===0) {
            errors.name=true
        }
        return errors
    }

    async function signup(event) {
        const errors = validity()
        const elemUser = refUser.current
        const elemPass = refPass.current
        const elemConfPass = refConfPass.current
        const elemName = refName.current
        elemUser.style.border = "none"
        elemPass.style.border = "none"
        elemConfPass.style.border = "none"
        elemName.style.border = "none"
        let preventDefault=false;
        if(errors.user === true) {
            preventDefault=true
            elemUser.style.border = "red solid 1px"
        }
        if(errors.pass === true) {
            preventDefault=true
            elemPass.style.border = "red solid 1px"
        }
        if(errors.passConf === true) {
            preventDefault=true
            elemConfPass.style.border = "red solid 1px"
        }
        if(errors.name === true) {
            preventDefault=true
            elemName.style.border = "red solid 1px"
        }
        if(preventDefault) event.preventDefault()
        else {
            var password = elemPass.value + elemUser.value.substring(0,5)
            password = md5(password)
            const newUser = {
                username : elemUser.value,
                name: elemName.value,
                password: password
            }
            await axios.post('/user/new', newUser).then((response) => {
                if(response.status === 201) {
                    setLogged(true)
                    setUser(elemName.value)
                }
                else {
                    preventDefault=true
                    elemUser.style.border = "red solid 1px"
                }
                
            }).catch((err) => {
                console.log(err)
            })
        }
        // console.log(preventDefault)
        if(preventDefault) event.preventDefault()
        else navigate('/')
        // this wont work since event has already happened while api call was made
    }

    return (
        <div className="auth">
            <div className="auth_content">
                <div className="auth_header">
                    SIGN UP ON APP
                </div>
                <div className="auth_content_main">
                    <input ref={refUser} type="text" placeholder="Username"/>
                    <input ref={refName} type="text" placeholder="Name"/>
                    <input ref={refPass} type="password" placeholder="Password" />
                    <input ref={refConfPass} type="password" placeholder="Confirm Password"/>
                    <Link to = "#" className="auth_button" onClick={(event) => signup(event)}>Sign up</Link>
                    <Link to = "/signin" className="auth_button">Already a user?</Link>
                </div>
            </div>
        </div>
    )
}