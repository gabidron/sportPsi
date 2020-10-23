const API_URL = "https://sportpsi-api.herokuapp.com/api/posts";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";
let PATH = '';
window.onload = () => {
    article();
}

const article = () => {
    document.getElementById('article').style.display = 'block';
    document.getElementById('comms').style.display = 'none';
    document.getElementById('res').style.display = 'none';
    document.getElementById('msg').style.display = 'none';
    document.getElementById('web').style.display = 'none';
    document.getElementById('webReq').style.display = 'none';
    getPosts();
}

const comms = () => {
    document.getElementById('comms').style.display = 'block';
    document.getElementById('article').style.display = 'none';
    document.getElementById('res').style.display = 'none';
    document.getElementById('msg').style.display = 'none';
    document.getElementById('web').style.display = 'none';
    document.getElementById('webReq').style.display = 'none';
    getComms();
}

const res = () => {
    document.getElementById('res').style.display = 'block';
    document.getElementById('comms').style.display = 'none';
    document.getElementById('article').style.display = 'none';
    document.getElementById('msg').style.display = 'none';
    document.getElementById('web').style.display = 'none';
    document.getElementById('webReq').style.display = 'none';
    getRes();
}

const msg = () => {
    document.getElementById('msg').style.display = 'block';
    document.getElementById('comms').style.display = 'none';
    document.getElementById('res').style.display = 'none';
    document.getElementById('article').style.display = 'none';
    document.getElementById('web').style.display = 'none';
    document.getElementById('webReq').style.display = 'none';
    getMsg();
}

const web = () => {
    document.getElementById('web').style.display = 'block';
    document.getElementById('msg').style.display = 'none';
    document.getElementById('comms').style.display = 'none';
    document.getElementById('res').style.display = 'none';
    document.getElementById('article').style.display = 'none';
    document.getElementById('webReq').style.display = 'none';
    getWeb();
}

const webReq = () => {
    document.getElementById('webReq').style.display = 'block';
    document.getElementById('msg').style.display = 'none';
    document.getElementById('comms').style.display = 'none';
    document.getElementById('res').style.display = 'none';
    document.getElementById('article').style.display = 'none';
    document.getElementById('web').style.display = 'none';
    getWebReq();
}


const goToNewResPage = () => {
    window.location.href = "https://gabidron.github.io/sportPsi/new-res.html"
}
const goToNewPostPage = () => {
    window.location.href = "https://gabidron.github.io/sportPsi/new-post.html";
}
const goToNewWebPage = () => {
    window.location.href = "https://gabidron.github.io/sportPsi/new-web.html";
}
const goToPost = (id) => {
    window.location.href = "https://gabidron.github.io/sportPsi/post.html?id=" + id;
}
const editPost = (id) => {
    window.location.href = "https://gabidron.github.io/sportPsi/edit.html?id=" + id;
}

const getWeb = () => {
    fetch(API_BASE_URL + 'api/webs', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildWebs(data);
    })
}

const getWebReq = () => {
    fetch(API_BASE_URL + 'api/webs/req', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildWebsReq(data);
    })
}


const getComms = () => {
    fetch(API_URL + '/comms', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildComms(data);
    })
}

const getMsg = () => {
    fetch(API_BASE_URL + 'api/message', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildMsgs(data);
    })
}

const getRes = () => {
    fetch(API_BASE_URL + 'api/res', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildRes(data);
    })
}

const aproveComm = (postId, comment, state) => {
    console.log('sdsda');
    fetch(`${API_URL}/comms/${postId}/${comment}/${state}`, {
        method: 'POST',
        body: ''
    }).then(() => {
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000)
    })
}
const deletePost = (id) => {

    let data = new FormData();

    data.append('id', id);

    fetch(`${API_URL}/delete/${id}`, {
        method: 'POST',
        body: data
    }).then(() => {
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000)
    })
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    })
}

const deleteRes = (id) => {

    let data = new FormData();

    data.append('id', id);

    fetch(`${API_BASE_URL}api/res/delete/${id}`, {
        method: 'POST',
        body: data
    }).then(() => {
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000)
    })
}

