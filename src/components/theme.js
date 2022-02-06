import React, { useState } from 'react';
import styled from 'styled-components';

import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const MAIN = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background: ${props => props.theme.themes[props.theme.currTheme].background};
    display: flex;
    align-items: center;
    flex-flow: column;
    transition: all 0.5s ease-in-out;
    color: ${props => props.theme.themes[props.theme.currTheme].foreground};
`;

const SWITCH = styled.div`
    position: relative;
    width: 60px;
    height: 30px;
    background: #000;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fbf571;
    cursor: pointer;
    margin: 30px;
`;

const BOUTON = styled.div`
    position: absolute;
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 100%;
    left: ${props => (props.theme.currTheme === 'dark' ? '50%' : '1px')};
    transition: left 0.3s ease-in;
`;

const CONTENT = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 600px;
    justify-content: center;
`;

function App() {
    const [theme, setTheme] = useState({
        currTheme: 'dark',
        themes: {
            light: {
                foreground: '#222',
                background: '#fff',
            },
            dark: {
                foreground: '#fff',
                background: '#222',
            },
        },
    });

    return (
        <MAIN theme={theme}>
            <SWITCH
                onClick={() =>
                    setTheme(prevState => ({
                        ...prevState,
                        currTheme: prevState.currTheme === 'dark' ? 'light' : 'dark',
                    }))
                }
            >
                <IoMdSunny />
                <IoMdMoon />
                <BOUTON theme={theme} />
            </SWITCH>
            <CONTENT>
                <p>
                    {' '}
                   
                </p>
            </CONTENT>
        </MAIN>
    );
}

export default App;
