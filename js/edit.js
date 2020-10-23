const API_URL = "https://sportpsi-api.herokuapp.com/api/posts";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";


window.onload = () => {
     getPost();
}

const getPostIdParam = () => {
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
     return urlParams.get('id');
}

const getPost = () => {
     const url = `${API_URL}/${getPostIdParam()}`
     fetch(url, {
          method: 'GET'
     }).then((response) => {
          console.log(response);
          return response.json();
     }).then((data) => {
          console.log(data);
          buildPost(data);
     })
}

const buildPost = (data) => {
     console.log(data);

     const postImage = API_BASE_URL + data.post_image;
     document.querySelector("header").style.backgroundImage = `url(${postImage})`;

     document.getElementById("post-title").innerText = data.title;
     document.getElementById("form-post-title").setAttribute('placeHolder', data.title);
     document.getElementById("post-content").innerText = data.content;
}


const editPost = () => {
     let input = document.querySelector('input[type="file"]');
     const title = document.getElementById("form-post-title").value;
     const content = document.getElementById("post-content").value;
     const category = document.getElementById('form-post-select').value;

     let data = new FormData();
     data.append('post-image', input.files[0]);
     data.append('title', title);
     data.append('content', content);
     data.append('category', category);

     fetch(`${API_URL}/edit/${getPostIdParam()}`, {
          method: 'POST',
          body: data
     }).then(() => {
          setTimeout(() => {
               window.location.href = "admin.html";
          }, 1000)
     })
}