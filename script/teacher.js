 // ----------fetch-----------

 let teacherdata = JSON.parse(localStorage.getItem("teachers")) || [];

 let Apiurl = "https://63f72c90e40e087c9588c8ee.mockapi.io/teacher";

 let fdata = [];

 fetch("https://63f72c90e40e087c9588c8ee.mockapi.io/teacher")
   .then((res) => {
     return res.json();
   })
   .then((data) => {
     console.log(data);
     fdata = data;
     displayData(fdata);
   })
   .catch((err) => {
     console.log(err);
   });

 // ------------Display----------

 let container = document.getElementById("teacher-cont");
 let innercont = document.getElementById("main");
 function displayData(data) {
   container.innerHTML = null;

   data.forEach((element) => {
     let teacher = document.createElement("div");

     let name = document.createElement("h3");
     name.textContent = element.name;

     let image = document.createElement("img");
     image.setAttribute("src", element.avatar);

     let title = document.createElement("h5");
     title.textContent = element.title;

     teacher.append(image, name, title);
    // innercont.append(teacher)
    container.append(teacher);

     teacher.addEventListener("click", () => {
       localStorage.setItem("teachers", JSON.stringify(element));
       window.location.href = "./individualteacher.html";
     });
   });
 }

 // ---------Search------------
let searchdiv=document.getElementById("search")
 let searchInput = document.getElementById("searchinput");
 let searchButton = document.getElementById("searchbutton");

 searchButton.addEventListener("click", () => {
   let sdata = searchInput.value;
   console.log(sdata);

   fetch(`https://63f72c90e40e087c9588c8ee.mockapi.io/teacher`)
     .then((res) => {
       return res.json();
     })
     .then((data) => {
       var filterdata = data.filter((ele) => {
         return ele.name == sdata;
       });

       displayData(filterdata);
       console.log(filterdata);
     })
     .catch((err) => {
       console.log(err);
     });
 });