const deleteWeb = (id) => {
    let data = new FormData();

    data.append('id', id);

    fetch(`${API_BASE_URL}api/webs/delete/${id}`, {
        method: 'POST',
        body: data
    }).then(() => {
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000)
    })
}

const seeVideo = (id) => {
    console.log(id);
    fetch(API_BASE_URL + 'api/web/' + id, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        gotoVideo(data);
    })
}

const gotoVideo = (data) => {
    window.location.href = API_BASE_URL + data.vid;
}

const buildWebsReq = (webs) => {
    let websReqContent = '';
    for (Web of webs) {
        websReqContent += `
          <div class="col-5" onclick = "seeVideo(${Web.id})">click</div>
          <div class="col-5">${Web.email}</div>
          `;
    }

    document.getElementById('websReq').innerHTML = websReqContent;
}

const buildWebs = (webs) => {
    let websContent = '';

    for (Web of webs) {
        const postDate = new Date(parseInt(Web.id)).toDateString();

        websContent += `
          <div class="col-6">${Web.title}</div>
          <div class="col-2">${postDate}</div>
          <div class="col-2">
               <button style='font-size:12px; border:none; background-color:transparent'onclick = 'deleteWeb(${Web.id})'>Sterge <i class='fas fa-trash'></i></button>
          </div>
          `;
    }

    document.getElementById('webs').innerHTML = websContent;
}

const buildRes = (ress) => {
    let ressContent = '';

    for (Res of ress) {
        const postDate = new Date(parseInt(Res.id)).toDateString();
        ressContent += `
          <div class="col-3">${Res.title}</div>
          <div class="col-3">${Res.category}</div>
          <div class="col-2">${postDate}</div>
          <div class="col-2">
               <button style='font-size:12px; border:none; background-color:transparent'onclick = 'deleteRes(${Res.id})'>Sterge <i class='fas fa-trash'></i></button>
          </div>
          `;
    }

    document.getElementById('resources').innerHTML = ressContent;
}

const buildMsgs = (msgs) => {

    let msgsContent = '';

    for (Msg of msgs) {
        const postDate = new Date(parseInt(Msg.id)).toDateString();
        msgsContent += `
          <div class="col-6">${Msg.msg}</div>
          <div class="col-3">${Msg.email}</div>
          <div class="col-2">${postDate}</div>
          `
    }

    document.getElementById('messages').innerHTML = msgsContent;
}

const buildComms = (comments) => {

    let commsContent = '';

    for (Comm of comments) {
        commsContent += `
          <div class="col-6">${Comm.comm}</div>
          <div class="col-4" style="text-align: right;">
          <button style='font-size:12px; border:none; background-color:transparent'onclick = 'goToPost(${Comm.postID})'>Vezi postarea <i class="fas fa-eye"></i></button>
          <button style='font-size:12px; border:none; background-color:transparent'onclick = 'aproveComm(${Comm.postID}, "${Comm.comm}", 1)'>Aproba <i class="fas fa-check-square"></i></button>
          <button style='font-size:12px; border:none; background-color:transparent'onclick = 'aproveComm(${Comm.postID}, "${Comm.comm}", 0)'>Respinge <i class="fas fa-times"></i></button>
          </div>`
    }

    document.getElementById('comments').innerHTML = commsContent;
}

const buildPosts = (blogPosts) => {

    let blogPostContent = '';

    for (blogPost of blogPosts) {
        blogPostContent += `
          <div class="col-3">${blogPost.title}</div>
          <div class="col-3">Autor</div>
          <div class="col-4" style="text-align: right;">
          <button style='font-size:12px; border:none; background-color:transparent'onclick = 'editPost(${blogPost.id})'>Edit <i class='far fa-edit'></i></button>
          <button style='font-size:12px; border:none; background-color:transparent'onclick = 'deletePost(${blogPost.id})'>Delete <i class='fas fa-trash'></i></button>
          </div>`
    }

    document.getElementById('posts').innerHTML = blogPostContent;


}