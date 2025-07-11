document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    if (!forms.length) { // reuturns if no form 
        console.warn('No forms found on the page');
        return;
    }

    //object  Sample data for autofill
    const persondata = {
    firstname: "John",
    firstName: "John",
    first_name: "John",
    "first-name": "John",
    fname: "John",
    givenName: "John",
    forename: "John",
    
    lastname: "Doe",
    lastName: "Doe",
    last_name: "Doe",
    "last-name": "Doe",
    lname: "Doe",
    surname: "Doe",
    familyName: "Doe",
    
    middlename: "Michael",
    middleName: "Michael",
    middle_name: "Michael",
    "middle-name": "Michael",
    mname: "Michael",
    
    fullname: "John Michael Doe",
    fullName: "John Michael Doe",
    full_name: "John Michael Doe",
    "full-name": "John Michael Doe",
    name: "John Michael Doe",
    displayName: "John Michael Doe",
    completeName: "John Michael Doe",
    
    // Username variations
    username: "johndoe123",
    userName: "johndoe123",
    user_name: "johndoe123",
    "user-name": "johndoe123",
    login: "johndoe123",
    userid: "johndoe123",
    user: "johndoe123",
    handle: "johndoe123",
    
    // Email variations
    email: "john.doe@example.com",
    emailAddress: "john.doe@example.com",
    email_address: "john.doe@example.com",
    "email-address": "john.doe@example.com",
    mail: "john.doe@example.com",
    e_mail: "john.doe@example.com",
    emailid: "john.doe@example.com",
    
    // Phone variations
    phone: "+1-555-123-4567",
    telephone: "+1-555-123-4567",
    tel: "+1-555-123-4567",
    mobile: "+1-555-123-4567",
    cell: "+1-555-123-4567",
    cellphone: "+1-555-123-4567",
    phoneNumber: "+1-555-123-4567",
    phone_number: "+1-555-123-4567",
    "phone-number": "+1-555-123-4567",
    mobileNumber: "+1-555-123-4567",
    contactNumber: "+1-555-123-4567",
    homePhone: "+1-555-123-4567",
    workPhone: "+1-555-124-7890",
    
    // Date variations
    dob: "1990-01-15",
    dateOfBirth: "1990-01-15",
    date_of_birth: "1990-01-15",
    "date-of-birth": "1990-01-15",
    birthdate: "1990-01-15",
    birthDate: "1990-01-15",
    birth_date: "1990-01-15",
    birthday: "01/15/1990",
    bday: "01/15/1990",
    
    // Age variations
    age: "34",
    years: "34",
    
    // Address variations
    address: "1234 Elm Street",
    address1: "1234 Elm Street",
    address2: "Apt 5B",
    addressLine1: "1234 Elm Street",
    addressLine2: "Apt 5B",
    address_line_1: "1234 Elm Street",
    address_line_2: "Apt 5B",
    "address-line-1": "1234 Elm Street",
    "address-line-2": "Apt 5B",
    street: "1234 Elm Street",
    streetAddress: "1234 Elm Street",
    street_address: "1234 Elm Street",
    "street-address": "1234 Elm Street",
    apartment: "Apt 5B",
    apt: "5B",
    suite: "5B",
    unit: "5B",
    
    // Location variations
    city: "Los Angeles",
    town: "Los Angeles",
    locality: "Los Angeles",
    
    state: "California",
    province: "California",
    region: "California",
    stateProvince: "California",
    
    country: "United States",
    countryCode: "US",
    country_code: "US",
    "country-code": "US",
    nation: "United States",
    
    zip: "90210",
    zipcode: "90210",
    zipCode: "90210",
    zip_code: "90210",
    "zip-code": "90210",
    postal: "90210",
    postcode: "90210",
    postalCode: "90210",
    postal_code: "90210",
    "postal-code": "90210",
    post: "90210",
    
    // Work information
    company: "ACME Corporation",
    organization: "ACME Corporation",
    employer: "ACME Corporation",
    workplace: "ACME Corporation",
    
    jobtitle: "Senior Software Developer",
    jobTitle: "Senior Software Developer",
    job_title: "Senior Software Developer",
    "job-title": "Senior Software Developer",
    title: "Senior Software Developer",
    position: "Senior Software Developer",
    occupation: "Senior Software Developer",
    role: "Senior Software Developer",
    designation: "Senior Software Developer",
    
    department: "Engineering",
    division: "Technology",
    
    // Website variations
    website: "https://johndoe.com",
    url: "https://johndoe.com",
    homepage: "https://johndoe.com",
    site: "https://johndoe.com",
    weburl: "https://johndoe.com",
    
    // Social media
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    instagram: "@johndoe",
    github: "https://github.com/johndoe",
    
    // Personal details
    gender: "male",
    sex: "male",
    
    nationality: "American",
    citizenship: "US",
    
    maritalStatus: "single",
    marital_status: "single",
    "marital-status": "single",
    
    // Emergency contact
    emergencyContact: "Jane Doe",
    emergency_contact: "Jane Doe",
    "emergency-contact": "Jane Doe",
    emergencyPhone: "+1-555-987-6543",
    emergency_phone: "+1-555-987-6543",
    "emergency-phone": "+1-555-987-6543",
    
    // Financial
    salary: "75000",
    income: "75000",
    
    // Education
    education: "Bachelor's Degree",
    degree: "Bachelor's Degree",
    qualification: "Bachelor's Degree",
    school: "State University",
    university: "State University",
    college: "State University",
    
    // Preferences and agreements
    newsletter: true,
    subscribe: true,
    marketing: true,
    promotions: true,
    updates: true,
    notifications: true,
    
    terms: true,
    termsAndConditions: true,
    terms_and_conditions: true,
    "terms-and-conditions": true,
    agree: true,
    accept: true,
    consent: true,
    
    privacy: true,
    privacyPolicy: true,
    privacy_policy: true,
    "privacy-policy": true,
    
    remember: true,
    rememberMe: true,
    remember_me: true,
    "remember-me": true,
    
    // Checkbox variations
    checkbox: true,
    check: true,
    CheckboxData: true,
    selected: true,
    
    // Password variations (for demo/testing only)
    password: "SecurePass123!",
    pwd: "SecurePass123!",
    pass: "SecurePass123!",
    confirmPassword: "SecurePass123!",
    confirm_password: "SecurePass123!",
    "confirm-password": "SecurePass123!",
    passwordConfirm: "SecurePass123!",
    
    // Additional common fields
    comments: "This is a test comment",
    message: "Hello, this is a test message",
    notes: "Additional notes here",
    description: "Brief description",
    bio: "Software developer with 10+ years of experience",
    about: "Passionate about technology and innovation",
    
    // ID variations
    id: "12345",
    userId: "12345",
    user_id: "12345",
    "user-id": "12345",
    customerId: "CUST-12345",
    customer_id: "CUST-12345",
    "customer-id": "CUST-12345",
    
    // Additional contact
    fax: "+1-555-123-4568",
    skype: "john.doe.skype",
    whatsapp: "+1-555-123-4567",
    
    // Time preferences
    timezone: "America/Los_Angeles",
    timeZone: "America/Los_Angeles",
    time_zone: "America/Los_Angeles",
    "time-zone": "America/Los_Angeles",
    
    // Language preferences
    language: "English",
    lang: "en",
    locale: "en-US",
    
    // Security questions (for demo only)
    securityQuestion: "What was your first pet's name?",
    securityAnswer: "Fluffy",
    
    // Rating/feedback
    rating: "5",
    feedback: "Excellent service",
    review: "Great experience overall"

    };

    // Generates a unique form ID by checking the form's id, name, or action attributes
    // Falls back to action's last segment or a generated index-based ID if others are unavailable
    function getFormId(form) {
        if (form.id) return form.id; //check if form has unique  id attribute
        if (form.getAttribute('name')) return form.getAttribute('name');//check if form has unique  name attribute
        if (form.getAttribute('action')) {  //checks if the form has an `action` attribute (typically a URL where form data is sent).
            const action = form.getAttribute('action');
            // Extracts the last part of the action URL (e.g., 'submit' from '/path/submit.php')
            return action.split('/').pop().split('.').shift() || `form_${Array.from(forms).length}`;
        }
        // Uses the form's index in the NodeList as a fallback ID
        return `form_${Array.from(forms).indexOf(form)}`;
    }

    // Matches form fields to persondata keys using exact or partial matches
    // Handles checkboxes with synonyms to improve matching flexibility
    function findMatchingKey(field) {
        const name = field.name ? field.name.toLowerCase() : '';
        const id = field.id ? field.id.toLowerCase() : '';
        const keys = Object.keys(persondata);

        // Prioritize exact matches for field name or ID
        if (name && persondata[name] !== undefined) return name;//// Get field name and ID in lowercase for easier matching
        if (id && persondata[id] !== undefined) return id;

        // For partial matches, check if field name or ID contains a persondata key
        // Special handling for checkboxes with common synonyms (e.g., 'subscribe' for 'newsletter')
        const checkboxSynonyms = ['subscribe', 'option', 'check', 'accept'];
        for (const key of keys) {
            if ((name && (name.includes(key) || checkboxSynonyms.some(syn => name.includes(syn) && key.includes('newsletter')))) ||
                (id && (id.includes(key) || checkboxSynonyms.some(syn => id.includes(syn) && key.includes('newsletter'))))) {
                return key;
            }
        }
        return null;
    }
