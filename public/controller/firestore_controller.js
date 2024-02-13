import {
    getFirestore,
    collection,
    addDoc,
    orderBy,
    getDocs,
    query,
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