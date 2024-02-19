import { Reply } from "../model/Reply.js";
import { currentUser } from "./firebase_auth.js";
import { addReply } from "./firestore_controller.js";
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