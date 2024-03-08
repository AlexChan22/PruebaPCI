
//#region Comparators
const numCompartor = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => {
    return parseFloat(valueA) - parseFloat(valueB)
 }
 
 const letterComparator = (valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: any) => {
   if (valueA === valueB) return 0;
   return (valueA > valueB) ? 1 : -1;
 }
 
 
 function ISODateComparator(date1: string, date2: string) {
     const date1Parsed = new Date(date1);
     const date2Parsed = new Date(date2);
 
 
     return date1Parsed.getTime() - date2Parsed.getTime()
     
 }
 //#endregion

 export {
  numCompartor,
  letterComparator,
  ISODateComparator
 }