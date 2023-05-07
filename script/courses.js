

let mainSection = document.getElementById("data-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

let lsData = JSON.parse(localStorage.getItem("user")) || [];

window.addEventListener("load",()=>{
  fetchAndRenderUsers(1)
})

let Arr = [];

function fetchAndRenderUsers(pageNumber){
  fetch(`https://mock-api-courses.onrender.com/users?_limit=5&_page=${pageNumber}`)
  .then((res)=>{

    let totalPosts = res.headers.get("X-Total-Count");
    let totalButtons = Math.ceil(totalPosts/5);
    
    paginationWrapper.innerHTML="";

    for(let i=1; i<=totalButtons; i++){
      paginationWrapper.append(getAsBtn(i))
    }
   
    return res.json();

  })
  .then((data)=>{
    console.log(data)
    Arr = data;
    mainSection.innerHTML="";
    const cardList = getCardList(data);
    mainSection.append(cardList);

  })
  .catch((error)=>{console.log(error)});

}


function getCardList(data){
  const cardList = document.createElement("div");
  cardList.classList.add("card-list");

  data.forEach((item)=>{
    const card = getCard(
      item.id,
      item.image,
      item.course,
      item.description,
      item.duration,
      // item.price
    )

    cardList.append(card);

  })

  return cardList;

}




function getCard(userId,imageUrl,course,description,duration){

  const card = document.createElement("div");
  card.setAttribute("class","card")
  card.setAttribute("data-id",userId);

  const cardImg = document.createElement("div");
  cardImg.classList.add("card__img");

  const img = document.createElement("img");
  img.src = imageUrl;
  img.setAttribute("alt",`${course} image`);

  cardImg.append(img);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class","card__body");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__item")
  cardTitle.classList.add("card__title")
  cardTitle.innerText=course;

  const cardDesc = document.createElement("div");
  cardDesc.classList.add("card__item")
  cardDesc.classList.add("card__description")
  cardDesc.innerText=description;

  const cardDuration = document.createElement("h4")
  cardDuration.classList.add("card-duration");
  cardDuration.innerText = `Course Duration : ${duration}`;

  const cardSec = document.createElement("div");
  cardSec.classList.add("card-sec");

  const cardPrice = document.createElement("h3")
  cardPrice.classList.add("card-price");
  cardPrice.innerText = `₹  Free`;

  const cardEnroll = document.createElement("button");
  cardEnroll.classList.add("card-enroll");
  cardEnroll.innerText = "ENROLL"
  
  cardEnroll.addEventListener("click", (e) => {
    e.preventDefault();

   const cardData = {
      id: userId,
      image: imageUrl,
      course: course,
      description: description,
      duration: duration,
    };

  lsData.push(cardData);
  localStorage.setItem("user", JSON.stringify(lsData));

  alert(`🎉 You have successfully enrolled into the course! 🎉`);
  setTimeout(() => {
    window.location.href = "/pages/home.html";
  }, 2000);
  });


  cardSec.append(cardPrice,cardEnroll);

  cardBody.append(cardTitle,cardDesc,cardDuration,cardSec);
  card.append(cardImg,cardBody);


  return card;

}


function getAsBtn(pageNumber){
  let btn = document.createElement("button");
  btn.setAttribute("data-id",pageNumber)
  btn.setAttribute("class","pagination-button");
  btn.setAttribute("data-page-number",pageNumber);
  btn.innerText=pageNumber;

  btn.addEventListener("click",(e)=>{
    let pageNumber = e.target.dataset.id;
    fetchAndRenderUsers(pageNumber);
  })

  return btn;

}






let Default = document.getElementById("Default");
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

Default.addEventListener("click",()=>{
    fetchAndRenderUsers(1)
})


sortAtoZBtn.addEventListener("click",()=>{
    fetch(`https://mock-api-courses.onrender.com/users?_sort=duration&_order=asc&_limit=5`)
    .then((res)=>res.json())
    .then((data)=>{
      
      mainSection.innerHTML = "";
      const cardList = getCardList(data);
      mainSection.append(cardList);
      
    })
    .catch((error)=>{
      console.log(error);
    })
    
  })
  
  
  sortZtoABtn.addEventListener("click",()=>{
    fetch(`https://mock-api-courses.onrender.com/users?_sort=duration&_order=desc&_limit=5`)
    .then((res)=>res.json())
    .then((data)=>{
      
      mainSection.innerHTML = "";
      const cardList = getCardList(data);
      mainSection.append(cardList);
  
    })
    .catch((error)=>{
      console.log(error);
    })
    
  })



  let formEl = document.querySelector("form")

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = formEl.search.value;
  
    let filtered = Arr.filter((ele) => {
      if (ele.course.toUpperCase().includes(search.toUpperCase()) == true) {
        return true;
      }
      else {
        return false;
      }
    })
    mainSection.innerHTML = "";
    const cardList = getCardList(filtered);
    mainSection.append(cardList);
  })
  
  