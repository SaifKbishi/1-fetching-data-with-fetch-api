import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  } 

  componentDidMount(){
    this.performSearch();
  }

  performSearch = (query = '') => {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC&limit=12`, {mode: 'cors'})
    /*fetch(`https://api.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA&limit=1&anon_id=3a76e56901d740da9e59ffb22b988242`, {mode: 'cors'})*/
    .then(response => response.json())
    .then(responseData => {
      this.setState({ 
        gifs: responseData.data,
        loading: false
      });
    })
    .catch(error => {
      console.log('using fetch API');
      console.log('error fetching and parsing data');
    });
  }

  render() { 
   // console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.gifs.loading)
          ? <p>Loading...</p>
          : <GifList data={this.state.gifs}/>
        }
          
        </div>
      </div>
    );
  }
}
