// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select necessary HTML elements
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Check if elements are present before adding event listeners
    if (loginForm && errorMessage && successMessage && usernameInput && passwordInput) {
        // Debounce the form submission to improve user experience
        const debounceSubmit = debounce(handleFormSubmit, 500);

        // Add submit event listener to the login form
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            debounceSubmit();
        });

        // Add input event listeners for real-time validation feedback
        usernameInput.addEventListener('input', debounce(validateUsername, 300));
        passwordInput.addEventListener('input', debounce(validatePassword, 300));
    } else {
        // Log an error message if one or more elements are not found
        console.error('One or more elements not found.');
    }

    // Simulate asynchronous credential validation (replace with actual async logic)
    async function validateCredentials(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Replace this with your actual validation logic
                if (username === 'demo' && password === 'password') {
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000); // Simulating a delay for asynchronous validation
        });
    }

    // Function to handle form submission
    async function handleFormSubmit() {
        // Validate both username and password
        const isUsernameValid = validateUsername(usernameInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);

        if (isUsernameValid && isPasswordValid) {
            try {
                // Perform asynchronous credential validation
                await validateCredentials(usernameInput.value, passwordInput.value);

                // Clear any previous error messages
                errorMessage.textContent = '';

                // Display success message
                displaySuccessMessage('Login successful!');

                // You can redirect to another page or perform additional actions here

            } catch (error) {
                // Display an error message if validation fails
                displayErrorMessage('Invalid username or password. Please try again.');
            }
        } else {
            // Display an error message if form validation fails
            displayErrorMessage('Invalid username or password. Please check your input.');
        }
    }

    // Function to validate the username
    function validateUsername(username) {
        // Add your username validation logic here
        // For example, check if it's not empty
        return username.trim() !== '';
    }

    // Function to validate the password
    function validatePassword(password) {
        // Add your password validation logic here
        // For example, check if it's at least 8 characters long
        return password.length >= 8;
    }

    // Display error message
    function displayErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74c3c'; // Set error message color
        successMessage.textContent = ''; // Clear any previous success message
    }

    // Display success message
    function displaySuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.color = '#27ae60'; // Set success message color
        errorMessage.textContent = ''; // Clear any previous error message
    }

    // Debounce function for smoother user experience
    function debounce(func, delay) {
        // Declare a variable to store the timer ID
        let timeout;

        // Return a new function that will be executed after a specified delay
        return function () {
            // Store the context (this) and arguments of the function call
            const context = this;
            const args = arguments;

            // Clear any existing timer to reset the delay
            clearTimeout(timeout);

            // Set a new timer using setTimeout
            timeout = setTimeout(() => {
                // When the timer expires, execute the original function with the stored context and arguments
                func.apply(context, args);
            }, delay);
        };
    }


    // Additional interactivity if needed
});
