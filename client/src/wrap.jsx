import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App"
import Signin from "./Auth/Signin"
import Signup from "./Auth/Signup"

export default () => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState("")
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<App logged={logged} user={user} />} />
                <Route path = '/signin' element = {<Signin setLogged = {setLogged} setUser={setUser} />}/>
                <Route path = '/signup' element = {<Signup setLogged = {setLogged} setUser={setUser}/>}/>
            </Routes>
        </Router>
    )
}