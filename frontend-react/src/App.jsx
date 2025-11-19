import './assets/css/style.css'
import { Routes,Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import Footer from './components/Footer'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'

function App() {
  

  return (
    <>
     <BrowserRouter>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
