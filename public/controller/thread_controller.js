import { Reply } from "../model/Reply.js";
import { currentUser } from "./firebase_auth.js";
import { addReply, deleteReply } from "./firestore_controller.js";
import { DEV } from "../model/constants.js";
import { renderReply } from "../view/thread_page.js";

export async function onSubmitAddReply(e){
    e.preventDefault();
    const content = e.target.content.value;
    const uid = currentUser.uid;
    const email = currentUser.email;
    const timestamp = Date.now();
    const threadId = e.submitter.id; // thread owner's doc id (button id)
    const threadUid = e.submitter.value; // thread owner's uid (button value)
    const reply = new Reply({
        threadId, threadUid, uid, email, timestamp, content
    });

    try{
        const docId = await addReply(reply);
        reply.set_docId(docId);
    }
    catch(e){
        if(DEV) console.log('Failed to add a reply', e);
        alert('Failed to add a reply: ' + JSON.stringify(e));
        return;
    }

    renderReply(reply);
    e.target.reset();
}

export async function onSubmitEditReply(e, reply){
    e.preventDefault();
    const buttonValue = e.submitter.value;
    const buttons = e.target.querySelectorAll('button');
    const editButton = buttons[0];
    const deleteButton = buttons[1];
    const updateButton = buttons[2];
    const cancelButton = buttons[3];
    const textarea = e.target.querySelector('textarea');
    if(buttonValue === 'edit'){
        textarea.disabled = false;
        editButton.classList.replace('d-inline-block', 'd-none');
        deleteButton.classList.replace('d-inline-block', 'd-none');
        updateButton.classList.replace('d-none', 'd-inline-block');
        cancelButton.classList.replace('d-none', 'd-inline-block');
    }else if(buttonValue === 'cancel'){
        textarea.value = reply.content; // restore the original content
        textarea.disabled = true;
        editButton.classList.replace('d-none', 'd-inline-block');
        deleteButton.classList.replace('d-none', 'd-inline-block');
        updateButton.classList.replace('d-inline-block', 'd-none');
        cancelButton.classList.replace('d-inline-block', 'd-none');
    }else if(buttonValue == 'delete'){
        if(!confirm('Confirm to delete the reply?')) return;
        const docId = reply.docId;
        try{
            await deleteReply(docId);
            // update web browser to remove reply
            // <tr><td><form>
            const tr = e.target.parentElement.parentElement;
            tr.remove();
        } catch(e){
            if(DEV) console.log('Failed to delete: ', e);
            alert('Failed to delete a reply: ' + JSON.stringify(e));
            
        }
    }
}