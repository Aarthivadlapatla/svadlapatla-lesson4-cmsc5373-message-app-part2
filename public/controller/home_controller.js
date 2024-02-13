import { userInfo } from "../view/elements.js";

export function onsubmitCalcForm(e){
    e.preventDefault();
    const nstr = e.target.number.value;
    const n = parseInt(nstr);
    const ul = document.getElementById('display');
    const eqString = `${n} x ${n} = ${n*n}`;
    const li = document.createElement('li');
    li.textContent = eqString;
    ul.appendChild(li);
    e.target.number.value = ''; // clear the input field 
}