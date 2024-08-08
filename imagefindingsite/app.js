const formWrapper= document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput= document.querySelector("#searchInput");
const buttonWrapper=document.querySelector(".buttonWrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper=document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners(){
form.addEventListener("submit", search);
clearButton.addEventListener("click",clear);
}

function clear(){
    searchInput.value="";
    imageListWrapper.innerHTML="";
}

function search(e){

    imageListWrapper.innerHTML = ""; // !!Yeni arama yapılırken önceki sonuçları temizle

    const value = searchInput.value.trim(); //arama butonuna yazılan değeri tutar

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method:"GET",
        headers:{
            Authorization: "Client-ID CL-HcqUxyiw9wv0jSw45RHHyKEkBdGo_vht07izkIXo"
        }
    })

    .then((res)=>res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{ //diziye çevirdik foreach kullanmak için
           addImageToUI(image.urls.small) 
        })
    })
    .catch((err)=> console.log(err))

    e.preventDefault(); //sayfa yönlendirmesini engelliyor
}

function addImageToUI(url){ //oluşturacağımız kartları oluşturduk

    const div= document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url); //bu konuya çalış setAttribute
    img.height="400";
    img.width="400"; //400px yazmayacaksın direkt sayı yaz yoksa hata veriyor

    div.append(img);
    imageListWrapper.append(div);
}