document.addEventListener('DOMContentLoaded', () => { // Waits for the DOM to be fully loaded before executing the callback function
    const forms = document.querySelectorAll('form'); // Selects all <form> elements on the page
    if (!forms.length) { // Checks if no forms were found
        console.warn('No forms found on the page'); // Logs a warning to the console if no forms exist
        return; // Exits the function early if no forms are found
    }

    const persondata = { // Defines an object containing default personal data for autofilling forms
        firstname: "John", // First name field
        lastname: "Doe", // Last name field
        fullname: "John Doe", // Full name field
        name: "John Doe", // Alternative name field
        username: "johndoe", // Username field
        email: "john.doe@example.com", // Email field
        phone: "+1-202-555-0143", // Phone number field
        tel: "+1-202-555-0143", // Telephone number field (alias for phone)
        mobile: "+1-202-555-0143", // Mobile number field (alias for phone)
        dob: "1990-01-01", // Date of birth field
        address: "1234 Elm Street", // Primary address field
        address1: "1234 Elm Street", // Alternative address field
        address2: "Apt 5B", // Secondary address field (e.g., apartment number)
        city: "Los Angeles", // City field
        state: "CA", // State field
        zip: "90210", // ZIP code field
        postcode: "90210", // Alternative ZIP code field
        post: "90210", // Another alias for ZIP code
        country: "US", // Country field
        company: "ACME Inc.", // Company name field
        jobtitle: "Software Developer", // Job title field
        website: "https://example.com", // Website URL field
        gender: "male", // Gender field
        newsletter: true, // Newsletter subscription checkbox (boolean)
        terms: true, // Terms and conditions agreement checkbox (boolean)
        agree: true, // Alternative agreement checkbox (boolean)
        remember: true // Remember me checkbox (boolean)
    };

    function getFormId(form) { // Defines a function to generate a unique identifier for a form
        if (form.id) return form.id; // Returns the form's ID attribute if it exists
        if (form.getAttribute('name')) return form.getAttribute('name'); // Returns the form's name attribute if it exists
        if (form.getAttribute('action')) { // Checks if the form has an action attribute
            const action = form.getAttribute('action'); // Gets the action attribute value
            return action.split('/').pop().split('.').shift() || `form_${forms.length}`; // Extracts the last part of the action URL (before extension) or uses a fallback
        }
        return `form_${Array.from(forms).indexOf(form)}`; // Returns a fallback ID based on the form's index in the forms NodeList
    }

    function findMatchingKey(field) { // Defines a function to find a matching key in persondata for a form field
        const name = field.name ? field.name.toLowerCase() : ''; // Gets the field's name attribute (lowercase) or empty string if none
        const id = field.id ? field.id.toLowerCase() : ''; // Gets the field's ID attribute (lowercase) or empty string if none
        const keys = Object.keys(persondata); // Gets all keys from the persondata object

        // Check exact matches
        if (name && persondata[name] !== undefined) return name; // Returns the name if it exactly matches a persondata key
        if (id && persondata[id] !== undefined) return id; // Returns the ID if it exactly matches a persondata key

        // Check partial matches
        for (const key of keys) { // Iterates through persondata keys
            if ((name && name.includes(key)) || (id && id.includes(key))) { // Checks if the key is a substring of the name or ID
                return key; // Returns the matching key
            }
        }

        return null; // Returns null if no matching key is found
    }

    function autofillForm(form) { // Defines a function to autofill a form with persondata values
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"], input[type="url"], input[type="password"], input[type="date"], textarea, select'); // Selects all text-based inputs, textareas, and selects
        const checkboxes = form.querySelectorAll('input[type="checkbox"]'); // Selects all checkbox inputs
        const radios = form.querySelectorAll('input[type="radio"]'); // Selects all radio inputs
        const usedFields = new Set(); // Creates a Set to track used persondata keys

        // Handle text-based inputs, date inputs, and selects
        inputs.forEach(input => { // Iterates through text-based inputs, textareas, and selects
            const key = findMatchingKey(input); // Finds a matching persondata key for the input
            if (key && !usedFields.has(key)) { // Checks if a key was found and hasn't been used
                input.value = persondata[key]; // Sets the input's value to the corresponding persondata value
                usedFields.add(key); // Marks the key as used
            }
        });

        // Handle checkboxes
        checkboxes.forEach(checkbox => { // Iterates through checkboxes
            const key = findMatchingKey(checkbox); // Finds a matching persondata key for the checkbox
            if (key && !usedFields.has(key)) { // Checks if a key was found and hasn't been used
                checkbox.checked = persondata[key]; // Sets the checkbox's checked state to the persondata value
                usedFields.add(key); // Marks the key as used
            }
        });

        // Handle radio buttons (specifically for gender)
        radios.forEach(radio => { // Iterates through radio buttons
            const key = findMatchingKey(radio); // Finds a matching persondata key for the radio button
            if (key && !usedFields.has(key) && radio.value === persondata[key]) { // Checks if a key was found, hasn't been used, and the radio value matches
                radio.checked = true; // Sets the radio button's checked state to true
                usedFields.add(key); // Marks the key as used
            }
        });

        // Log unused fields for debugging
        const unusedFields = Object.keys(persondata).filter(key => !usedFields.has(key)); // Finds persondata keys that weren't used
        if (unusedFields.length > 0) { // Checks if there are any unused fields
            console.log(`Unused fields for form ${getFormId(form)}:`, unusedFields); // Logs unused fields for the form
        }
    }

    function saveToLocalStorage(form) { // Defines a function to save form data to localStorage
        const formData = {}; // Creates an object to store form data
        const formId = getFormId(form); // Gets the form's unique ID

        form.querySelectorAll('input, textarea, select').forEach(el => { // Iterates through all inputs, textareas, and selects
            if (el.name || el.id) { // Checks if the element has a name or ID
                const key = el.name || el.id; // Uses the name or ID as the key
                if (el.type === 'checkbox' || el.type === 'radio') { // Checks if the element is a checkbox or radio
                    formData[key] = el.checked; // Stores the checked state
                } else {
                    formData[key] = el.value; // Stores the value
                }
            }
        });

        localStorage.setItem(`formData_${formId}`, JSON.stringify(formData)); // Saves the form data to localStorage as a JSON string
    }

    function loadFromLocalStorage(form) { // Defines a function to load form data from localStorage
        const formId = getFormId(form); // Gets the form's unique ID
        const savedData = localStorage.getItem(`formData_${formId}`); // Retrieves saved data from localStorage
        if (!savedData) return; // Exits if no saved data is found

        try { // Handles potential JSON parsing errors
            const formData = JSON.parse(savedData); // Parses the saved JSON data
            form.querySelectorAll('input, textarea, select').forEach(el => { // Iterates through all inputs, textareas, and selects
                const key = el.name || el.id; // Uses the name or ID as the key
                if (formData[key] !== undefined) { // Checks if the key exists in the saved data
                    if (el.type === 'checkbox' || el.type === 'radio') { // Checks if the element is a checkbox or radio
                        el.checked = formData[key]; // Sets the checked state
                    } else {
                        el.value = formData[key]; // Sets the value
                    }
                }
            });
        } catch (e) { // Catches any parsing errors
            console.error('Error loading saved data:', e); // Logs the error to the console
        }
    }

    forms.forEach(form => { // Iterates through all forms on the page
        loadFromLocalStorage(form); // Loads saved data from localStorage for the form
        autofillForm(form); // Autofills the form with persondata values

        let saveTimeout; // Declares a variable to store the timeout ID
        form.addEventListener('input', () => { // Adds an input event listener to the form
            clearTimeout(saveTimeout); // Clears any existing timeout
            saveTimeout = setTimeout(() => saveToLocalStorage(form), 500); // Sets a 500ms debounce to save form data
        });

        form.addEventListener('submit', (e) => { // Adds a submit event listener to the form
            e.preventDefault(); // Prevents the default form submission
            const formId = getFormId(form); // Gets the form's unique ID
            const formData = {}; // Creates an object to store form data

            new FormData(form).forEach((value, key) => { // Iterates through FormData entries
                formData[key] = value; // Stores each key-value pair
            });

            saveToLocalStorage(form); // Saves the form data to localStorage
            console.log(`Form data for ${formId}:`, formData); // Logs the form data to the console
            alert(`Form ${formId} submitted! Check console for data object.`); // Shows an alert on submission
        });
    });
});