const API_URL = "https://sportpsi-api.herokuapp.com/api/message";


const sendMessage = () => {
     let message = document.getElementById('msg').value;
     let email = document.getElementById('email').value;



     fetch(`${API_URL}/${message}/${email}`, {
          method: 'POST',
          body: {
               'message': message,
               'email': email
          }
     }).then(() => {
          setTimeout(() => {
               window.location.href = "index.html";
          }, 1000);
     });
}