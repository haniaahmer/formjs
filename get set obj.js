document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Person data with Pakistani details
    const persondata = {
        firstname: "Ali",
        lastname: "Khan",
        email: "ali.khan@example.com",
        phone: "+923001234567",
        address: "House 45, Street 10, G-9/3",
        address2: "Near Metro Station",
        state: "Punjab",
        country: "PK",
        post: "44000",
        area: "051",
        CheckboxData: true
    };

    function autofillForm(data) {
        // Fill text and email inputs
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
        inputs.forEach(input => {
            if (data[input.name] !== undefined) {
                input.value = data[input.name];
            }
        });

        // Fill select dropdowns
        const selects = form.querySelectorAll('select');
        selects.forEach(select => {
            if (data[select.name] !== undefined) {   //if data exists put in in parameter data if it exists
                select.value = data[select.name];
            }
        });

        // Set checkbox state
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (data[checkbox.id] !== undefined) {
                checkbox.checked = data[checkbox.id];
            }
        });
    }

    // Autofill with persondata
    autofillForm(persondata);

    // Save individual fields to localStorage
   // Listens for input changes on the form
    form.addEventListener('input', (e) => {
        const target = e.target;
        
        if (target.type === 'checkbox') {
            localStorage.setItem(target.id, target.checked);
        } else if (target.tagName === 'SELECT' || 
                  target.type === 'text' || 
                  target.type === 'email' 
                 ) {
            localStorage.setItem(target.name, target.value);
        }
    });

    // Load individual fields from localStorage
    function loadFromLocalStorage() {
        // Load text/email/tel inputs and selects
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                input.value = savedValue;
            }
        });

        // Load checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const savedValue = localStorage.getItem(checkbox.id);
            if (savedValue !== null) {
                checkbox.checked = savedValue === 'true';
            }
        });
    }

    loadFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();//Prevents the default form submission behavior (page reload)
        
        // Prepare form data object
        const formData = {};
        
        // Get all input values
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');
        inputs.forEach(input => {
            formData[input.name] = input.value;
             localStorage.setItem(input.id, input.value);
        });

        // Get checkbox states
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            formData[checkbox.id] = checkbox.checked;
             localStorage.setItem('CheckboxData',checkbox.checked);
        });

        console.log('Form data:', formData);
        alert('Form submitted! Check console for data object.');
        
      
    });
});