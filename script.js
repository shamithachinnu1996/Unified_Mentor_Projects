// 1. Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOq89fz8lkFX8cHl4k-IYETojacnYejkQ",
    authDomain: "soil-farming-agent-d0deb.firebaseapp.com",
    databaseURL: "https://soil-farming-agent-d0deb-default-rtdb.firebaseio.com",
    projectId: "soil-farming-agent-d0deb",
    storageBucket: "soil-farming-agent-d0deb.firebasestorage.app",
    messagingSenderId: "75467540488",
    appId: "1:75467540488:web:370412741e7d05cc5529bd"
};

// 2. Initialize
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// 3. Functions
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('user-dashboard').style.display = 'block';
        loadUserData(); 
    } catch (e) { alert("Login Error: " + e.message); }
}

function loadUserData() {
    // 1. Fetch Soils (Red, Sandy, Silt)
    db.ref("soils").on("value", (snapshot) => {
        const soilList = document.getElementById('soil-list');
        let html = "<h3>📋 Soil Information</h3>";
        
        if (!snapshot.exists()) {
            html += "<p>No soil data found. Admin needs to post details.</p>";
        } else {
            snapshot.forEach((child) => {
                const data = child.val();
                html += `
                    <div class="data-item">
                        <h4>🟤 ${data.name}</h4>
                        <p><strong>Traits:</strong> ${data.traits}</p>
                        <p>🌾 <strong>Crops:</strong> ${data.crops}</p>
                    </div>`;
            });
        }
        soilList.innerHTML = html;
    });

    // 2. Fetch Distributors (GGK, MRA, Aadri)
    db.ref("distributors").on("value", (snapshot) => {
        const distList = document.getElementById('dist-list');
        let html = "<h3>🚚 Available Distributors</h3>";
        
        if (!snapshot.exists()) {
            html += "<p>No distributor data found.</p>";
        } else {
            snapshot.forEach((child) => {
                const data = child.val();
                html += `
                    <div class="data-item" style="border-left: 5px solid #2196F3;">
                        <h4>🏢 ${data.name}</h4>
                        <p>📍 ${data.contact}</p>
                    </div>`;
            });
        }
        distList.innerHTML = html;
    });
}

// 🔎 NEW: Search Function for Users
function searchSoils() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('soil-card');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h4')[0].innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

// 4. Data Seeding (Use this to populate the app)
async function seedData() {
    const soils = [
        { name: "Red Soils", traits: "Iron rich, porous, low moisture retention.", crops: "Groundnuts, Millets" },
        { name: "Sandy Soils", traits: "Large particles, fast drainage, low nutrients.", crops: "Watermelons, Coconuts" },
        { name: "Silt Soils", traits: "Fine particles, fertile, holds moisture well.", crops: "Wheat, Rice, Jute" }
    ];

    const dists = [
        { name: "GGK Soils Group", contact: "Highway Junction | Ph: 9876543210" },
        { name: "MRA Soils", contact: "Market Road, Sec 2 | Ph: 8877665544" },
        { name: "Aadri Soils Mart", contact: "Green Plaza, Shop 10 | Ph: 7766554433" }
    ];

    try {
        await db.ref("soils").set(null); 
        await db.ref("distributors").set(null);

        for (let s of soils) await db.ref("soils").push(s);
        for (let d of dists) await db.ref("distributors").push(d);
        
        alert("✅ Database Ready for Ravi, Rajeev, and Vimala!");
    } catch (e) { alert("Upload Failed: " + e.message); }
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Optional: save user info in database
        await db.ref("users/" + user.uid).set({
            email: email,
            role: "farmer",
            createdAt: new Date().toISOString()
        });

        alert("✅ Registration successful! You can now login.");
    } catch (error) {
        alert("Registration Error: " + error.message);
    }
}


function logout() { auth.signOut().then(() => location.reload()); }


// This function will physically put the data into your Firebase URL
async function pushInitialData() {
    const soils = [
        { name: "Red Soils", traits: "Rich in Iron, porous structure, low moisture retention.", crops: "Groundnuts, Millets, Pulses" },
        { name: "Sandy Soils", traits: "Large particles, high drainage, low nutrient levels.", crops: "Watermelons, Coconuts, Cactus" },
        { name: "Silt Soils", traits: "Fine particles, very fertile, holds moisture perfectly.", crops: "Wheat, Rice, Jute, Vegetables" }
    ];

    const dists = [
        { name: "GGK Soils Group (Ravi's Region)", contact: "Highway Junction, Plot 4 | Ph: 9876543210" },
        { name: "MRA Soils (Rajeev's Region)", contact: "Market Road, Sec 2 | Ph: 8877665544" },
        { name: "Aadri Soils Mart (Vimala's Region)", contact: "Green Plaza, Shop 10 | Ph: 7766554433" }
    ];

    // Upload to Firebase
    for (let s of soils) await db.ref("soils").push(s);
    for (let d of dists) await db.ref("distributors").push(d);

    alert("✅ Data successfully uploaded to your Firebase database!");
}
pushInitialData()
