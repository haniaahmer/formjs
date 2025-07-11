document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registrationForm');
  
        if (!form) {
        console.error('Form with ID "registrationForm" not found.');
        return;
    }

    const inputs = form.querySelectorAll('input[type="text"],input[type="email"]');
    const checkbox = document.getElementById('CheckboxData');
    

    //load saved data from local storage

    inputs.forEach(input => {
         if (!input.id) {
            console.error('Input element missing ID attribute:', input);
            return;
        }
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
        // Save on change// Save on input event for real-time updates
        input.addEventListener('change', () => {
            localStorage.setItem(input.id, input.value);//as the user clicks or change the data the data is automatically stored into the  input feild accrding to the id 
           //save as two pair values  

        });
    });
if(checkbox){
     if (!checkbox.id) {
            console.error('Checkbox missing ID attribute:', checkbox);
            return;
        }

    const   tickcheckbox=localStorage.getItem('CheckboxData');
    if(tickcheckbox=='true'){
        checkbox.checked=true;
    } else {
        console.error('checkbox  not found.');
    }
  
    checkbox.addEventListener('change',() => {
        localStorage.setItem('CheckboxData',checkbox.checked); //change
//if checked it settled
    });
}
form.addEventListener('submit',(s)=>{
s.preventDefault();
alert('YOUR FORM IS SUBMITTED AND DATA IS STORED');
//IN REAL APP STORAGE SHOULD BE CLEARED  AFTER SUCCESSFULL STORAGE OF DATA 
//LOCAL STORAGE .CLEAR
})

});