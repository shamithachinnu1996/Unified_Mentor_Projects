# Basic Calculator Application

This is a simple **Calculator Web Application** built using **HTML**, **CSS**, and **JavaScript** in **Visual Studio Code**.  
It performs basic arithmetic operations such as **addition**, **subtraction**, **multiplication**, and **division**, with a clean and easy-to-use interface.

---

## Project Structure

```
calculator/
│
├── index.html       # Main HTML file
├── style.css        # CSS styling for layout and design
└── script.js        # JavaScript functionality
```

---

## Technologies Used

- **HTML5** – Structure and layout  
- **CSS3** – Styling and visual design  
- **JavaScript (ES6)** – Calculator logic and interactivity  

---

## Features

- Perform basic arithmetic operations: `+`, `-`, `*`, `/`
- Real-time display updates as you click buttons
- Clear the display with a single button
- Handles invalid input using simple error handling
- Simple, minimal, and responsive design

---

## How to Run the Project

1. Open **Visual Studio Code**
2. Create a new folder and add the following files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Copy the code below into each file.
4. Open `index.html` in your browser  
   (If you have the **Live Server** extension installed, right-click → “Open with Live Server”)

---

## Complete Source Code

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Calculator</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

    <div class="main-box">
        <div class="calc">
            <input type="text" id="screen" placeholder="0" readonly>
            
            <div class="buttons">
                <button class="btn" onclick="buttonclick('7')">7</button>
                <button class="btn" onclick="buttonclick('8')">8</button>
                <button class="btn" onclick="buttonclick('9')">9</button>
                <button class="btn" onclick="buttonclick('/')">/</button>

                <button class="btn" onclick="buttonclick('4')">4</button>
                <button class="btn" onclick="buttonclick('5')">5</button>
                <button class="btn" onclick="buttonclick('6')">6</button>
                <button class="btn" onclick="buttonclick('*')">*</button>

                <button class="btn" onclick="buttonclick('1')">1</button>
                <button class="btn" onclick="buttonclick('2')">2</button>
                <button class="btn" onclick="buttonclick('3')">3</button>
                <button class="btn" onclick="buttonclick('-')">-</button>

                <button class="btn" onclick="buttonclick('0')">0</button>
                <button class="btn" onclick="buttonclick('.')">.</button>
                <button class="btn" onclick="calculate()">=</button>
                <button class="btn" onclick="buttonclick('+')">+</button>

                <button class="btn" onclick="clearDisplay()">C</button>
            </div>
        </div>
    </div>

</body>
</html>
```

---

### `style.css`

```css
/* Main calculator box styling */
.calc {
    width: 400px;
    height: 450px;
    background-color: rgb(188, 221, 241);
    margin: 80px auto;
    border: 1px solid rgb(0, 75, 122);
    border-radius: 5%;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Screen styling */
#screen {
    width: 85%;
    height: 45px;
    margin-left: 20px;
    margin-top: 25px;
    background-color: rgb(228, 245, 208);
    border: 1px solid rgb(175, 238, 240);
    pointer-events: none;
    font-size: 22px;
    padding: 5px;
    text-align: right;
    border-radius: 8px;
}

/* Button styling */
.btn {
    width: 60px;
    height: 45px;
    margin: 12px 18px;
    background-color: rgb(247, 233, 246);
    font-size: 20px;
    border: none;
    border-radius: 12%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.btn:hover {
    background-color: rgb(230, 210, 230);
    transform: scale(1.05);
}

/* Align buttons */
.buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
```

---

### `script.js`

```javascript
// Get the calculator display element
let screen = document.getElementById("screen");

// Function to display the clicked button value
function buttonclick(value) {
    screen.value += value;
}

// Function to clear the calculator display
function clearDisplay() {
    screen.value = "";
}

// Function to calculate the entered expression
function calculate() {
    try {
        screen.value = eval(screen.value);
    } catch {
        screen.value = "Error";
    }
}
```

---

## Example Usage

1. Click on the buttons to enter numbers and operators.  
   Example: `7 + 3`
2. Click on `=` to see the result → `10`
3. Click `C` to clear the display.

---

## Author

**Shamitha M**  
*shamithachinnu1996@gmail.com*  
*GitHub:* 

---
