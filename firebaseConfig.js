// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfbQvQGlN4WqrkLj-002HwCql6hz8G7YE",
    authDomain: "culture-connector.firebaseapp.com",
    databaseURL: "https://culture-connector-default-rtdb.firebaseio.com",
    projectId: "culture-connector",
    storageBucket: "culture-connector.appspot.com",
    messagingSenderId: "516997195144",
    appId: "1:516997195144:web:fb9afc6ff080af8bb8063d"
};



const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getDatabase(app)

export { app, auth, db };







function recommend(ailments, otherUsers, type) {
    const issues = ailments.split(",")
    var similarities = []
    for (var key in otherUsers) {
        if (otherUsers[key].userType != type) {
            continue
        }
        var otherUserIssues = otherUsers[key].data.split(",")
        var similarity = 0
        for (var issue in issues) {
            if (issue in otherUserIssues) {
                similarity += 1
            }
        }
        similarities.push([otherUsers[key], similarity])

    }
    similarities.sort((a, b) => a[1] - b[1]).reverse()
    var out = []
    for (var i = 0; i < similarities.length; i++) {
        out.push(similarities[i][0])
    }
    console.log(out)
    return out.slice(0, 4)
}









export async function forgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Your password reset link has been sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }

}

export function logout() {
    signOut(auth)
    console.log("signed out")
}

export async function signInUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert("Incorrect username or password, please try again!");
    }
}


export async function createUser(email, password, userType, data) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        persistUser(email, userType, data, user.uid)
    }
    catch (error) {
        console.log(error)
        alert("That username already exists, please try a different one.")
    }
}

export async function persistUser(email, userType, data, id) {
    await set(ref(db, 'users/' + id), {
        email: email,
        userType: userType,
        data: data,
        uuid: id
    });
}

