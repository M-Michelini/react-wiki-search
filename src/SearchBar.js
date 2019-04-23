import React,{Component} from 'react';
import {fetchWikiInfo} from './_utils';

import './SearchBar.css';
import $ from 'jquery';

const ErrorMessage = ({message}) => (
  <div id='search-error'><i className="fas fa-exclamation-triangle"></i> {message}</div>
)
export default class SearchBar extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      error:null,
      disabled:false
    };
  }
  handleChange(e){
    this.setState({input:e.target.value,error:null});
  }

  handleSearch(e){
    let {input,disabled} = this.state;
    e.preventDefault();
    if(disabled) return;
    if(input==='') return this.setState({error:'Enter a search term first'})
    this.props.onBegin(input);
    this.setState({disabled:true})
    window.scrollTo(0,0);
    fetchWikiInfo(input)
    .then(this.props.onFound)
    .then(()=>{
      this.setState({disabled:false})
      window.scrollTo(0,0);
    })
    .catch((error)=>{this.setState({disabled:false,error:'No search results found for: '+input})})
  }

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }
  render(){
    return(
      <form id="search-bar" className="form-group m-0" onSubmit={this.handleSearch.bind(this)}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a Wikipedia article."
            aria-label="Search for a Wikipedia article."
            aria-describedby="input-button-group"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
          <div className="input-group-append" id="input-button-group">
            <button className="butn btn btn-outline-primary" type="submit" data-toggle="tooltip" data-placement="top" title="Search"><i className="fas fa-search"></i></button>
            <a href='https://en.wikipedia.org/wiki/Special:Random'>
              <button id='random' className="btn btn-outline-secondary" type="button" data-toggle="tooltip" data-placement="top" title="Random article">
                <i className="fas fa-random"/>
              </button>
            </a>
          </div>
        </div>
        {this.state.error ? <ErrorMessage message={this.state.error}/>:null}
      </form>
    )
  }
}
