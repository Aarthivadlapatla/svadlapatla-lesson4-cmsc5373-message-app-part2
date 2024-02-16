import {
    getFirestore,
    collection,
    addDoc,
    orderBy,
    getDocs,
    getDoc,
    query,
    doc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
import { app } from "./firebase_core.js";
import { CollectionName } from "../model/constants.js";
import { Thread } from "../model/Thread.js";

const db = getFirestore(app);

export async function addThread(thread) {
    const collRef = collection(db, CollectionName.threads);
    const docRef = await addDoc(collRef, thread.toFirestore());
    return docRef.id;
}

export async function getThreadList() {
    let threadList = [];
    const q = query(collection(db, CollectionName.threads),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const t = new Thread(doc.data());
        t.set_docId(doc.id);
        threadList.push(t);
    });
    return threadList;
}

export async function getThreadById(threadId) {
    const docRef = doc(db, CollectionName.threads, threadId);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
        return null;
    }
    const t = new Thread(docSnap.data());
    t.set_docId(threadId);
    return t;
}