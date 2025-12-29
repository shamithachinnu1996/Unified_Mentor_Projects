// ====================================================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// ====================================================================
const firebaseConfig = {
    apiKey: "AIzaSyACWf1QIG-FP0rJJvnXN_jStOqmaCnEMVQ",
    authDomain: "student-teacher-booking-31b81.firebaseapp.com",
    projectId: "student-teacher-booking-31b81",
    storageBucket: "student-teacher-booking-31b81.firebasestorage.app",
    messagingSenderId: "238661941834",
    appId: "1:238661941834:web:063daad5077f11c2fbc4b3"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database(); 

// ====================================================================
// 2. AUTH STATE & VIEW MANAGEMENT
// ====================================================================
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
}

auth.onAuthStateChanged(async (user) => {
    if (user) {
        const snapshot = await db.ref("users/" + user.uid).once("value");
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.role === 'teacher') {
                document.getElementById('teacher-name').textContent = data.name;
                showView('teacher-dashboard-view');
            } else {
                document.getElementById('student-name').textContent = data.name;
                showView('student-dashboard-view');
            }
        }
    } else {
        showView('auth-view');
    }
});

// ====================================================================
// 3. REGISTRATION LOGIC (LAKSHMI, KRISHNA, NITHA, SHARMA)
// ====================================================================

async function saveUserToDatabase(user, name, role, subject = "") {
    return db.ref("users/" + user.uid).set({
        name: name,
        email: user.email,
        role: role,
        subject: subject,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
}

// 1. Student: Lakshmi
async function registerLakshmi() {
    try {
        const cred = await auth.createUserWithEmailAndPassword("lakshmi@gmail.com", "lachu1234");
        await saveUserToDatabase(cred.user, "Lakshmi", "student");
        alert("Lakshmi (Student) Added!");
    } catch (e) { alert(e.message); }
}

// 2. Student: Krishna
async function registerKrishna() {
    try {
        const cred = await auth.createUserWithEmailAndPassword("krishna@gmail.com", "krish123");
        await saveUserToDatabase(cred.user, "Krishna", "student");
        alert("Krishna (Student) Added!");
    } catch (e) { alert(e.message); }
}

// 3. Teacher: Nitha
async function registerNitha() {
    try {
        const cred = await auth.createUserWithEmailAndPassword("nitha@school.com", "nitha123");
        await saveUserToDatabase(cred.user, "Nitha", "teacher", "Chemistry");
        alert("Nitha (Teacher - Chemistry) Added!");
    } catch (e) { alert(e.message); }
}

// 4. Teacher: Sharma
async function registerSharma() {
    try {
        const cred = await auth.createUserWithEmailAndPassword("sharma@school.com", "sharma123");
        await saveUserToDatabase(cred.user, "Sharma", "teacher", "Maths");
        alert("Sharma (Teacher - Maths) Added!");
    } catch (e) { alert(e.message); }
}

// Manual Form Registration
async function handleManualRegistration() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;
    const subject = document.getElementById('reg-subject').value;
    try {
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        await saveUserToDatabase(cred.user, name, role, subject);
        alert("Registration Successful!");
    } catch (e) { alert(e.message); }
}

// ====================================================================
// 4. LOGIN, LOGOUT & SEARCH
// ====================================================================

async function loginUser() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    try {
        await auth.signInWithEmailAndPassword(email, pass);
    } catch (e) { alert("Login Failed: " + e.message); }
}

function logoutUser() {
    auth.signOut().then(() => {
        document.getElementById('teacher-name').textContent = "";
        document.getElementById('student-name').textContent = "";
        document.getElementById('teacher-search-results').innerHTML = "";
        showView('auth-view');
        window.location.reload(); // Refresh to ensure session is cleared
    }).catch(e => alert(e.message));
}

async function searchTeachers() {
    const subjectToSearch = document.getElementById('search-subject').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('teacher-search-results');
    
    if (!subjectToSearch) return alert("Please enter a subject");
    resultsDiv.innerHTML = "Searching...";

    try {
        const snapshot = await db.ref("users").orderByChild("role").equalTo("teacher").once("value");
        resultsDiv.innerHTML = ""; 

        if (snapshot.exists()) {
            let found = false;
            snapshot.forEach((childSnapshot) => {
                const teacher = childSnapshot.val();
                if (teacher.subject.toLowerCase().includes(subjectToSearch)) {
                    found = true;
                    resultsDiv.innerHTML += `
                        <div style="border:1px solid #ddd; padding:15px; margin:10px 0; border-radius:8px; background:#f9f9f9;">
                            <p><strong>👨‍🏫 Name:</strong> ${teacher.name}</p>
                            <p><strong>📚 Subject:</strong> ${teacher.subject}</p>
                            <button onclick="alert('Slot booking logic goes here!')">View Available Slots</button>
                        </div>`;
                }
            });
            if (!found) resultsDiv.innerHTML = "No teachers found for '" + subjectToSearch + "'.";
        } else {
            resultsDiv.innerHTML = "No teachers found in the database.";
        }
    } catch (e) { resultsDiv.innerHTML = "Error: " + e.message; }
}


