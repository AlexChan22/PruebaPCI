import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, {useState} from "react";



const numCompartor = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => parseFloat(valueA) - parseFloat(valueB)
const letterComparator = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => {
  if (valueA == valueB) return 0;
  return (valueA > valueB) ? 1 : -1;
}


function formatDate(date: string) {

  const weekMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  var formatted : string = date;

  var dateParsed = new Date(date);

  var weekDay = weekMap[dateParsed.getDay()];

  var day = dateParsed.getUTCDate();
  var month = dateParsed.getMonth();
  var yearNumber = dateParsed.getUTCFullYear();


  formatted = weekDay;

  return `${weekDay} ${day}/${month}/${yearNumber}`;
}

var nicerData = data;

// for (let i = 0; i < data.length; i++) {
//   nicerData[i].discovery_date = formatDate(data[i].discovery_date)
// }



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


// const columnDefs: ColDef[] = [
//   { field: "designation", headerName: "Designation",
//   comparator: letterComparator,
//   sortable: true

// },
//   { field: "discovery_date", headerName: "Discovery Date", sortable: true, comparator: ISODateComparator, sortingOrder: ['asc', 'desc']},
//   { field: "h_mag", headerName: "H (mag)", comparator: numCompartor, sortable: true, sortingOrder: ['asc', 'desc'],  filter: 'agNumberColumnFilter',},
//   { field: "moid_au", headerName: "MOID (au)" },
//   { field: "q_au_1", headerName: "q (au)" },
//   { field: "q_au_2", headerName: "Q (au)" },
//   { field: "period_yr", headerName: "Period (yr)" },
//   { field: "i_deg", headerName: "Inclination (deg)" },
//   { field: "pha", headerName: "Potentially Hazardous", sortable: true, comparator: letterComparator},
//   { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, comparator: letterComparator, sortable: true, sortingOrder: ['asc', 'desc']},
// ];

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation"},
  { field: "discovery_date", headerName: "Discovery Date"},
  { field: "h_mag", headerName: "H (mag)"},
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous"},
  { field: "orbit_class", headerName: "Orbit Class"},
];

const NeoGrid = (): JSX.Element => {

  function monthToComparableNumber(date: string) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
    const yearNumber = Number.parseInt(date.substring(6, 10));
    const monthNumber = Number.parseInt(date.substring(3, 5));
    const dayNumber = Number.parseInt(date.substring(0, 2));
    return yearNumber * 10000 + monthNumber * 100 + dayNumber;
  }

  // const [columnDefs, setColumnDefs] = useState<ColDef[]>(
  //   [
  //     { field: "designation", headerName: "Designation",
  //     comparator: (valueA: any, valueB: any, nodeA:any, nodeB:any, isDescending:any) => {
  //       if (valueA == valueB) return 0;
  //       return (valueA > valueB) ? 1 : -1;
  //     } 
    
  //   },
  //     { field: "discovery_date", headerName: "Discovery Date", comparator: monthToComparableNumber},
  //     { field: "h_mag", headerName: "H (mag)" },
  //     { field: "moid_au", headerName: "MOID (au)" },
  //     { field: "q_au_1", headerName: "q (au)" },
  //     { field: "q_au_2", headerName: "Q (au)" },
  //     { field: "period_yr", headerName: "Period (yr)" },
  //     { field: "i_deg", headerName: "Inclination (deg)" },
  //     { field: "pha", headerName: "Potentially Hazardous" },
  //     { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
  //   ]
  // );


  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div>
        <h1>Near-Earth Object Overview</h1>
      </div>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
