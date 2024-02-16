import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { DEV } from "../model/constants.js";
import { getThreadById } from "../controller/firestore_controller.js";

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

    let thread;
    try {
        thread = await getThreadById(threadId);
        if (!thread) throw 'Thread not exists by id: ' + threadId;
    } catch (e) {
        if(DEV) console.log('Failed to get thread',e);
        alert('Failed to load a thread' + JSON.stringify(e));
        return;
    }

    // display the message thread
    divWrapper.querySelector('#message-title').textContent = thread.title;
    divWrapper.querySelector('#message-email-timestamp').innerHTML = 
    `${thread.email}<br>${new Date(thread.timestamp).toLocaleString()}`;
    divWrapper.querySelector('#message-content').textContent = thread.content;

    root.innerHTML = '';
    root.appendChild(divWrapper);
}