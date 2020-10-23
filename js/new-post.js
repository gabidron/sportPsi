const API_URL = "https://sportpsi-api.herokuapp.com/api/posts";

const submitNewPost = () => {
    let input = document.querySelector('input[type="file"]');
    const title = document.getElementById("form-post-title").value;
    const content = document.getElementById("form-post-content").value;
    const category = document.getElementById('form-post-select').value;
    
    let data = new FormData();
    data.append('post-image', input.files[0]);
    data.append('title', title );
    data.append('content', content);
    data.append('category', category);

    fetch(API_URL, {
        method: 'POST',
        body: data
    }).then(()=>{
        setTimeout(()=>{
            window.location.href = "index.html";
        }, 1000)
    })
}