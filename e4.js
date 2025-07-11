document.addEventListener('DOMContentLoaded', () => { // Waits for the DOM to be fully loaded before executing the callback function
    const forms = document.querySelectorAll('form'); // Selects all <form> elements on the page
    if (!forms.length) { // Checks if no forms were found
        console.warn('No forms found on the page'); // Logs a warning to the console if no forms exist
        return; // Exits the function early if no forms are found
    }

    const persondata = { // Defines an object containing default personal data for autofilling forms
        firstname: "John", // First name field
        lastname: "Doe", // Last name field
        name: "John Doe", // Full name field
        username: "johndoe", // Username field
        email: "john.doe@example.com", // Email field
        tel: "+1-202-555-0143", // Telephone number field
        phone: "+1-202-555-0143", // Alias for telephone number
        mobile: "+1-202-555-0143", // Alias for mobile number
        dob: "1990-01-01", // Date of birth field
        address: "1234 Elm Street", // Primary address field
        address1: "1234 Elm Street", // Alias for primary address
        address2: "Apt 5B", // Secondary address field (e.g., apartment number)
        state: "California", // State field
        country: "US", // Country field
        city: "Los Angeles", // City field
        post: "90210", // ZIP code field
        postcode: "90210", // Alias for ZIP code
        area: "310", // Area code field (e.g., Los Angeles)
        jobtitle: "Software Developer", // Job title field
        website: "https://example.com", // Website URL field
        company: "ACME Inc.", // Company name field
        gender: "male", // Gender field
        newsletter: true, // Newsletter subscription checkbox
        terms: true, // Terms and conditions checkbox
        agree: true, // Agreement checkbox
        remember: true, // Remember me checkbox
        CheckboxData: true // Generic checkbox field
    };

    function getFormId(form) { // Defines a function to generate a unique identifier for a form
        if (form.id) return form.id; // Returns the form's ID attribute if it exists
        if (form.getAttribute('name')) return form.getAttribute('name'); // Returns the form's name attribute if it exists
        if (form.getAttribute('action')) { // Checks if the form has an action attribute
            const action = form.getAttribute('action'); // Gets the action attribute value
            return action.split('/').pop().split('.').shift() || `form_${Array.from(forms).length}`; // Extracts the last part of the action URL or uses a fallback
        }
        return `form_${Array.from(forms).indexOf(form)}`; // Returns a fallback ID based on the form's index
    }

    function findMatchingKey(field) { // Defines a function to find a matching key in persondata for a form field
        const name = field.name ? field.name.toLowerCase() : ''; // Gets the field's name attribute (lowercase) or empty string if none
        const id = field.id ? field.id.toLowerCase() : ''; // Gets the field's ID attribute (lowercase) or empty string if none
        const keys = Object.keys(persondata); // Gets all keys from the persondata object

        // Check exact matches
        if (name && persondata[name] !== undefined) return name; // Returns the name if it exactly matches a persondata key
        if (id && persondata[id] !== undefined) return id; // Returns the ID if it exactly matches a persondata key

        // Check partial matches with common checkbox synonyms
        const checkboxSynonyms = ['subscribe', 'optin', 'check', 'accept']; // Common variations for checkbox fields
        for (const key of keys) { // Iterates through persondata keys
            if ((name && (name.includes(key) || checkboxSynonyms.some(syn => name.includes(syn) && key.includes('newsletter')))) ||
                (id && (id.includes(key) || checkboxSynonyms.some(syn => id.includes(syn) && key.includes('newsletter'))))) { // Checks for partial matches or synonyms
                console.debug(`Matched field ${name || id} to key ${key}`); // Logs successful matches for debugging
                return key; // Returns the matching key
            }
        }

        // Log unmatched checkboxes for debugging
        if (field.type === 'checkbox' && (name || id)) {
            console.warn(`No matching key found for checkbox with name=${name}, id=${id}`); // Logs unmatched checkboxes
        }
        return null; // Returns null if no matching key is found
    }

    function autofillForm(form) { // Defines a function to autofill a form with persondata values
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select'); // Selects text, email, tel, url, number, date inputs, and selects
        const checkboxes = form.querySelectorAll('input[type="checkbox"]'); // Selects all checkbox inputs
        const usedFields = new Set(); // Creates a Set to track used persondata keys

        // Handle text-based inputs, selects, and other input types
        inputs.forEach(input => { // Iterates through inputs and selects
            const key = findMatchingKey(input); // Finds a matching persondata key for the input or select
            if (key && !usedFields.has(key)) { // Checks if a key was found and hasn't been used
                input.value = persondata[key]; // Sets the input's or select's value to the corresponding persondata value
                usedFields.add(key); // Marks the key as used
            }
        });

        // Handle checkboxes
        checkboxes.forEach(checkbox => { // Iterates through checkboxes
            const key = findMatchingKey(checkbox); // Finds a matching persondata key for the checkbox
            if (key && !usedFields.has(key)) { // Checks if a key was found and hasn't been used
                checkbox.checked = !!persondata[key]; // Converts value to boolean to ensure proper checked state
                console.debug(`Set checkbox ${checkbox.name || checkbox.id} to ${checkbox.checked} using key ${key}`); // Logs checkbox state
                usedFields.add(key); // Marks the key as used
            }
        });

        // Log unused fields for debugging
        const unusedFields = Object.keys(persondata).filter(key => !usedFields.has(key)); // Finds persondata keys that weren't used
        if (unusedFields.length > 0) { // Checks if there are any unused fields
            console.log(`Unused fields for form ${getFormId(form)}:`, unusedFields); // Logs unused fields for the form
        }
    }

    function saveToLocalStorage(form) { // Defines a function to save form data to localStorage as individual key-value pairs
        const formId = getFormId(form); // Gets the form's unique ID

        form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select').forEach(el => { // Iterates through text, email, tel, url, number, date inputs, and selects
            if (el.name || el.id) { // Checks if the element has a name or ID
                const key = `${formId}_${el.name || el.id}`; // Creates a form-specific key to avoid conflicts across forms
                localStorage.setItem(key, el.value); // Saves the value as an individual key-value pair
            }
        });

        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => { // Iterates through checkboxes
            if (checkbox.name || checkbox.id) { // Checks if the checkbox has a name or ID
                const key = `${formId}_${checkbox.name || checkbox.id}`; // Creates a form-specific key
                localStorage.setItem(key, checkbox.checked.toString()); // Saves the checked state as a string
                console.debug(`Saved checkbox ${checkbox.name || checkbox.id} as ${checkbox.checked} to ${key}`); // Logs save action
            }
        });
    }

    function loadFromLocalStorage(form) { // Defines a function to load form data from localStorage using individual key-value pairs
        const formId = getFormId(form); // Gets the form's unique ID

        form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select').forEach(el => { // Iterates through text, email, tel, url, number, date inputs, and selects
            const key = `${formId}_${el.name || el.id}`; // Constructs the form-specific key
            const savedValue = localStorage.getItem(key); // Retrieves the saved value
            if (savedValue !== null) { // Checks if a value exists
                el.value = savedValue; // Sets the input's value
            }
        });

        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => { // Iterates through checkboxes
            const key = `${formId}_${checkbox.name || checkbox.id}`; // Constructs the form-specific key
            const savedValue = localStorage.getItem(key); // Retrieves the saved value
            if (savedValue !== null) { // Checks if a value exists
                checkbox.checked = savedValue === 'true'; // Sets the checked state (converting string to boolean)
                console.debug(`Loaded checkbox ${checkbox.name || checkbox.id} as ${checkbox.checked} from ${key}`); // Logs load action
            }
        });
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
            const formData = {}; // Creates an object to store form data for logging

            new FormData(form).forEach((value, key) => { // Iterates through FormData entries
                formData[key] = value; // Stores each key-value pair for logging
            });

            saveToLocalStorage(form); // Saves the form data to localStorage as individual key-value pairs
            console.log(`Form data for ${formId}:`, formData); // Logs the form data to the console
            alert(`Form ${formId} submitted! Check console for data object.`); // Shows an alert on submission
        });
    });
});