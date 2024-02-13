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

export function onSubmitCreateMessage(e){
    e.preventDefault();
    if(e.submitter.value == 'cancel'){
        hideTextArea();
        return;
    }

    // 'save'
    const title = e.target.title.value;
    const content = e.target.content.value;
}