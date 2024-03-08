// eslint-disable-next-line
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, {useEffect, useState} from "react";
import { numCompartor, ISODateComparator, letterComparator } from "./Helpers/Comparators";
import formatDate from "./Helpers/DateFormatter";




//#region Columns Definition
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
//#endregion


//#region Data maintenance

var nicerData = data;

for (let i = 0; i < data.length; i++) {
    nicerData[i].discovery_date = formatDate(data[i].discovery_date);
    nicerData[i].pha = (data[i].pha === 'Y') ? 'Yes' : (data[i].pha === 'N') ? 'No': '' 
  
  }

//#endregion


//#region Custom Types
type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
}
//#endregion



const NeoGrid = (): JSX.Element => {

  
  const apiRef = React.useRef<AgGridApi>({
    grid: undefined,
    column: undefined
  });

  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  const clearFilter = () => {
    apiRef.current.grid?.setFilterModel(null);
    apiRef.current.grid?.onFilterChanged();
    apiRef.current.grid?.onFilterChanged();
    apiRef.current.column?.resetColumnState()

  }


  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div style={{display: "flex", flexDirection: 'column', marginBottom: 10}}>
        <div>
          <h1>Near-Earth Object Overview</h1>
        </div>
        <div>
        <button onClick={clearFilter}>Clear Filters and Sorting</button>
        </div>
      </div>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
        enableRangeHandle={true}
        suppressMultiRangeSelection={true}
        onGridReady={onGridReady}
        gridOptions={{
          
        }}

       
      />
    </div>
  );
};

export default NeoGrid;
