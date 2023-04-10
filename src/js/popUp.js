export default class PopUp {
    constructor(
        popupSelector,
        popupContentSelector,
        contentSelector,
        btnSelector = ""
    ) {
        const popupContentElement =
            document.querySelector(popupContentSelector);
        this.popupElement = document.querySelector(popupSelector);
        const contentElement = document.querySelector(contentSelector);
        if (!popupContentElement || !contentElement || !this.popupElement) {
            //html element not found
            return;
        }

        popupContentElement.appendChild(contentElement);
        contentElement.style.display = "flex";

        //add click listeners
        this.addListeners(btnSelector);
    }

    addListeners(btnSelector) {
        if (btnSelector.length !== 0) {
            const btnElement = document.querySelector(btnSelector);
            btnElement.onclick = () => {
                this.popupElement.style.display = "block";
            };
        }

        this.popupElement.onclick = (event) => {
            if (event.target !== event.currentTarget) return;
            this.popupElement.style.display = "none";
        };
    }

    show() {
        this.popupElement.style.display = "block";
    }

    hide() {
        this.popupElement.style.display = "none";
    }
}
