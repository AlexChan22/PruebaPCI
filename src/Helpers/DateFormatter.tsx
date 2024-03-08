//#region Date Formatting and Data maintenance
export default function formatDate(date: string) {

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
  
//#endregion