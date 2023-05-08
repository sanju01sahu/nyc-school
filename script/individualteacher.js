
let teacherdata = JSON.parse(localStorage.getItem("teachers")) || [];
let disteacher = []

disteacher.push(teacherdata)
console.log(disteacher)

let container = document.getElementById("individual-cont");
let imagdiv = document.getElementById("imgdiv")
detaildiv = document.getElementById("detaildiv")

function displayData(data) {
   container.innerHTML = null;

   data.forEach((element) => {

      let teacher = document.createElement("div")

      let name = document.createElement("h2")
      name.textContent = `Name: ${element.name}`;

      let image = document.createElement("img")
      image.setAttribute("src", element.avatar)

      let title = document.createElement("h5")
      title.textContent = `Specialism: ${element.title}`;

      let discription = document.createElement("p")
      discription.textContent = `Area Of Responsibilities: ${element.description}`


      container.append(teacher)
      teacher.append(imagdiv, detaildiv)
      imagdiv.append(image)
      detaildiv.append(name, title, discription)

   })

}

displayData(disteacher)