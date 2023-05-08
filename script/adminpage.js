// ----------Course Display------
let mainSection = document.getElementById("courseContainer");
let paginationWrapper = document.getElementById("pagination-wrapper");

let coursesBtn = document.getElementById("course_button");

coursesBtn.addEventListener("click", () => {
  fetchAndRenderUsers(1);
});

let Arr = [];

function fetchAndRenderUsers(pageNumber) {
  fetch(
    `https://mock-api-courses.onrender.com/users?_limit=5&_page=${pageNumber}`
  )
    .then((res) => {
      let totalPosts = res.headers.get("X-Total-Count");
      let totalButtons = Math.ceil(totalPosts / 5);

      paginationWrapper.innerHTML = "";
      paginationWrapper.style.display = "block";
      paginationWrapper.style.cssText =
        "display: flex; flex-direction: row; justify-content: center; align-items: center;";

      for (let i = 1; i <= totalButtons; i++) {
        paginationWrapper.append(getAsBtn(i));
      }

      return res.json();
    })
    .then((data) => {
      console.log(data);
      Arr = data;
      mainSection.innerHTML = "";
      const cardList = getCardList(data);
      mainSection.append(cardList);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCardList(data) {
  const cardList = document.createElement("div");
  cardList.classList.add("card-list");

  data.forEach((item) => {
    const card = getCard(
      item.id,
      item.image,
      item.course,
      item.description,
      item.duration
      // item.price
    );

    cardList.append(card);
  });

  return cardList;
}

function getCard(userId, imageUrl, course, description, duration) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-id", userId);

  const cardImg = document.createElement("div");
  cardImg.classList.add("card__img");

  const img = document.createElement("img");
  img.src = imageUrl;
  img.setAttribute("alt", `${course} image`);

  cardImg.append(img);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card__body");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__item");
  cardTitle.classList.add("card__title");
  cardTitle.innerText = course;

  const cardDesc = document.createElement("div");
  cardDesc.classList.add("card__item");
  cardDesc.classList.add("card__description");
  cardDesc.innerText = description;

  const cardDuration = document.createElement("h4");
  cardDuration.classList.add("card-duration");
  cardDuration.innerText = `Course Duration : ${duration}`;

  const cardSec = document.createElement("div");
  cardSec.classList.add("card-section");

  const cardPrice = document.createElement("h3");
  cardPrice.classList.add("card-price");
  cardPrice.innerText = `₹  Free`;

  const cardDelete = document.createElement("button");
  cardDelete.classList.add("card-delete");
  cardDelete.innerText = "DELETE";

  cardDelete.addEventListener("click", (e) => {
    e.preventDefault();

    deleteCard(userId, imageUrl, course, description, duration);
  });

  cardSec.append(cardPrice, cardDelete);

  cardBody.append(cardTitle, cardDesc, cardDuration, cardSec);
  card.append(cardImg, cardBody);

  return card;
}

function getAsBtn(pageNumber) {
  let btn = document.createElement("button");
  btn.setAttribute("data-id", pageNumber);
  btn.setAttribute("class", "pagination-button");
  btn.setAttribute("data-page-number", pageNumber);
  btn.innerText = pageNumber;

  btn.addEventListener("click", (e) => {
    let pageNumber = e.target.dataset.id;
    fetchAndRenderUsers(pageNumber);
  });

  return btn;
}

function deleteCard(userId, imageUrl, course, description, duration) {
  fetch(`https://mock-api-courses.onrender.com/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      image: imageUrl,
      course: course,
      description: description,
      duration: duration,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchAndRenderUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}
