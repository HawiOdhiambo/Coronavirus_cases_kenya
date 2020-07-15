import React, {useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import {excel_data} from "./data/excel_data.js";
import CovidInfo from "./CovidInfo"; 

function App() {

  const [date]= useState([new Date()]);
  const [clickedDate, setClickedDate] = useState("");
  const [dataIndex, setDataIndex] =useState("");

  const dates_excel = excel_data.map((element, index) => {
    if(index!==0){
        return moment("1899/12/30", "YYYY/MM/DD").add(Number(element[0]), 'days').calendar()
    }
    else return undefined;
  });

  const [tableRows, setTableRows]=useState(6);
  const [buttonMessage, setButtonMessage] = useState("See More");
  const [buttonStatus, setButtonStatus]=useState(true);

  const defaultTableFormat = () => {
          setTableRows(6)
          setButtonMessage("See More")
          setButtonStatus(true);
  }

  const modifyTableRows = () =>{
    
    if(buttonStatus){
      const dataLength = excel_data[0].length;
      setTableRows(dataLength)
      setButtonMessage("See Less")
      setButtonStatus(!buttonStatus);
    }
    else{
      defaultTableFormat();
    }
    

  }

  const defaultDataFormat = (dataIndex, theClickedDate) =>{
    setClickedDate(theClickedDate);
    setDataIndex(dataIndex);
    defaultTableFormat();
  }

 

  return (
    <div>
        <nav className="navbar navbar-expand-lg mdc-elevation--z7 mb-3">

    </nav>
    <div className="container" >
      
      <div className="row">
        <div className="col-sm-12 mb-3"><DateCard clickedDate={clickedDate}/></div>
        <div className="col-md-5">
          <Calendar 
            className="mdc-elevation--z2"
            value={date}
            tileClassName={({ date, view }) => {
                           
              if(view==="month"){
       
                dates_excel.splice(0,1, "undefined"); //removes this added data point.
                if(dates_excel.find(dataDate => new Date(dataDate).toDateString()===date.toDateString())){
                                             
                    return  'highlight'
                }
              }
              else{
                dates_excel.splice(0,1,"03/01/2020"); //makes sure the month is highlighted in year view
               
                if(dates_excel.find(dataDate => new Date(dataDate).toDateString()===date.toDateString())){
                                
                    return  'highlight'
                }
               }
                
             }}
             onClickDay ={(value, a) =>{
              
               if(a.currentTarget.className.search("highlight")!== -1){
                
                 dates_excel.forEach((date, index) =>{
                    
                   if(new Date(date).toDateString()===value.toDateString()){
                    
                    
                    const theClickedDate = value.toDateString();
                    const dataIndex = index;
                    
                      defaultDataFormat(dataIndex, theClickedDate);
                   }
                 })
                 
               }
               else{
                   setClickedDate("");
               }
              }} 
          />
        </div>
        <div className="col-sm-7 mdc-elevation--z2 p-5">
            <CovidInfo index={dataIndex} tableRows={tableRows} modifyTableRows={modifyTableRows} buttonMessage={buttonMessage}/>
        </div>
      </div>
        
    </div>
    </div>
  
  );
}
function DateCard(props){
  const style = {
    //background: "#17ACBD",
    //color: "white",
    textAlign:"center"
  }
  return(
    <div>
      <h1 style={style}> {props.clickedDate!=="" ? moment(new Date(props.clickedDate), "YYYY/MM/DD").format('MMMM Do YYYY'): false}</h1>
    </div>
  )

}

export default App;
