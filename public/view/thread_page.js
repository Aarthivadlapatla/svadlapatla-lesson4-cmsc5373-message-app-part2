import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";

export async function threadPageView(threadId){
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }

    const response = await fetch('./view/templates/thread_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    root.innerHTML = '';
    root.appendChild(divWrapper);
}