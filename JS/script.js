// Month and year dropdown script
// Months
const selectMonth = document.getElementById("expmonth"); // Element to select the month
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

months.forEach((month, index) => { // Loop through months
    let option = document.createElement("option"); // Option element
    option.value = index + 1; // Month value (1-12)
    option.textContent = month; // Month text
    selectMonth.appendChild(option); // Appended to select element
});

// Function to dynamically populate years
const selectYear = document.getElementById("expyear"); // Element to select the year
const currentYear = new Date().getFullYear(); // Current year
const endYear = currentYear + 10; // End year (10 years from now)

for (let year = currentYear; year <= endYear; year++) { // Loop through years
    let option = document.createElement("option"); // Option element
    option.value = year; // Year value
    option.textContent = year; // Year text
    selectYear.appendChild(option); // Appended to select element
}

// Function to validate Mastercard number
const cardInput = document.getElementById("ccnum"); // Input field for card number
const mastercardPattern = /^(5[1-5][0-9]{14})$/; // Pattern for Mastercard (16 digits, starts with 51-55)

cardInput.addEventListener("input", () => { // Event listener for input
    const cardNumber = cardInput.value.replace(/\s/g, ""); // To remove spaces
    if (cardNumber.length === 16) { // Check if length is 16
        if (!mastercardPattern.test(cardNumber)) { // Validate against pattern
            cardInput.style.border = "2px solid red";
            alert("Invalid Mastercard number! Ensure it starts with 51–55 and has 16 digits.");
            // Alert for invalid number
        }
    }
});

// Function to validate expiration date
function validateExpiration() {
    const expMonth = parseInt(document.getElementById("expmonth").value, 10); // Get selected month
    const expYear = parseInt(document.getElementById("expyear").value, 10); // Get selected year
    const today = new Date(); // Current date
    const currentMonth = today.getMonth() + 1; // Get current month (0-11, so +1)
    const currentYear = today.getFullYear(); // Get current year

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) { // Check if expired
        alert("Invalid expiration date! Card must not be expired."); // Alert for expired date
        return false;
    }
    return true;
}

// Function to validate CVV
const cvvInput = document.getElementById("cvv"); // Input field for CVV
const cvvPattern = /^[0-9]{3,4}$/; // Pattern for CVV (3 or 4 digits)

cvvInput.addEventListener("input", () => { // Event listener for input
    const cvvValue = cvvInput.value.replace(/\s/g, ""); // To remove spaces

    if (cvvValue.length >= 3) { // Check if length is 3 or more
        if (!cvvPattern.test(cvvValue)) { // Validate against pattern
            alert("Invalid CVV! Must be 3 or 4 digits."); // Alert for invalid CVV
        }
    }
});

// Submit payment details after validation
document.querySelector(".btn").addEventListener("click", function (event) { // Event listener for button click
    event.preventDefault(); // Prevent default form submission

    const cardNumber = cardInput.value.replace(/\s/g, ""); // Get card number
    const expMonth = document.getElementById("expmonth").value; // Get selected month
    const expYear = document.getElementById("expyear").value; // Get selected year
    const cvvCode = document.getElementById("cvv").value; // Get CVV code

    if (!mastercardPattern.test(cardNumber) || !cvvPattern.test(cvvCode) || !validateExpiration()) { // Validate all inputs
        alert("Please correct your payment details.");
        return;
    }

    const requestData = { // Data to be sent to the server
        master_card: cardNumber,
        exp_month: parseInt(expMonth, 10),
        exp_year: parseInt(expYear, 10),
        cvv_code: cvvCode
    };

    fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", { // Fetch API to send data
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // Content type
        body: JSON.stringify(requestData), // Convert data to JSON
    })

        .then((res) => { // Handle response
            if (!res.ok) { // Check if response is not OK
                throw new Error("Server error: invalid data submitted."); // Throw error
            }
            return res.json(); // Parse JSON response
        })
        .then(() => { // Handle success
            const last4 = cardNumber.slice(-4); // Get last 4 digits of card number
            localStorage.setItem("last4", last4); // Store last four digits securely
            window.location.href = "success.html"; // Redirect to success page
        })

        .catch((err) => { // Handle errors
            messageDiv.textContent = err.message; // Display error message
        });
});
