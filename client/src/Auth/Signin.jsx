import axios from '../axios'
import md5 from 'md5'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
export default ({ setLogged, setUser }) => {
    const refUser = useRef()
    const refPass = useRef()
    const navigate = useNavigate()

    function validity() {
        const elemUser = refUser.current
        const elemPass = refPass.current
        
        let errors={}
        if(elemUser.value.length<6) {
            errors.user=true;
        }
        if(elemPass.value.length<8) {
            errors.passLength=true
        }
        
        return errors
    }

    async function signin(event) {
        const errors = validity()
        const elemUser = refUser.current
        const elemPass = refPass.current

        elemUser.style.border = "none"
        elemPass.style.border = "none"

        let preventDefault=false;
        if(errors.user === true) {
            preventDefault=true
            elemUser.style.border = "red solid 1px"
        }
        if(errors.pass === true) {
            preventDefault=true
            elemPass.style.border = "red solid 1px"
        }
        
        if(preventDefault) event.preventDefault()
        else {
            var password = elemPass.value + elemUser.value.substring(0,5)
            password = md5(password)
            const loginUser = {
                username : elemUser.value,
                password: password
            }
            await axios.post('/user/signin', loginUser).then((response) => {
                if(response.status === 201) {
                    setLogged(true)
                    setUser(response.data.name)
                    console.log(response.data.name)
                }
                else {
                    preventDefault=true
                    elemUser.style.border = "red solid 1px"
                    elemPass.style.border = "red solid 1px"
                }
                
            }).catch((err) => {
                console.log(err)
            })
        }
        if(preventDefault) event.preventDefault()
        else navigate('/')
    }
    return (
        <div className="auth">
            <div className="auth_content">
                <div className="auth_header">
                    SIGN IN TO APP
                </div>
                <div className="auth_content_main">
                    <input type="text" placeholder="Username" ref={refUser} />
                    <input type="password" placeholder="Password" ref = {refPass} />
                    <Link to = "#" className="auth_button" onClick={signin}>Sign in</Link>
                    <Link to = "/signup" className="auth_button">Not a user?</Link>
                </div>
            </div>
        </div>
    )
}