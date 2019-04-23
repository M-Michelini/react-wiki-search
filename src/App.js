import React, { Component } from 'react';

import SearchBar from './SearchBar';
import WikiList from './WikiList';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      search:null,
      results:[],
      continue:{}
    };

    this.appendResults = this.appendResults.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  appendResults(response){
    console.log(response)
    const {pages} = response.query;
    this.setState({
      results:[
        ...this.state.results,
        ...Object.keys(pages)
          .filter((id,i,arr)=>this.state.results.findIndex(page=>page.id===pages[id].pageid)===-1)
          .sort((a,b)=>pages[a].index>pages[b].index?1:pages[a].index<pages[b].index?-1:0)
          .map(key=>({
            id:pages[key].pageid,
            title:pages[key].title,
            thumbnail:pages[key].thumbnail,
            extract:pages[key].extract
          }))],
      continue:response.continue
    })
  }
  setSearch(search){
    this.setState({search,results:[]})
  }

  render() {
    return (
      <div id="app">
        <div id="navbar">
          <h1 id="title">
            <span className='title-capital'>W</span>iki<span className="title-search">
            <span className='title-capital'>S</span>earch</span>
          </h1>
        </div>
        <div className={"container"}>
          <SearchBar onBegin={this.setSearch} onFound={this.appendResults} />
          {
            this.state.results.length?
            <WikiList
              onFound={this.appendResults}
              results={this.state.results}
              search={this.state.search}
              cont={this.state.continue}
            />:null
          }
        </div>
      </div>
    );
  }
}

export default App;