function setAutocompleteAttributes(form) {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        const key = findMatchingKey(input);
        if (key && !input.hasAttribute('autocomplete')) {
            input.setAttribute('autocomplete', key); // Use the matching key as autocomplete
        }
    });
}

    // Autofills form fields with persondata values, ensuring no key is used twice
    function autofillForm(form) {
        const usedFields = new Set();

        // Selects all input types that can be autofilled with text or selections
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select');
        inputs.forEach(input => {
            const key = findMatchingKey(input);
            if (key && !usedFields.has(key)) {
                input.value = persondata[key];
                usedFields.add(key); // Tracks used keys to prevent reuse
            }
        });

        // Handles checkboxes separately to set their checked state
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const key = findMatchingKey(checkbox);
            if (key && !usedFields.has(key)) {
                checkbox.checked = !!persondata[key]; // Converts value to boolean for checkbox
                usedFields.add(key);
            }
        });

        // Logs any persondata keys that weren't used for debugging purposes
        const unusedFields = Object.keys(persondata).filter(key => !usedFields.has(key));
        if (unusedFields.length > 0) {
            console.log(`Unused fields for form ${getFormId(form)}:`, unusedFields);
        }
    }

    // Simulates saving form data to localStorage by logging key-value pairs
    // Constructs unique keys using form ID and field name/ID
    // // Function to pretend saving data to browser storage (just logs for now)
    function saveToLocalStorage(form) {
        const formId = getFormId(form);
        const formData = {};
        form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select').forEach(el => {
            if (el.name || el.id) {
                const key = `${formId}_${el.name || el.id}`;
                console.log(`Would save: ${key} = ${el.value}`);
            }
        });
