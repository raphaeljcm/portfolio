const firebaseConfig = {
  apiKey: "AIzaSyDm2FYnroAkV6rRvezyljcanCwBztVZzSQ",
  authDomain: "my-portfolio-6f9b4.firebaseapp.com",
  projectId: "my-portfolio-6f9b4",
  storageBucket: "my-portfolio-6f9b4.appspot.com",
  messagingSenderId: "317720748791",
  appId: "1:317720748791:web:6ae6558c265b2d2d0969f2",
  measurementId: "G-T32YG8WFD6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = 'portfolio-messages';

const firestoreFunctions = {
  createANewMessage: () => {
    const nameValue = document.querySelector("#name").value;
    const emailValue = document.querySelector("#email").value;
    const subjectValue = document.querySelector("#assunto").value;
    const messageValue = document.querySelector("#mensagem").value;

    db.collection(collection).add({
      name: nameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue
    }).then(() => {
        alert('Added successfully');
    }).catch(err => {
      alert(err.message);
    });
  },

  readAllTheMessages: () => {
    db.collection(collection).get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data());
      })
    });
  }
}