import { Thread } from "../model/Thread.js";
import { prependThread } from "../view/home_page.js";
import { currentUser } from "./firebase_auth.js";
import { addThread } from "./firestore_controller.js";
//import { DEV } from "../constants.js";

export function onClickCreateButton(e){
    showTextArea();
}

function showTextArea(){
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea = divModals[1];
    divButton.classList.replace('d-block', 'd-none');
    divTextArea.classList.replace('d-none', 'd-block');
}

function hideTextArea(){
    const divModals = document.querySelectorAll('.create-modal');
    const divButton = divModals[0];
    const divTextArea = divModals[1];
    divButton.classList.replace('d-none', 'd-block');
    divTextArea.classList.replace('d-block', 'd-none');
}

export async function onSubmitCreateMessage(e){
    e.preventDefault();
    if(e.submitter.value == 'cancel'){
        hideTextArea();
        return;
    }
    // 'save'
    const title = e.target.title.value;
    const content = e.target.content.value;
    const uid = currentUser.uid;
    const email = currentUser.email;
    const timestamp = Date.now();
    const thread = new Thread({
        uid, email, title, content, timestamp,
    });

    try {
        const docId = await addThread(thread);
        prependThread(thread);
    } catch (e) {
        //if (DEV) console.log('addThread error', e);
        console.log('addThread error', e);
        alert('Failed to create message: ' + JSON.stringify(e));
    }
}