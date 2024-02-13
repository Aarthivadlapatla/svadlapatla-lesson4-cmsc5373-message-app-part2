import {
    getFirestore,
    collection,
    addDoc,
 } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
import { app } from "./firebase_core.js";
import { CollectionName } from "../model/constants.js";
const db = getFirestore(app);

export async function addThread(thread){
    const collRef = collection(db, CollectionName.threads);
    const docRef = await addDoc(collRef, thread.toFirestore());
    return docRef.id;
}