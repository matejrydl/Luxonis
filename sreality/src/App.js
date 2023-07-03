import './App.css';
import React, {useState, useEffect} from 'react';
import LoadingSpinner from './spinner';
import { ButtonGroup,Button,SvgIcon,Card } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {animateScroll as scroll } from "react-scroll";

function App() {
  const [flats, setflats] = useState([]);
  const [page, setpage] = useState(1);
  const [underHalf, setunderHalf] = useState(false);

  useEffect(() => {
    getflat();

    let count = 0;

    /*checks how high is the window*/
    const interval = setInterval(() => {
      count = count + 1;

      var body = document.body, html = document.documentElement;
      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    
      setunderHalf((window.scrollY > height/2-540));

      if (count >= 1000000) {
          // use clearInterval to stop interval execution
          clearInterval(interval);
      }


  }, 100);
  }, []);

  function getflat() {
    fetch('/api') //nginx redirect
      .then(response => {
        return response.text();
      })
      .then(data => {
        setflats(JSON.parse(data));
        console.log(JSON.parse(data)[0])
      });
  }

  var container = (flats.length > 0) ? <FlatsContainer flats={flats} page={page} setpage={setpage}/> : <LoadingSpinner/>

  //icon of scroll button
  var scrollDir = (underHalf) ? KeyboardArrowUpIcon : KeyboardArrowDownIcon

  function scrollPress(){
    if(underHalf) scroll.scrollToTop()
    else scroll.scrollToBottom()
  }

  return (
    <>
      <header><Card className='cardHeader'><h1 className='headerTxt'>Flats For Sale</h1></Card></header>
      {container}
      <button onClick={scrollPress} className='scrollbutton'><SvgIcon style={{marginTop: 8}} fontSize="large" component={scrollDir}></SvgIcon></button>
    </>
  );
}

function FlatsContainer(props){
  var flatsToShow = []
  const y = (props.flats.length > props.page*20) ? props.page*20 : props.flats.length
  for(var i = props.page*20-20; i < y;i++){
    flatsToShow.push(props.flats[i])
    console.log(flatsToShow.length)
  }

  //sets button values at the bottom of the page
  var devidedflats = Math.ceil(props.flats.length/20)
  var btn1 = (props.page > 1) ? props.page -1 : props.page;
  var btn2 = (props.page > 1) ? props.page : props.page+1;
  var btn3 = (props.page > 1) ? props.page +1 : props.page+2;
  if(btn1 === props.page -1) btn1 = (props.page < devidedflats) ? props.page -1 : props.page-2;
  if(btn2 === props.page)btn2 = (props.page < devidedflats) ? props.page : props.page-1;
  if(btn3 === props.page +1)btn3 = (props.page < devidedflats) ? props.page +1 : props.page;

  function movePage(amm){
    // eslint-disable-next-line default-case
    switch(amm) {
      case -2:
        if(props.page > 1) props.setpage(props.page-1)
        break;
      case -1:
        props.setpage(btn1)
        break;
      case 0:
        props.setpage(btn2)
        break;
      case 1:
        props.setpage(btn3)
        break;
      case 2:
        if(props.page < devidedflats) props.setpage(props.page+1)
        break;
    }
  }
  
  const pairs = [];
  for (let i = 1; i < flatsToShow.length; i+=2) {
    pairs.push(<FlatRow flats={[flatsToShow[i-1],flatsToShow[i]]}></FlatRow>)
  }

  return(
    <div className='container'>
      {
        pairs
      }
      <div className='divider'>
        <ButtonGroup>
          <Button onClick={()=>movePage(-2)}><SvgIcon component={ChevronLeftIcon}></SvgIcon></Button>
          <Button className={(props.page === btn1) ? "selected" : ""} onClick={()=>movePage(-1)}>{btn1}</Button>
          <Button className={(props.page === btn2) ? "selected" : ""} onClick={()=>movePage(0)}>{btn2}</Button>
          <Button className={(props.page === btn3) ? "selected" : ""} onClick={()=>movePage(1)}>{btn3}</Button>
          <Button onClick={()=>movePage(2)}><SvgIcon component={ChevronRightIcon}></SvgIcon></Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

function FlatRow(props){
  return(
    <div className='flatsRow'>
      <Flat key={props.flats[0]["id"]} flat={props.flats[0]}></Flat>
      <Flat key={props.flats[1]["id"]} flat={props.flats[1]}></Flat>
    </div>
  );
}

function Flat(props){
  return(
    <a href={props.flat["link"]}>
    <Card className='flatContainer'>
        <img src={props.flat["image"]}></img>
        <h2>{props.flat["title"]}</h2>
    </Card>
    </a>
  );
}

export default App;
