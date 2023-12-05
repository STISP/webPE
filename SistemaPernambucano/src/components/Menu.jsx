import { Link } from 'react-router-dom'
import LogoCompleta from '../assets/LogoCompleta.svg'
import React, { useState } from 'react'

export default function Menu() {

    return (
        <nav>
            <Link to="/"><img src={LogoCompleta} alt="Logo Pernambucano" /></Link>
            {/* menu Desktop*/}
            <ul className='menuDesktop'>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/cadastro">cadastro</Link>
                </li>
            </ul>
        </nav>
    )
}
