import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import styled from 'styled-components';

import Header from './components/header';
import Main from './components/main';

import InfoPays from './components/InfoPays';

const ListePays = styled.div`
    background: ${props => props.theme.themes[props.theme.currTheme].background};
    transition: all 0.3s ease-in-out;
    color: ${props => props.theme.themes[props.theme.currTheme].foreground};
`;
function App() {
    const [theme, setTheme] = useState({
        currTheme: 'dark',
        themes: {
            header: {
                light: {
                    foreground: '#2D3748',
                    background: '#F7FAFC',
                },
                dark: {
                    foreground: '#fff',
                    background: '#4A5568',
                },
            },
            light: {
                foreground: '#2D3748',
                background: '#fff',
            },
            dark: {
                foreground: '#fff',
                background: '#2D3748',
            },
        },
    });

    return (
        <ListePays theme={theme} id="restapi-countries" className="antialiased font-sans bg-gray-800 min-h-screen">
            <Header setTheme={setTheme} theme={theme} />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Main theme={theme} />
                    </Route>
                    <Route path="/country/:name" component={InfoPays} />
                </Switch>
            </Router>
            {/* <Switcher /> */}
        </ListePays>
    );
}

export default App;
