import { Link } from 'react-router-dom'
import LogoCompleta from '../assets/LogoCompleta.svg'
import React, { useState } from 'react'

export default function Menu() {

    return (
        <nav className='menu'>
            <Link to="/"><img src={LogoCompleta} alt="Logo Pernambucano" /></Link>
            <ul className='menuDesktop'>
                <Link to="/">
                    Inicio
                </Link>
                <Link to="/Login">
                    Login
                </Link>
                <Link to="/cadastro">
                    cadastro
                </Link>
            </ul>
        </nav>
    )
}
