import "./styles/reset.pcss";
import "./styles/pallette.pcss";
import "./styles/fonts.pcss";
import "./styles/global.pcss";

import "./styles/home.pcss";
import "./styles/header.pcss";
import "./styles/footer.pcss";
import "./styles/messageForm.pcss";

import "./styles/popUp.pcss";

import Popup from "./js/popUp";

window.onload = function () {
    const popup = new Popup(
        "#popup",
        "#js-popup-content",
        "#js-send-msg-form",
        "#js-lets-talk-btn"
    );

    const form = document.querySelector("#js-send-msg-form");
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    form.onsubmit = function (event) {
        event.preventDefault();
        const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const nameRegex = /^[a-zA-Z ]{2,30}$/;

        if (!emailRegex.exec(email.value) || !nameRegex.exec(name.value)) {
            return;
        } else {
            // const messageInfo = document.createElement("p");
            // messageInfo.value = "Your message successfully sent";
            // messageInfo.id = "js-info-msg";
            // messageInfo.style.display = "none";
            // document.body.appendChild(messageInfo);
            // new Popup("#js-info-msg");
        }
        console.log(event);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "post",
            body: JSON.stringify({
                name: form.querySelector("#name").value,
                email: form.querySelector("#email").value,
                msg: form.querySelector("#message").value,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                const messageInfo = document.createElement("p");
                messageInfo.innerText = "Your message successfully sent";
                messageInfo.id = "js-info-msg";
                messageInfo.style.display = "none";
                document.body.appendChild(messageInfo);
                const infoPopup = new Popup(
                    "#popup-msg",
                    "#js-popup-msg-content",
                    "#js-info-msg"
                );
                popup.hide();
                infoPopup.show();
                //document.querySelector("#popup-msg").style.display = "block";
                return response.json();
            })
            .then((res) => {
                if (res.status === 201) {
                    // result
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
