document.getElementById("contactForm").addEventListener("submit", function(event){

    event.preventDefault();

    document.getElementById("successMessage").innerText =
    "Form Submitted Successfully";

});