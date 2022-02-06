import React from 'react';
import styled from 'styled-components';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
const SWITCHER = styled.div`
    position: relative;
    width: 60px;
    height: 30px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`;

const BTN = styled.div`
    position: absolute;
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 100%;
    left: ${props => (props.theme.currTheme === 'dark' ? '50%' : '1px')};
    transition: left 0.3s ease-in;
`;

const HEADER = styled.div`
    background: ${props => props.theme.themes.header[props.theme.currTheme].background};
    transition: all 0.3s ease-in-out;
    color: ${props => props.theme.themes.header[props.theme.currTheme].foreground};
`;

export default function Header(props) {
    return (
        <HEADER theme={props.theme} className="w-full bg-gray-700 h-16 shadow-md">
            <div className="container mx-auto">
                <div className="flex h-16 justify-between">
                    <div className="logo h-full flex items-center text-xl uppercase ">Where is the World?</div>
                    <div className="theme-switcher w-24 h-full flex justify-center items-center">
                        <SWITCHER
                            className="bg-gray-800 text-yellow-500"
                            onClick={() =>
                                props.setTheme(prevState => ({
                                    ...prevState,
                                    currTheme: prevState.currTheme === 'dark' ? 'light' : 'dark',
                                }))
                            }
                        >
                            <IoMdSunny />
                            <IoMdMoon />
                            <BTN theme={props.theme} />
                        </SWITCHER>
                    </div>
                </div>
            </div>
        </HEADER>
    );
}
