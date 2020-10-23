const API_URL = "https://sportpsi-api.herokuapp.com/api/web";


const submitNewWeb = () => {

     let input = document.querySelector('input[type="file"]');
     const title = document.getElementById("form-web-title").value;

     let data = new FormData();

     data.append('vid', input.files[0]);
     data.append('title', title);


     fetch(API_URL, {
          method: 'POST',
          body: data
     }).then(() => {
          setTimeout(() => {
               window.location.href = "admin.html";
          }, 1000)
     })
}