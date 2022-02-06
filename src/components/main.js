import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MdPeople, MdLocationCity, MdLocationOn } from 'react-icons/md';
import CountryLoader from './loader';

const COUNTRIES = styled.div`
    transition: 0.3s transform;
    will-change: transform;
    &:hover {
        transform: translateY(-10px);
    }
`;

const COUNTRIESTEXT = styled.div`
    background: ${props => props.theme.themes.header[props.theme.currTheme].background};
    transition: all 0.3s ease-in-out;
    color: ${props => props.theme.themes.header[props.theme.currTheme].foreground};
`;

export default class main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countriesList: [],
            isLoading: false,
            searchQuery: '',
            filterRegion: '',
        };
    }

    componentDidMount() {
        this.getCountriesData();
    }

    async getCountriesData() {
        try {
            const response = await axios.get('https://restcountries.com/v2/all');
            console.log(response);
            this.setState({
                countriesList: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    }
    

    async resultatRecherche(value) {
        this.setState({ searchQuery: value });
        if (value === '') this.getCountriesData();

        if (value.length < 3) return;

        try {
            const response = await axios.get(`https://restcountries.com/v2/name/${value}`);
            console.log(response);
            this.setState({
                countriesList: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    

    async filtreRegion(region) {
        this.setState({ filterRegion: region });

        if (region === '') this.getCountriesData();

        try {
            const response = await axios.get(`https://restcountries.com/v2/region/${region}`);
            console.log(response);
            this.setState({
                countriesList: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { isLoading, countriesList, searchQuery } = this.state;

        return (
            <main className="mt-20">
                <div className="container mx-auto">
                    <div className="countries-header flex justify-between px-6 my-5">
                        <div className="w-1/3 h-full">
                            <div className="relative text-gray-600">
                                <input
                                    type="rechercher"
                                    name="rechercher"
                                    placeholder="Rechercher"
                                    value={searchQuery}
                                    onChange={e => {
                                        this.resultatRecherche(e.target.value);
                                    }}
                                    className="bg-gray-700 text-white placeholder-gray-100  h-12 px-5 pl-10 rounded w-full text-lg focus:outline-none focus:shadow-md focus:border-gray-600 "
                                />
                                <button type="submit" className="pointer-events-none absolute left-0 top-0 mt-4 ml-4">
                                    <svg
                                        className="h-4 w-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        version="1.1"
                                        id="Capa_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 56.966 56.966"
                                        style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                        xmlSpace="preserve"
                                        width="512px"
                                        height="512px"
                                    >
                                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="inline-block relative w-64">
                            <select
                                onChange={e => {
                                    this.filtreRegion(e.target.value);
                                }}
                                className="block appearance-none w-full bg-gray-700 text-white border border-gray-900 hover:border-gray-500 px-4 py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled selected hidden>Filtrer par region</option>
                                <option value="">Tout</option>
                                <option value="Africa">Afrique</option>
                                <option value="Americas">Amerique</option>
                                <option value="Asia">Asie</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceanie</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {!isLoading && countriesList && countriesList.length !== 0 ? (
                        <div className="countries-container flex flex-1 flex-wrap">
                            {countriesList.map((countries, index) => {
                                return (
                                    <COUNTRIES key={index} className="countries w-full md:w-1/2 xl:w-1/4 p-5">
                                        <Link
                                            to={{
                                                pathname: `/country/${countries.name}`,
                                                state: { countries: countries },
                                            }}
                                        >
                                            <COUNTRIESTEXT
                                                theme={this.props.theme}
                                                className="bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl "
                                            >
                                                <img
                                                    src={countries.flag}
                                                    className="w-full object-cover h-40 rounded-t-lg"
                                                    alt={countries.name}
                                                />
                                                <div className="countries-content p-3 ">
                                                    <h2 className="text-2xl mb-2">{countries.name}</h2>
                                                    <p className="flex items-center">
                                                        <MdPeople className="mr-2" title="Population" />
                                                        {countries.population}
                                                    </p>
                                                    <p className="flex items-center">
                                                        <MdLocationOn className="mr-2" title="Region" />
                                                        {countries.region}
                                                    </p>
                                                    <p className="flex items-center">
                                                        <MdLocationCity className="mr-2" title="Capital" />
                                                        {countries.capital}
                                                    </p>
                                                </div>
                                            </COUNTRIESTEXT>
                                        </Link>
                                    </COUNTRIES>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="block">
                            <CountryLoader />
                        </div>
                    )}
                </div>
            </main>
        );
    }
}
