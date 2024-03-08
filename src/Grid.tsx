// eslint-disable-next-line
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, {useEffect, useState} from "react";



const numCompartor = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => {
   return parseFloat(valueA) - parseFloat(valueB)
}

const letterComparator = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => {
  if (valueA === valueB) return 0;
  return (valueA > valueB) ? 1 : -1;
}


function formatDate(date: string) {

  const weekMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October' ,'November', 'December']

  var formatted : string = date;

  var dateParsed = new Date(date);

  var weekDay = weekMap[dateParsed.getDay()];
  

  var day = dateParsed.getUTCDate();
  var month = dateParsed.getMonth();
  var yearNumber = dateParsed.getUTCFullYear();

  var monthName = monthMap[month];
  formatted = weekDay;

  return `${weekDay} ${day} ${monthName} ${yearNumber}`;
}

var nicerData = data;

for (let i = 0; i < data.length; i++) {
    nicerData[i].discovery_date = formatDate(data[i].discovery_date);
    nicerData[i].pha = (data[i].pha === 'Y') ? 'Yes' : (data[i].pha === 'N') ? 'No': '' 
  
  }



function dateComparator(date1: string, date2: string) {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

function ISODateComparator(date1: string, date2: string) {
    const date1Parsed = new Date(date1);
    const date2Parsed = new Date(date2);


    return date1Parsed.getTime() - date2Parsed.getTime()
    
}


// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = Number.parseInt(date.substring(6, 10));
  const monthNumber = Number.parseInt(date.substring(3, 5));
  const dayNumber = Number.parseInt(date.substring(0, 2));
  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}


const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", comparator: letterComparator, sortable: true,   filter: 'agTextColumnFilter'},
  { field: "discovery_date", headerName: "Discovery Date", sortable: true, comparator: ISODateComparator, filter: 'agTextColumnFilter',},
  { field: "h_mag", headerName: "H (mag)", comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter',},
  { field: "moid_au", headerName: "MOID (au)", comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter', },
  { field: "q_au_1", headerName: "q (au)" , comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter',},
  { field: "q_au_2", headerName: "Q (au)", comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter',},
  { field: "period_yr", headerName: "Period (yr)", comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter',},
  { field: "i_deg", headerName: "Inclination (deg)", comparator: numCompartor, sortable: true,  filter: 'agNumberColumnFilter',},
  { field: "pha", headerName: "Potentially Hazardous", comparator: letterComparator, sortable: true,   filter: 'agTextColumnFilter',},
  { field: "orbit_class", headerName: "Orbit Class", comparator: letterComparator, sortable: true,   filter: 'agTextColumnFilter',},
];


const NeoGrid = (): JSX.Element => {

  // eslint-disable-next-line
  const [cleanData, setCleanData] = useState<any>(data)



  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div style={{display: "flex", flexDirection: 'column', marginBottom: 10}}>
        <div>
          <h1>Near-Earth Object Overview</h1>
        </div>
      </div>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
        
        gridOptions={{
          rowSelection: 'multiple',
          enableFillHandle: true,
          enableRangeSelection: true,
         
        }}
      />
    </div>
  );
};

export default NeoGrid;
