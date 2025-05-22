function myFunction() {  // Function to toggle the display of the menu
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") { // Check if the menu is currently displayed
        x.style.display = "none"; // Hide the menu
    } else {
        x.style.display = "block"; // Show the menu
    }
}