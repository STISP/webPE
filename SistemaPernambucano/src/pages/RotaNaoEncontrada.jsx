import React from 'react';
import { Link } from 'react-router-dom';

const RotaNaoEncontrada = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Ops, parece que você se perdeu!</h1>
            <p style={styles.text}>A página que você tentou acessar não existe.</p>
            <Link to="/" style={styles.link}>Voltar para a página inicial</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1rem',
        marginBottom: '1.5rem',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '1rem',
        marginBottom: '2rem',
    },
};

export default RotaNaoEncontrada;
