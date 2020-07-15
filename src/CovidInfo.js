import React, { useEffect, useState } from 'react';
import {excel_data} from "./data/excel_data.js";

function CovidInfo(props){
  
    const [dataList, setDataList] = useState([]);
   
    const modifyTable = () =>{
        
        props.modifyTableRows()
        
    }
    
  
    useEffect(()=>{
    //populate the table
        if(props.index!==""){
            const data =[];
            for(let i =1; i<props.tableRows; i++){
            
                data.push(<tr key={"tr"+i}>
                                <th key={"th"+i}>{excel_data[0][i]}</th>
                                <td key={"td"+i}>{excel_data[props.index][i]}</td>
                            </tr>)
                

             }
           setDataList(data) 
        }
        
        
    },[props.index, props.tableRows] )
  
 
    
    return(
      
         (props.index !== "") ? (
          <div>
              <table className="table">
              <tbody>
                {dataList}
              </tbody>
            </table>
         <button className="btn btn-info btn-block" onClick={modifyTable}>{props.buttonMessage}</button>
          </div>
          
  
         ): false
  
        
  
  
      
    )
  }
  export default CovidInfo;  