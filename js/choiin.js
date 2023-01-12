var dataTemp;
var cList = new Array();
var rowID;
var bList = new Array();

class Category {
  constructor(categoryGroup, logo) {
    this.categoryGroup = categoryGroup;
    this.logo = logo;
  }
}

class Books {
  constructor(bookID, title, isbn, pageCount, thumbnailUrl, longDescription, authors, category){
    this.bookID = bookID; this.title = title;
    this.isbn = isbn; this.pageCount = pageCount;
    this.thumbnailUrl = thumbnailUrl; 
    this.longDescription = longDescription;
    this.authors = authors;
    this.category = category;
  }
}

//document.ready statement
$(document).ready(function(){
  console.log("in doc ready");

  $.ajax({
    type : "GET", 
    url : "dataFiles/A2-JSON.json",
    dataType : "json",
    success : loadJSON,
    error : function (e) {alert (`${e.status} - ${e.statusText}`);},
  }); // end of ajax call


}); // end of doc ready

//loadJSON function
  function loadJSON(data){
   // console.log(data);
    dataTemp = data;
 
    //create category list
    for(let cat of data.Categories) {
      cList.push(new Category(cat.categoryGroup, cat.logo));
    } // end of category loop
    //console.log(cList);

    //create book list
    for (let book of data.BookDetail) {
      bList.push(new Books(
        book.bookID, book.title, book.isbn, book.pageCount, book.thumbnailUrl, book.longDescription, book.authors, book.category
      )); 
    }// end of book loop
    //console.log(bList);

    mainScreen(data);
  };

// mainScreen function
  function mainScreen(data){
    //display data on screen
    $("#categoryHead").html(`Select Category for more info`);
    $("#categoryHead").css({"font-size" : "1em", "font-weight" : "bold", "color" : "#272640" , "text-align" : "center"});
   
    $("#categoryList").html("");
    for(let[index, c] of data.Categories.entries()) {
      // console.log(index);
      //console.log(c);
      $('#categoryList').append(
        `
          <button id = '${index}'>
          <a href= 'pages/books.html'>
            ${cList[index].categoryGroup}
          <br>
          <img src = "images/a2images/${c.logo}">   
          </a> </button>     
                                  
        `
      );
    } // end of for loop

  }//end of mainScreen

  //save data to local storage
  $(document).on("click", "#categoryList > button", function(){
    localStorage.setItem(	"rowID",$(this).closest("button").attr("id") );
    localStorage.setItem("cList", JSON.stringify(cList));
    localStorage.setItem("bList", JSON.stringify(bList));
  });

//student data save to Localstorage
$.getJSON("dataFiles/A2-JSON.json", function(data){
   // console.log(data);
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
      `<p>SYST24444 | Assignment #2 | Winter 2022</p>
       <p>${pname} | ${pid} </p>
       `
    );
  
    //footer
    $("#footerInfo").html(`
     
      <p>My Sheridan User Name : ${plogin}</p>
      <p>My Program : ${pprogram}</p>
     `);
  }); // end of getJSON