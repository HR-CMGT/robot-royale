export class ProgramView extends HTMLElement {
    connectedCallback() {
        console.log("Building programmer view");
    }
    sendData() {
    }
    usePower() {
    }
}
customElements.define('program-view', ProgramView);
