window.onload = function () { // Function to execute when the page loads
    const last4 = localStorage.getItem("last4") || "XXXX"; // Retrieve last 4 digits from local storage
    document.getElementById("cardDigits").textContent = `**** **** **** ${last4}`; // Display last 4 digits on the page
    localStorage.removeItem("last4"); // Clear storage after retrieval
};