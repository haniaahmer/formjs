(function() {
    // Consolidated person data for rental applications
    const personData = {
        // Personal Information
        "first-name": "John",
        "last-name": "Doe",
        "full-name": "John Michael Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-123-4567",
        "date-of-birth": "1990-01-15",
        "middlename": "Michael",
        "username": "johndoe123",
        "password": "SecurePass123!",
        
        // Address Information
        "address": "1234 Elm Street",
        "address2": "Apt 5B",
        "city": "Los Angeles",
        "state": "California",
        "zip-code": "90210",
        "postal-code": "90210",
        "country": "United States",
        
        // Employment Information
        "employer": "ACME Corporation",
        "job-title": "Senior Software Developer",
        "annual-income": "85000",
        "work-phone": "+1-555-124-7890",
        
        // Rental History
        "previous-landlord-name": "Jane Smith",
        "previous-landlord-phone": "+1-555-456-7890",
        "previous-address": "456 Oak Ave, Othertown, NY 10001",
        
        // Vehicle Information
        "vehicle-make": "Toyota",
        "vehicle-model": "Camry",
        "vehicle-year": "2018",
        "vehicle-license": "ABC1234",
        
        // Emergency Contact
        "emergency-contact-name": "Mary Johnson",
        "emergency-contact-phone": "+1-555-789-0123",
        
        // Other
        "number-of-occupants": "2",
        "pets": "1 cat",
        "move-in-date": new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        "signature": "John Doe",
        "date": new Date().toISOString().split('T')[0],
        "newsletter": true,
        "terms": true,
        "privacy": true
    };

    // Normalize key variations
    const keyVariations = {
        firstname: ["first-name", "first_name", "fname", "givenname", "forename"],
        lastname: ["last-name", "last_name", "lname", "surname", "familyname"],
        middlename: ["middle-name", "middle_name", "mname"],
        fullname: ["full-name", "full_name", "name", "displayname"],
        email: ["email-address", "email_address", "mail", "e_mail"],
        phone: ["telephone", "tel", "mobile", "cell", "phonenumber", "phone-number","number"],
        address: ["street-address", "street_address", "address1", "address-line-1","address-1"],
        address2: ["address-2", "address_2", "address-line-2", "address2", "address_line_2", 
                   "street_2", "street_address_2", "street-address-2", "streetaddress2", 
                   "addressline2", "apt", "apartment", "suite"],
        city: ["town", "locality"],
        state: ["province", "region", "stateprovince"],
        zip: ["zip-code", "zipcode", "postal", "postcode", "postal-code","post-code"],
        jobtitle: ["job-title", "job_title", "title", "position", "occupation"],
        terms: ["terms-and-conditions", "agree", "accept", "consent"],
        password: ["pwd", "pass", "confirmpassword", "confirm-password"]
    };
 // Simplified storage management object
    const StorageManager = {
        // Save individual field data - only log the value
        saveField: function(formId, fieldKey, value, fieldType = 'text') {
            try {
                const key = `${formId}_${fieldKey}`;
                console.log(`Saving: ${key} = ${value}`);
                // In real implementation, you would use localStorage here
                // localStorage.setItem(key, value);
            } catch (error) {
                console.error('Error saving field:', error);
            }
        },

        // Save entire form data as simple key-value pairs
        saveFormData: function(formId, formData) {
            try {
                console.log(`Saving complete form data for ${formId}:`);
                Object.entries(formData).forEach(([key, value]) => {
                    console.log(`  ${key}: ${value}`);
                });
                // localStorage.setItem(`${formId}_complete`, JSON.stringify(formData));
            } catch (error) {
                console.error('Error saving form data:', error);
            }
        },

        // Load form data
        loadFormData: function(formId) {
            try {
                console.log(`Would load saved data for form: ${formId}`);
                // In real implementation:
                // const saved = localStorage.getItem(`${formId}_complete`);
                // return saved ? JSON.parse(saved) : null;
                return null;
            } catch (error) {
                console.error('Error loading form data:', error);
                return null;
            }
        },

        // Get all saved forms
        getAllSavedForms: function() {
            const savedForms = [];
            try {
                console.log('Getting all saved forms...');
                // In real implementation:
                // for (let i = 0; i < localStorage.length; i++) {
                //     const key = localStorage.key(i);
                //     if (key.endsWith('_complete')) {
                //         const data = JSON.parse(localStorage.getItem(key));
                //         savedForms.push(data);
                //     }
                // }
            } catch (error) {
                console.error('Error getting saved forms:', error);
            }
            return savedForms;
        }
    };

    // Enhanced key normalization function
    function normalizeKey(key) {
        key = key.toLowerCase().replace(/[-_\s]/g, '');
        for (const [mainKey, variations] of Object.entries(keyVariations)) {
            const normalizedVariations = variations.map(v => v.toLowerCase().replace(/[-_\s]/g, ''));
            if (normalizedVariations.includes(key) || key === mainKey.replace(/[-_]/g, '')) {
                return Object.keys(personData).find(dataKey => 
                    dataKey.toLowerCase().replace(/[-_]/g, '') === mainKey
                ) || mainKey;
            }
        }
        return key;
    }

    // Generate unique form identifier
    function getFormId(form, forms) {
        if (form.id) return form.id;
        if (form.getAttribute('name')) return form.getAttribute('name');
        if (form.getAttribute('action')) {
            const action = form.getAttribute('action').split('/').pop().split('.').shift();
            return action || `form_${Array.from(forms).indexOf(form)}`;
        }
        return `form_${Array.from(forms).indexOf(form)}`;
    }

    // Enhanced field matching with multiple attribute checking
    function findMatchingKey(field) {
        const attributes = [
            field.name,
            field.id,
            field.placeholder,
            field.labels && field.labels[0] ? field.labels[0].textContent : '',
            field.getAttribute('aria-label'),
            field.getAttribute('data-name')
        ].filter(Boolean).map(attr => attr.toLowerCase().replace(/[^a-z0-9]/g, ''));

        for (const attr of attributes) {
            const normalized = normalizeKey(attr);
            if (personData[normalized] !== undefined) return normalized;
            
            // Secondary matching - check if any personData key contains the attribute
            for (const key of Object.keys(personData)) {
                if (attr.includes(key.replace(/[-_]/g, '')) || key.replace(/[-_]/g, '').includes(attr)) {
                    return key;
                }
            }
        }
        return null;
    }

    // Get all inputs including shadow DOM
    function getAllInputs(form) {
        const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
        // Handle shadow DOM
        const shadowHosts = form.querySelectorAll('*');
        shadowHosts.forEach(host => {
            if (host.shadowRoot) {
                const shadowInputs = host.shadowRoot.querySelectorAll('input, select, textarea');
                inputs.push(...shadowInputs);
            }
        });
        return inputs;
    }

    // Temporarily bypass form restrictions
    function bypassRestrictions(input) {
        const original = {
            autocomplete: input.getAttribute('autocomplete'),
            readonly: input.hasAttribute('readonly'),
            disabled: input.hasAttribute('disabled')
        };
        input.removeAttribute('autocomplete');
        input.setAttribute('autocomplete', 'on');
        if (original.readonly) input.removeAttribute('readonly');
        if (original.disabled) input.removeAttribute('disabled');
        return original;
    }

    // Restore original restrictions
    function restoreRestrictions(input, original) {
        if (original.autocomplete !== null) {
            input.setAttribute('autocomplete', original.autocomplete);
        } else {
            input.removeAttribute('autocomplete');
        }
        if (original.readonly) input.setAttribute('readonly', 'true');
        if (original.disabled) input.setAttribute('disabled', 'true');
    }

    // Trigger comprehensive events for framework compatibility
    function triggerEvents(input) {
        ['input', 'change', 'keyup', 'blur', 'focus'].forEach(eventType => {
            const event = new Event(eventType, { bubbles: true, cancelable: true });
            input.dispatchEvent(event);
        });
        
        // Special handling for React
        if (input._valueTracker) {
            input._valueTracker.setValue(input.value);
        }
        
        // Custom input event for modern frameworks
        const inputEvent = new InputEvent('input', { 
            bubbles: true, 
            data: input.value,
            inputType: 'insertText'
        });
        input.dispatchEvent(inputEvent);
    }

    // Enhanced autofill function with simplified storage
    function autofillForm(form) {
        const formId = getFormId(form, document.querySelectorAll('form'));
        const usedFields = new Set();
        const formData = {};
        const inputs = getAllInputs(form);

        // Load existing data first
        StorageManager.loadFormData(formId);

        inputs.forEach(input => {
            try {
                const key = findMatchingKey(input);
                if (!key || usedFields.has(key) || personData[key] === undefined) return;

                const original = bypassRestrictions(input);
                let value = personData[key];

                if (input.type === 'checkbox') {
                    input.checked = !!value;
                    formData[input.name || input.id] = input.checked;
                    StorageManager.saveField(formId, input.name || input.id, input.checked, 'checkbox');
                } else if (input.type === 'radio') {
                    if (input.value.toLowerCase().includes(value.toString().toLowerCase())) {
                        input.checked = true;
                        formData[input.name || input.id] = input.value;
                        StorageManager.saveField(formId, input.name || input.id, input.value, 'radio');
                    }
                } else if (input.tagName.toLowerCase() === 'select') {
                    const option = Array.from(input.options).find(opt => 
                        opt.value.toLowerCase().includes(value.toString().toLowerCase()) ||
                        opt.text.toLowerCase().includes(value.toString().toLowerCase())
                    );
                    if (option) {
                        input.value = option.value;
                        formData[input.name || input.id] = input.value;
                        StorageManager.saveField(formId, input.name || input.id, input.value, 'select');
                    }
                } else {
                    input.value = value;
                    input.setAttribute('value', value);
                    formData[input.name || input.id] = input.value;
                    StorageManager.saveField(formId, input.name || input.id, input.value, input.type);
                }

                triggerEvents(input);
                usedFields.add(key);
                setTimeout(() => restoreRestrictions(input, original), 1000);
            } catch (error) {
                console.error(`Error filling input:`, error);
            }
        });

        // Save complete form data with simplified logging
        StorageManager.saveFormData(formId, formData);

        return { 
            success: true, 
            message: `Filled form ${formId}`, 
            fieldsCount: usedFields.size,
            formData: formData
        };
    }

    // Enhanced form detection
    function detectAllForms() {
        const forms = document.querySelectorAll('form');
        const formInfo = Array.from(forms).map((form, index) => ({
            index,
            id: getFormId(form, forms),
            inputs: getAllInputs(form).length,
            action: form.action || 'No action',
            method: form.method || 'GET',
            hasStorage: StorageManager.loadFormData(getFormId(form, forms)) !== null
        }));

        return { success: true, count: forms.length, forms: formInfo };
    }

    // Process all forms with simplified storage
    function processAllForms() {
        const forms = document.querySelectorAll('form');
        if (!forms.length) {
            console.warn('No forms found on the page');
            return { success: false, message: 'No forms found on the page', count: 0 };
        }

        let filledCount = 0;
        const results = [];

        forms.forEach((form, index) => {
            try {
                const result = autofillForm(form);
                if (result.success) filledCount++;
                results.push(result);

                // Enhanced form submission handler with simplified storage
                form.addEventListener('submit', (e) => {
                    const formId = getFormId(form, forms);
                    console.log(`Form ${formId} submitted with autofilled data`);
                    
                    // Save submission data - just the values
                    console.log(`Submission data for ${formId}:`);
                    Object.entries(result.formData).forEach(([key, value]) => {
                        console.log(`  ${key}: ${value}`);
                    });
                });

            } catch (error) {
                console.error(`Error filling form ${index}:`, error);
            }
        });

        return { 
            success: true, 
            message: `Successfully filled ${filledCount} form(s)`, 
            count: filledCount,
            results: results
        };
    }

    // Clear all forms and storage
    function clearAllForms() {
        const forms = document.querySelectorAll('form');
        let clearedCount = 0;

        forms.forEach(form => {
            const formId = getFormId(form, forms);
            getAllInputs(form).forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else if (input.tagName.toLowerCase() === 'select') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
                triggerEvents(input);
            });
            clearedCount++;
            
            // Clear storage for this form
            console.log(`Clearing storage for form: ${formId}`);
        });

        return { success: true, message: `Cleared ${clearedCount} form(s)`, count: clearedCount };
    }

    // Export enhanced API
    window.universalFormFill = {
        fill: processAllForms,
        detect: detectAllForms,
        clear: clearAllForms,
        storage: StorageManager,
        bypass: () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => getAllInputs(form).forEach(bypassRestrictions));
            return { success: true, message: 'Bypassed restrictions on all forms' };
        },
        // Additional utility functions
        getData: () => personData,
        updateData: (newData) => Object.assign(personData, newData),
        getFormData: (formId) => StorageManager.loadFormData(formId),
        getAllStoredForms: () => StorageManager.getAllSavedForms()
    };

    // Auto-run if not already loaded
    if (typeof window !== 'undefined' && !window.universalFormFillLoaded) {
        window.universalFormFillLoaded = true;
        return processAllForms();
    }

})();