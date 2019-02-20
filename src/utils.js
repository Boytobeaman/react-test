import _ from 'lodash';
// var moment = require('moment');



// export function formatDateTime(val) {
//     //val==> Unix Timestamp(milliseconds) 
//     return moment(val).format("YYYY-MM-DD,HH:mm")
// }
// export function fromNowDateTime(val) {
//     //val==> Unix Timestamp(milliseconds) 
//     return moment(val).fromNow()
// }
// export function getQueryVariable(variable){
//     var query = window.location.search.substring(1);
//     var vars = query.split("&");
//     for (var i=0;i<vars.length;i++) {
//             var pair = vars[i].split("=");
//             if(pair[0] === variable){return pair[1];}
//     }
//     return(false);
// }
// export function getShortCompanyName(val) {
//     return val.split(" Co., Ltd")[0]
// }
// export function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,excludeColumn) {
//     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
//     var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  
//     var CSV = '';
//     //Set Report title in first row or line
  
//     // CSV += ReportTitle + '\r\n\n';
  
//     //This condition will generate the Label/Header
//     if (ShowLabel) {
//       var row = "";
      
//       //This loop will extract the label from 1st index of on array
//       for (var index in arrData[0]) {
//         if(!_.includes(excludeColumn, index)){
//             row += index + ',';
//         }
//         //Now convert each value to string and comma-seprated
//       }
  
//       row = row.slice(0, -1);
  
//       //append Label row with line break
//       CSV += row + '\r\n';
//     }
  
//     //1st loop is to extract each row
//     for (var i = 0; i < arrData.length; i++) {
//       var row = "";
  
//       //2nd loop will extract each column and convert it in string comma-seprated
//       for (var index in arrData[i]) {
//         if(!_.includes(excludeColumn, index)){
//             row += '"' + arrData[i][index] + '",';
//         } 
//       }
  
//       row.slice(0, row.length - 1);
  
//       //add a line break after each row
//       CSV += row + '\r\n';
//     }
  
//     if (CSV == '') {
//       alert("Invalid data");
//       return;
//     }
  
//     //Generate a file name
//     var fileName = "Report_";
//     //this will remove the blank-spaces from the title and replace it with an underscore
//     fileName += ReportTitle.replace(/ /g, "_");
  
//     //Initialize file format you want csv or xls
//     var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  
//     // Now the little tricky part.
//     // you can use either>> window.open(uri);
//     // but this will not work in some browsers
//     // or you will not get the correct file extension    
  
//     //this trick will generate a temp <a /> tag
//     var link = document.createElement("a");
//     link.href = uri;
  
//     //set the visibility hidden so it will not effect on your web-layout
//     link.style = "visibility:hidden";
//     link.download = fileName + ".csv";
  
//     //this part will append the anchor tag and remove it after automatic click
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}