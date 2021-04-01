import firebase from 'firebase';
import 'firebase/firestore';  
var firebaseConfig = {
        apiKey: "AIzaSyDCFnzDsOiXRBX6eH_sCc0Oue_osGlP_us",
        authDomain: "todovelotio.firebaseapp.com",
        projectId: "todovelotio",
        storageBucket: "todovelotio.appspot.com",
        messagingSenderId: "510062946520",
        appId: "1:510062946520:web:e52338d9c8d02b676acfad"
}; 
// Initialize Firebase  
var fireDb = firebase.initializeApp(firebaseConfig);  
export default fireDb; 