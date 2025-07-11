document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    if (!form) return;

    // Sample data for autofill
 const persondata = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    tel: "+1-202-555-0143",
    address: "1234 Elm Street",
    address2: "Apt 5B",
    state: "California",
    country: "US",
    post: "90210", // ZIP code (e.g., Beverly Hills)
    area: "310",   // Area code (e.g., Los Angeles)
    CheckboxData: true
};

    function autofillForm(data) {
        // Fill all input fields
        const inputs = form.querySelectorAll('input[type="text"],input[type="tel"], input[type="email"],select');
        inputs.forEach(input => {
            if (data[input.name] !== undefined) input.value = data[input.name];
        });

        // Fill dropdowns
        const selects = form.querySelectorAll('select');
        selects.forEach(select => {
            if (data[select.name] !== undefined)
                 select.value = data[select.name];
        });

        // Set checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (data[checkbox.id] !== undefined) 
                checkbox.checked = data[checkbox.id];
        });
    }

    autofillForm(persondata);

    // Save form data to localStorage
    form.addEventListener('input', (e) => {
        const formData = {};
        
        document.querySelectorAll('input[type="text"], input[type="email"],input[type="tel"], select').forEach(el => {
            formData[el.name] = el.value;
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            formData[checkbox.id] = checkbox.checked;
        });

        localStorage.setItem('formData', JSON.stringify(formData));
    });

    // Load saved data
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('formData');
        if (!savedData) return;

        try {
            const formData = JSON.parse(savedData);
            
            document.querySelectorAll('input[type="text"], input[type="email"],input[type="tel"], select').forEach(el => {
                if (formData[el.name] !== undefined) el.value = formData[el.name];
            });

            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (formData[checkbox.id] !== undefined) checkbox.checked = formData[checkbox.id];
            });
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }

    loadFromLocalStorage();

    // Handle form submission
   
    form.addEventListener('submit', (e) => {
        e.preventDefault();//Prevents the default form submission behavior (page reload)
        
        // Prepare form data object
        const formData = {};
        
        // Get all input values
        const inputs = form.querySelectorAll('input[type="text"],input[type="tel"], input[type="email"], select');
        inputs.forEach(input => {
            formData[input.name] = input.value;
             localStorage.setItem(input.id, input.value);//set in local stoage as key value pairs
        });

        // Get checkbox states
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            formData[checkbox.id] = checkbox.checked;
             localStorage.setItem('CheckboxData',checkbox.checked);
        });

        console.log('Form data:', formData); //gives the object into console
        alert('Form submitted! Check console for data object.');
        
      
    });
});