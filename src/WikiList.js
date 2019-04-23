import React,{Component} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchWikiInfo,shortenExtract} from './_utils';
import './WikiList.css';

const WikiEntry = ({
  id,
  title,
  thumbnail,
  extract
}) => (
  <div className="floater p-3 mb-3">
    {thumbnail?<img src={thumbnail.source} className="floater-thumbnail mr-3" alt={title}/>:null}
      <h5 className="mt-0"><a href={`http://en.wikipedia.org/?curid=${id}`}>{title}</a></h5>
    {shortenExtract(extract)}
  </div>
);
//
// <div className="media-body">
//   {extract}
// </div>
export default class WikiList extends Component{
  constructor(){
    super();
    this.state={
      hasMore:true
    }
  }
  render(){
    const {results,search,onFound,cont} = this.props;
    const entries = results.map((info)=><WikiEntry key={info.id} {...info}/>)
    return(
      <InfiniteScroll
        hasMore={cont}
        dataLength={results.length}
        next={()=>{
          fetchWikiInfo(search,cont)
          .then(onFound)
        }}
      >
        {entries}
      </InfiniteScroll>
    )
  }
}
