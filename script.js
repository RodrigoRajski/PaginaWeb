const form=document.querySelector('form');
const fullName=document.getElementById('name');
const email=document.getElementById('email');
const phone=document.getElementById('phone');
const subject=document.getElementById('subject');
const mess=document.getElementById('message');

function sendEmail(){
    const bodyMessage=`Full Name: ${fullName.value}<br> Email:${email.value}<br> Phone Number:${phone.value}<br> Message:${mess.value}`;

    Email.send({
        SecureToken :"bc950dea-d57a-4b4b-90ac-8a11204fe60c",
        Host : "smtp.elasticemail.com",
        Username : "rodrirajski@gmail.com",
        Password : "84F25C724644F5E68E5B1F84C7543729530A",
        To : 'rodrirajski@gmail.com',
        From : "rodrirajski@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message =>{
        if (message=="OK"){
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
        }
    }
    );
}

function checkInputs(){
    const items= document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value==""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value !=""){
            checkEmail();
        }

        items[1].addEventListener("keyup",() =>{
            checkEmail();
        });

        item.addEventListener("Keyup",()=>{
            if(item.value !=""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail(){
    const emailRegex= /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail =document.querySelector(".error-txt.email");

    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value!=""){
            errorTxtEmail.innerText ="Ingresa un mail valido";
        }
        else{
            errorTxtEmail.innerText="Email no puede quedar vacio";
        }
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit",(e)=> {
    e.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;
    }
});