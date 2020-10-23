

const API_URL = "https://sportpsi-api.herokuapp.com/api/posts";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";
let noOfPages = 0;


window.onload = () => {
    getPosts();
}

const getPostsByCategory = (category) => {

    fetch(API_URL + '/query/' + category, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    })
}

const goToAbout = (elem) => {
    window.location.href = "http://127.0.0.1:5500/despre.html?" + elem.innerText;
}

const goToResources = (elem) => {
    window.location.href = "http://127.0.0.1:5500/resurse.html?type=" + elem.innerText;
}

const getPostsBySearch = () => {


    let text = document.getElementById('search').value;

    if (text == '') {
        getPosts();
    } else {
        fetch(API_URL + '/search/' + text, {
            method: 'GET'
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                document.querySelector(".blog-posts").innerHTML = 'Sorry, no results were found';
                return;
            }

        }).then((data) => {
            buildPosts(data);
        })
    }
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


function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

const nextPage = () => {

    for (let i = 1; i < noOfPages; ++i) {
        if (hasClass(document.getElementById(`page-${i}`), 'active')) {
            activatePage(i + 1);
            disablePage(i);
            break;
        }
    }
}

const previousPage = () => {

    for(let i = 2; i <= noOfPages; ++i){
        if(hasClass(document.getElementById(`page-${i}`), 'active')) {
            activatePage(i - 1);
            disablePage(i);
        }
    }
}

const activatePage = (i) => {

    let page = document.getElementById(`page-${i}`);
    page.classList.toggle('active');

    document.getElementById(i).style.display = 'block';

    for (let it = 1; it <= noOfPages; ++it) {
        if (it != i) {
            disablePage(it);
        }
    }



    switch (i) {
        case 1:
            disableButton('previous');
            activateButton('next');
            break;
        case noOfPages:
            disableButton('next');
            activateButton('previous');
            break;
        default:
            activateButton('previous');
            activateButton('next');
    }
}

const activateButton = (id) => {

    let button = document.getElementById(id);
    button.classList.remove('disabled');

}

const disablePage = (i) => {

    document.getElementById(i).style.display = 'none';
    let page = document.getElementById(`page-${i}`);
    page.classList.remove('active');

}

const disableButton = (id) => {
    let button = document.getElementById(id);
    button.classList.toggle('disabled');
}

const buildPosts = (blogPosts) => {

    console.log(blogPosts);

    let blogPostsContent = "";
    let index = 0;
    let pageIndex = 1;

    for (blogPost of blogPosts) {
        const postImage = API_BASE_URL + blogPost.post_image;
        const postLink = `/post.html?id=${blogPost.id}`;
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();

        if (index == 0) {
            blogPostsContent += `<div id = "${pageIndex}">`;
        } else {
            if (index % 10 == 0) {
                pageIndex++;
                blogPostsContent += `</div>
                              <div id = "${pageIndex}">`;
            }
        }
        index++;
        blogPostsContent += `
            <a class="post-link" href="${postLink}">
                <div class="post">
                    <div class="post-image" style="background-image: url(${postImage})"></div>
                    <div class="post-content">
                        <div class="post-date">${postDate}<br>Cehan Ionut</div>
                        <div class="post-title">
                            <h4>${blogPost.title}</h4>
                        </div>
                        <div class="post-text">
                            <p>${blogPost.content}</p>
                        </div>
                    </div>
                </div>
            </a>
        `
    }
    blogPostsContent += '</div>';

    noOfPages = pageIndex;

    //disable
    //active

    blogPostsContent += `
    <br>
    <nav aria-label="...">
    <ul class="pagination justify-content-center">        
        <li class="page-item" id = 'previous' onclick = 'previousPage()'>
            <span class="page-link">Previous</span>
        </li>`

    for (let i = 0; i < noOfPages; ++i) {
        blogPostsContent += `
        <li onclick = "activatePage(${i + 1})" class = "page-item" id = "page-${i + 1}">
            <a class = "page-link" href = "#">${i + 1}</a>
        </li>`;
    }

    blogPostsContent += `
        <li class="page-item" id = 'next' onclick = 'nextPage()'>
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>
    </nav>`;

    document.querySelector(".blog-posts").innerHTML = blogPostsContent;

    activatePage(1);
}