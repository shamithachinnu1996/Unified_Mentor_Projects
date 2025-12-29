// firebase config//
      const firebaseConfig = {

    apiKey: "AIzaSyDqjJH0iNP1-PKTq4HMJAZ5g_Mrio6Gg9I",

    authDomain: "share-govt-document-70e15.firebaseapp.com",

    databaseURL: "https://share-govt-document-70e15-default-rtdb.firebaseio.com",


    projectId: "share-govt-document-70e15",

    storageBucket: "share-govt-document-70e15.firebasestorage.app",

    messagingSenderId: "137897199606",

    appId: "1:137897199606:web:a57c2da62a644cab7469d7"

  };



firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// const db = firebase.database();
const db = firebase.database();
const storage = firebase.storage();

// 1. REGISTER / LOGIN (User: Mini)
async function handleAuth(type) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const aadhaar = document.getElementById('aadhaar').value;

    try {
        if (type === 'register') {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            await db.ref('users/' + res.user.uid).set({
                email, aadhaar, 
                joined: "Dec 23, 2025",
                role: "Citizen"
            });
            alert("Registration Successful for " + email);
        } else {
            await auth.signInWithEmailAndPassword(email, password);
        }
    } catch (err) { alert(err.message); }
}

// 2. PROFILE & AUTH MONITOR
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'block';
        db.ref('users/' + user.uid).on('value', snap => {
            const d = snap.val();
            document.getElementById('user-info').innerHTML = `
                <p><strong>Email:</strong> ${d.email}</p>
                <p><strong>Aadhaar:</strong> ${d.aadhaar}</p>
                <p><strong>Status:</strong> Verified ✅</p>
            `;
        });
        loadDocs();
    } else {
        document.getElementById('auth-view').style.display = 'block';
        document.getElementById('dashboard-view').style.display = 'none';
    }
});

// 3. SECURE UPLOAD
async function uploadDoc() {
    const file = document.getElementById('file-input').files[0];
    const name = document.getElementById('doc-name').value;
    const cat = document.getElementById('doc-category').value;
    const user = auth.currentUser;

    if (!file || !name) return alert("Fill all fields");

    try {
        const fileRef = storage.ref(`vault/${user.uid}/${file.name}`);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();

        await db.ref('documents').push({
            ownerId: user.uid,
            name, category: cat,
            url, date: "Dec 23, 2025"
        });
        alert("Document Secured!");
        loadDocs();
    } catch (e) { alert(e.message); }
}

// 4. READ / DELETE / SHARE
function loadDocs() {
    const user = auth.currentUser;
    db.ref('documents').orderByChild('ownerId').equalTo(user.uid).on('value', snap => {
        let html = '';
        snap.forEach(child => {
            const d = child.val();
            html += `
                <div class="doc-item">
                    <span><strong>${d.name}</strong> (${d.category})</span>
                    <div class="actions">
                        <button onclick="window.open('${d.url}')">View</button>
                        <button onclick="shareDoc('${child.key}')" class="secondary">Share</button>
                        <button onclick="deleteDoc('${child.key}')" class="danger">Delete</button>
                    </div>
                </div>`;
        });
        document.getElementById('doc-list').innerHTML = html || "No docs in vault.";
    });
}

async function deleteDoc(id) {
    if(confirm("Confirm Delete?")) await db.ref('documents/' + id).remove();
}

function shareDoc(id) {
    const email = prompt("Enter family member's email to share:");
    if (email) {
        db.ref('documents/' + id + '/sharedWith').push(email.replace('.', '_'));
        alert("Document Shared with " + email);
    }
}

function logout() { auth.signOut(); }