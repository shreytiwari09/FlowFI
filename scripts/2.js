// Function to enable/disable form fields
function enableEditing() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });
}

// Function to handle form submission
function saveProfile(event) {
    event.preventDefault(); // Prevent the default form submission
    const fullName = document.getElementById('fullName').value;
    const gender = document.getElementById('gender').value;
    const nickname = document.getElementById('nickname').value;
    const language = document.getElementById('language').value;
    const country = document.getElementById('country').value;
    const timezone = document.getElementById('timezone').value;

    // Simple validation check
    if (fullName && gender && nickname && language && country && timezone) {
        alert('Profile updated successfully!');
    } else {
        alert('Please fill out all the fields.');
    }
}

// Function to add additional email input (for future implementation)
function addEmail() {
    alert('Add Email functionality to be implemented.');
}

// Attach event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
});