// // Function to pretend checkboxes to browser storage (just logs for now)
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.name || checkbox.id) {
                const key = `${formId}_${checkbox.name || checkbox.id}`;
                console.log(`Would save: ${key} = ${checkbox.checked}`);
            }
        });
    }

    // Simulates loading form data from localStorage by logging the form ID
    function loadFromLocalStorage(form) {
        const formId = getFormId(form);
        console.log(`Would load saved data for form: ${formId}`);
    }

    // Processes each form, setting up autofill and event listeners
    forms.forEach(form => {
        loadFromLocalStorage(form);
        setAutocompleteAttributes(form);
        autofillForm(form);

        // Debounces input events to avoid excessive saving
        let saveTimeout;
        form.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            // Waits 500ms after last input to save, reducing performance impact
            saveTimeout = setTimeout(() => saveToLocalStorage(form), 500);//Sets a new timer: waits 500 milliseconds after the last input before calling saveToLocalStorage(form).
        });

        // Handles form submission, collecting and storing data
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents default form submission
            const formId = getFormId(form);
            const formData = {};
        
            // Collects data from text inputs and select elements
            const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], select');
            inputs.forEach(input => {
                if (input.name || input.id) {
                    formData[input.name || input.id] = input.value;
                    localStorage.setItem(input.id, input.value); // Stores individual field
                }
            });

            // Collects checkbox states
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.name || checkbox.id) {
                    formData[checkbox.name || checkbox.id] = checkbox.checked;
                    localStorage.setItem('CheckboxData', checkbox.checked); // Stores checkbox state
                }
            });
           // Save all form data together
          // Stores entire form data as JSON in localStorage
            localStorage.setItem(`${formId}_submittedFormData`, JSON.stringify(formData));
            saveToLocalStorage(form);
            console.log(`Form data for ${formId}:`, formData);
            alert(`Form ${formId} submitted! Check console for data object.`);
        });
    });
});