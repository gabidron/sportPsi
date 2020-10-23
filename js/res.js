const API_URL = "https://sportpsi-api.herokuapp.com/api/res";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";

window.onload = () => {
     getRess();
}

const submitNewRes = () => {

     let input = document.querySelector('input[type="file"]');
     const title = document.getElementById("form-res-title").value;
     const category = document.getElementById('form-res-select').value;

     let data = new FormData();
     data.append('res-file', input.files[0]);
     data.append('title', title);
     data.append('category', category);

     fetch(API_URL, {
          method: 'POST',
          body: data
     }).then(() => {
          setTimeout(() => {
               window.location.href = "admin.html";
          }, 1000)
     })
}

const getRess = () => {
     fetch(API_URL, {
          method: 'GET'
     }).then((response) => {
          return response.json();
     }).then((data) => {
          buildRess(data);
     })
}
const getResTypeParam = () => {
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
     return urlParams.get('type');
}

const viewPdf = (path) => {


     console.log(path);
     document.getElementById('pdf').setAttribute("data", path);
     document.getElementById('pdf1').setAttribute("src", path);

}
const buildRess = (ress) => {

     let ressContent = "";
     const category = getResTypeParam();
     let firstPath = '';

     ressContent += `
     <h3>${category}</h3>
     <br>
     <hr>
     `
     console.log(ress);
     for (Res of ress) {
          const pdf = API_BASE_URL + Res['res-file'];
          if (category.toLocaleUpperCase() == Res.category.toLocaleUpperCase()) {
               if(firstPath == ''){
                    firstPath = pdf;
               }
               ressContent += `
               <button type="button" class="btn btn-primary btn-lg btn-block" style="margin-top: 1vh;" onclick="viewPdf('${pdf}')">${Res.title}</button>
             `
          }
     }
     viewPdf(firstPath);
     document.getElementById('ress').innerHTML = ressContent;

}

