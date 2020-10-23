const API_URL = "https://sportpsi-api.herokuapp.com/api/webs";
const API_BASE_URL = "https://sportpsi-api.herokuapp.com/";
let noOfPages = 0;


window.onload = () => {
     getWebs();
}

const fullWeb = (id) => {

     const email = document.getElementById('mail-' + id).value

     console.log(id);
     console.log(email);

     fetch(`${API_URL}/${id}/${email}`, {
          method: 'POST',
          body: ''
     }).then(() => {
          setTimeout(() => {
               alert('Cererea ta a fost procesata.\nVei primi un raspuns pe email in cel mai scurt timp posibil.')
               location.reload();
          }, 1000)
     })



}

const getWebs = () => {
     fetch(API_URL, {
          method: 'GET'
     }).then((response) => {
          return response.json();
     }).then((data) => {
          buildWebs(data);
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

     for (let i = 2; i <= noOfPages; ++i) {
          if (hasClass(document.getElementById(`page-${i}`), 'active')) {
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

const buildWebs = (webs) => {

     let websContent = "";
     let index = 0;
     let pageIndex = 1;

     for (Web of webs) {
          const video = API_BASE_URL + Web.vid;

          if (index == 0) {
               websContent += `<div id = "${pageIndex}">`;
          } else {
               if (index % 10 == 0) {
                    pageIndex++;
                    websContent += `</div>
                              <div id = "${pageIndex}">`;
               }
          }
          index++;
          websContent += `
          <div style="border: 1px solid #eaecee; margin-top: 2vh; padding: 0.75vh 1vw;">
               <h2>${Web.title}</h2>
               <video class="video-fluid z-depth-1" controls>
                    <source src="${video}" type="video/mp4" />
               </video>

               <!-- Button trigger modal -->
               <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">
               Vezi webinar complet
               </button>

               <!-- Modal -->
               <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div class="modal-dialog" role="document">
               <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${Web.title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    Introdu adresa de email
                    <input type="email" class="form-control" id="mail-${Web.id}" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Anuleaza</button>
                    <button type="button" class="btn btn-primary" onclick='fullWeb(${Web.id})'>Trimite</button>
                    </div>
               </div>
               </div>
               </div>
          </div>

        `
     }
     websContent += '</div>';

     noOfPages = pageIndex;

     websContent += `
    <br>
    <nav aria-label="...">
    <ul class="pagination justify-content-center">        
        <li class="page-item" id = 'previous' onclick = 'previousPage()'>
            <span class="page-link">Previous</span>
        </li>`

     for (let i = 0; i < noOfPages; ++i) {
          websContent += `
        <li onclick = "activatePage(${i + 1})" class = "page-item" id = "page-${i + 1}">
            <a class = "page-link" href = "#">${i + 1}</a>
        </li>`;
     }

     websContent += `
        <li class="page-item" id = 'next' onclick = 'nextPage()'>
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>
    </nav>`;

     document.getElementById('webs').innerHTML = websContent;

     activatePage(1);
}