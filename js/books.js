//book.js
var cList = new Array();
var rowID;
var bList = new Array();

//doc ready
$(document).ready(function() {
  //console.log(localStorage);
  
  //get local storage value
  cList = JSON.parse(localStorage.getItem("cList"));
  bList = JSON.parse(localStorage.getItem("bList"));
  rowID = localStorage.getItem("rowID");
  
  $("#categoryHeader").html(`<h3>Books from the ${cList[rowID].categoryGroup} category </h3>`);
  $("#categoryHeader").css('text-align', 'center');
  
  //fill in output field
  for(let b of bList){
  
    if(b.category === cList[rowID].categoryGroup){
      
    $("#bookList").append(
      `
      <ul>
      <li> ${b.title} </li>
      <li> Authors : ${b.authors} </li>
      <li> Book ID: ${b.bookID} </li>
      <li> ISBN : ${b.isbn} </li>
      <li> Pages : ${b.pageCount} pages </li>
      <li> <a href= ${b.thumbnailUrl} target="_blank"> &rtrif; Click to see book cover </a> </li>
      <li> Description: <br> ${b.longDescription} </li>
      </ul>        
      `
    ).css({"font-size" : "0.7em", "color" : "#212529"})
  
     }
  }
  
  }); //end of doc ready
  
  
//student data save to Localstorage
$.getJSON("../dataFiles/A2-JSON.json", function(data){
  console.log(data);
  pname = data.PersonalData.FullName;
  pid = data.PersonalData.StudentID;
  plogin = data.PersonalData.UserName;
  pprogram = data.PersonalData.Program;

  function saveDataToLS(){
    localStorage.setItem("pname", pname);
    localStorage.setItem("pid", pid);
    localStorage.setItem("plogin", plogin);
    localStorage.setItem("pprogram", pprogram);
  };

  saveDataToLS()

//header
$("#headerInfo").html(
    `<p>SYST24444 / Assignment #2 / Winter 2022</p>
     <p>${pname} / ${pid} </p>
     <hr>
    `
  );

//footer
$("#footerInfo").html(`
    <hr>
    <p>My Sheridan User Name : ${plogin}</p>
    <p>My Program : ${pprogram}</p>
   `);
}); // end of getJSON

