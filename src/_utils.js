import $ from 'jquery'
const ENDPOINT =  'https://en.wikipedia.org/w/api.php?';

const params = [
  {name:'action',value:'query'},
  {name:'format',value:'json'},
  {name:'origin',value:'*'},
  {name:'prop',value:'pageimages|extracts'},
  {name:'pithumbsize',value:150},
  {name:'exintro',value:true},
  {name:'explaintext',value:true},
  {name:'generator',value:'search'},
  {name:'gsrlimit',value:15}
]

export const shortenExtract = extract => {
  let output='';
  let i = extract.length>400 ? 400 : extract.length-1;

  while(i>=0 && !output){
    if([' ',',','.'].includes(extract[i])) output=extract.substring(0,i)+'...';
    i--;
  }
  return output
}

const fetchWikiBatch = async url => {
  const results = await fetch(url)
    .then(res=>{
      if(res.ok){
        return res.json();
      }
    })
  if(results.hasOwnProperty('batchcomplete')){
    return results
  }
}

export const fetchWikiInfo = (gsrsearch,cont={}) =>
  fetchWikiBatch(ENDPOINT + $.param([
    ...params,
    ...Object.keys(cont).map(key=>({name:key,value:cont[key]})),
    {name:'gsrsearch',value:gsrsearch},
  ]))
