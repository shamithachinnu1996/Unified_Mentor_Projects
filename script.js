
let screen = document.getElementById("screen");

// Click the button value to the calculator is displayed//
    function buttonclick(value) 
    {
        screen.value += value;
    }

    // clear the calculator//
    function clearDisplay() 
    {
        screen.value = "";
    }

    // The numbers and result will be displayed//
    function calculate() 
    {
        try 
        {
            screen.value = eval(screen.value);
        } catch 
        {
            screen.value = "Error";
        }
    }
