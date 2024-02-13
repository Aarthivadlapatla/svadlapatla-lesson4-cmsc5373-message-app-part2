import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { onClickCreateButton, onSubmitCreateMessage } from "../controller/home_controller.js";
import { getThreadList } from "../controller/firestore_controller.js";

export async function homePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    let threadList;
    try {
        threadList = await getThreadList();
    } catch (e) {
        //if(DEV) console.log('getThreadList error', e);
        console.log('getThreadList error', e);
        alert('Failed to get threads: ' + JSON.stringify(e));
    }

    const response = await fetch('./view/templates/home_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    const createButton = divWrapper.querySelector('#create-button');
    createButton.onclick = onClickCreateButton;

    const form = divWrapper.querySelector('form');
    form.onsubmit = onSubmitCreateMessage;

    root.innerHTML = '';
    root.appendChild(divWrapper);

    // render threadList from firestore
    const tbody = divWrapper.querySelector('tbody');
    threadList.forEach(thread => tbody.appendChild(createMessageRow(thread)));
}

export function prependThread(thread) {
    const tr = createMessageRow(thread);
    const tbody = document.querySelector('tbody');
    tbody.prepend(tr);
}

export function createMessageRow(thread) {
    const tdAction = document.createElement('td');
    tdAction.innerHTML = `view`;
    const tdTitle = document.createElement('td');
    tdTitle.textContent = thread.title;
    const tdEmail = document.createElement('td');
    tdEmail.textContent = thread.email;
    const tdContent = document.createElement('td');
    tdContent.textContent = thread.content;
    const tdTimestamp = document.createElement('td');
    tdTimestamp.textContent = new Date(thread.timestamp).toLocaleString();

    const tr = document.createElement('tr');
    tr.appendChild(tdAction);
    tr.appendChild(tdTitle);
    tr.appendChild(tdEmail);
    tr.appendChild(tdContent);
    tr.appendChild(tdTimestamp);

    return tr;
}