import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DetailsLoader from './detailsLoader';

export default class countryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: '',
            
        };
    }
    componentDidMount() {
        this.getCountriesDetails();
        console.log('test', this.props.match.params.name);
    }

    async getCountriesDetails() {
        const { name } = this.props.match.params;
        try {
            const response = await axios.get(`https://restcountries.com/v3/name/${name}?fullText=true`);
            console.log(response);
            this.setState(
                {
                    detail: response.data[0],
                   
                },
                () => {
                    console.log(this.state.detail);
                } 
               
            );
        } catch (error) {
            console.error(error);
        }
        
    }
    getName(variable) {
        for (var prop in window) {
          if (variable === window[prop]) {
            return prop;
          }
        }
      }

    render() {
        const { detail } = this.state;
        
        
        return (
            <div className="country-detail mt-20">
                <div className="container mx-auto">
                    <div className="w-full">
                        <Link
                            to="/"
                            className="bg-gray-700 hover:bg-gray-600 text-gray-500 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12H6M12 5l-7 7 7 7" />
                            </svg>
                            <span>Retour</span>
                        </Link>
                    </div>
                    {detail && detail !== '' ? (
                        <div className="w-full mt-20 flex justify-center">
                            <div className="w-2/5">
                                <img src={detail.flags[0]} alt={detail.name} className="rounded-lg shadow-lg" />
                            </div>
                            <div className="w-3/6 ml-20">
                                <h1 className="font-bold text-3xl ">{detail.name.common}</h1>
                                <table className="border-collapse w-full mt-10">
                                    <tbody>
                                        <tr className="py-4 px-6 bg-grey-lightest text-grey-dark border-b border-grey-light">
                                            <td>Nom officiel</td>
                                            <td>{detail.name.official}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Population</td>
                                            <td>{detail.population}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Region</td>
                                            <td>{detail.region}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Sous Region</td>
                                            <td>{detail.subregion}</td>
                                        </tr>
                                        <tr>
                                            <td>Capitale</td>
                                            <td>{detail.capital[0]}</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <DetailsLoader />
                    )}
                </div>
            </div>
        );
    }
}
