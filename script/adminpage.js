


// all function should be works if login successfull only 

let addProductBtnAV = document.getElementById("AV-add");
let addproductspaceAV = document.getElementById("AV-addproduct");

addProductBtnAV.addEventListener("click", () => {
    addproductspaceAV.style.display === "block";
    if (addproductspaceAV.style.display === "none") {
        addproductspaceAV.style.display = "block";
        addProductBtnAV.style.backgroundColor = "rgb(113, 238, 113)"

    } else {
        addproductspaceAV.style.display = "none";
        addProductBtnAV.style.backgroundColor = "#f0f0f0"
    }
    console.log("button clicked");

});





let productsAV = document.getElementById("AV-productdata");

let allproductdataAV = JSON.parse(localStorage.getItem("products"));
//   console.log(allproductdataAV);
// let productTotal=document.getElementById("AV-productTotal");
// productTotal.innerText=`TOTAL :${allproductdataAV.length}`;
async function disaplayDATA(data) {
    data.forEach((e) => {
        console.log(e.length);
        let datadivAV = document.createElement("div");
        let nameAV = document.createElement("h3");
        let priceAV = document.createElement("h3");
        let brandAV = document.createElement("h3");
        let categoryAV = document.createElement("h3");
        let descAV = document.createElement("h3");
        let imageAV = document.createElement("img");
        let delBtn = document.createElement("button");
        nameAV.textContent = `NAME  :${e.name}`;
        brandAV.textContent = `BRAND  :${e.brand}`;
        priceAV.textContent = `PRICE :${e.price}`;
        categoryAV.textContent = `CATEGORY :${e.category}`;
        descAV.textContent = `DESCRIPTION  :${e.description}`
        imageAV.src = e.images[0];
        delBtn.textContent = "Delete"
        datadivAV.append(nameAV, brandAV, priceAV, categoryAV, descAV, imageAV, delBtn);
        productsAV.append(datadivAV);
        console.log(datadivAV);

    })
}

let api = `https://sanju01sahu.github.io/fluffy-potato/db.json`
async function fetchData() {
    try {
        let response = await fetch(api);
        let data = await response.json();
        let a = data.product;
        disaplayDATA(a[0])
        console.log(a[0]);
    } catch (err) {
        console.log(err);
    }
}

fetchData();



// filter part 
let selectType = document.getElementById("AV-category")
function filterData() {
    console.log(selectType.textContent);
}
selectType.addEventListener("change", () => {
    //   console.log(selectType);
})


// disaplayDATA(allproductdataAV);
//code to toggle the display products:


let productsBtnAV = document.getElementById("AV-products");
let productContainerAV = document.getElementById("AV-productdata");
productsBtnAV.addEventListener("click", () => {
    if (productContainerAV.style.display === "none") {
        productContainerAV.style.display = "block";
        productsBtnAV.style.backgroundColor = "rgb(113, 238, 113)";
        console.log("change to block");
    } else {
        productContainerAV.style.display = "none";
        productsBtnAV.style.backgroundColor = "#f0f0f0";
        console.log("change to none");
    }
});


// ADD product

let postDataAV = document.getElementById("AV-addproduct");
let addBtnAV = document.getElementById("AV-submit");


async function addProduct() {
    let nameAV = document.getElementById("AV-name");
    let imageAV = document.getElementById("AV-image");
    let priceAV = document.getElementById("AV-price");
    let categoryAV = document.getElementById("AV-category");
    let descAV = document.getElementById("AV-desc");

    let adddataAV = {
        name: nameAV.value,
        imagesrc: imageAV.value,
        price: priceAV.value,
        category: categoryAV.value,
        description: descAV.value
    }
    alert("Product added successfully");
    try {
        let response = await fetch(`${api}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(adddataAV)
        });

        let data = await response.json(adddataAV);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    console.log(adddataAV);
}


addBtnAV.addEventListener("click", () => {
    addProduct()

})


// users data

let partnersAv = document.getElementById("AV-users");
let usershowAV = document.getElementById("userAV");



function userDatadisplay(data) {
    data.forEach((e) => {
        let AVuser = document.createElement("div");
        let AVusername = document.createElement("h3");
        let AVuseremail = document.createElement("h3");
        let AVuserDelete = document.createElement("button");
        AVusername.textContent = `NAME :${e.name}`
        AVuseremail.textContent = `EMAIL :${e.email}`
        AVuserDelete.innerHTML = "Delete";
        AVuser.append(AVusername, AVuseremail, AVuserDelete);
        usershowAV.append(AVuser);
    })
}

partnersAv.addEventListener("click", () => {

    async function userData() {
        try {
            let response = await fetch(`https://63c1859a376b9b2e647df271.mockapi.io/project`);
            let data = await response.json();
            console.log(data);
            userDatadisplay(data);
        } catch (err) {
            console.log(err);
        }
    }
    userData();

})

let toggleuserbtnAV = document.getElementById("AV-users");
let toggleAV = document.getElementById("userAV");
toggleuserbtnAV.addEventListener("click", () => {
    if (toggleAV.style.display === "none") {
        toggleAV.style.display = "block";
        toggleuserbtnAV.style.backgroundColor = "rgb(113, 238, 113)"
    } else {
        toggleAV.style.display = "none";
        toggleuserbtnAV.style.backgroundColor = "#f0f0f0";
    }
})