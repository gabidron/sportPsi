const API_URL = "https://sportpsi-api.herokuapp.com/api/posts/";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";

window.onload = () => {
    getPost();
    getComments();

}

const noSelect = () => {
    document.getElementById('main').classList.toggle('noselect');
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

const getPost = () => {
    const url = `${API_URL}${getPostIdParam()}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPost(data);
    })
}

const buildPost = (data) => {
    console.log(data);
    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postImage = API_BASE_URL + data.post_image;
    document.querySelector("header").style.backgroundImage = `url(${postImage})`;
    document.getElementById("individual-post-title").innerText = data.title;
    document.getElementById("individual-post-date").innerText = `Post on ${postDate}\nCehan Ionut`;
    document.getElementById("individual-post-content").innerText = data.content;

    switch (data.category) {
        case "Sport PSI":
            noSelect();
            break;
        case "Psihologie sportiva":
            noSelect();
            break;
        case "Psiholog sportiv":
            noSelect();
            break;
        case "Consiliere psihologica sportiva":
            noSelect();
            break;
        case "Certificari":
            noSelect();
            break;
        default:
            break;
    }

}

const getComments = () => {
    //027BFD
    const url = `${API_URL}${getPostIdParam()}/comm`;
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        console.log(response);
        return response.json();
    }).then((data) => {
        addComments(data);
    })
}

const addComments = (comments) => {

    console.log(comments);

    let commentsList = '';

    console.log(comments);

    for (comment of comments) {
        commentsList += `
        <div id = "comm">
        ${comment.comm}
        </div>
        <br>
        `
    }

    document.getElementById('posted-comments').innerHTML += commentsList;

}

const submitComment = () => {

    const comment = document.getElementById('comment-input').value;
    const postID = getPostIdParam();

    fetch(API_URL + 'comm/' + postID + '/' + comment, {
        method: 'POST',
        body: ''
    }).then(() => {
        setTimeout(() => {
            alert('Comentariul a fost adaugat cu succes.\nAcum trebuie validat de catre administrator.');
            setTimeout(() => {
                //location.reload();
            }, 1000);
        }, 1000)
    })
}