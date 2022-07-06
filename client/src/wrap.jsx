import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App"
import Signin from "./Auth/Signin"
import Signup from "./Auth/Signup"

export default () => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<App logged={logged} thisUser={user} thisName={name} />} />
                <Route path = '/signin' element = {<Signin setLogged = {setLogged} setUser={setUser} setName={setName} />}/>
                <Route path = '/signup' element = {<Signup setLogged = {setLogged} setUser={setUser} setName={setName}/>}/>
            </Routes>
        </Router>
    )
}