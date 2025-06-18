// import fs from 'fs'

const card = document.getElementById('cardCont');



// to add hidden to the card when the X 'close' button is pressed
function toggleCard(){
    card.classList.add('hidden')
}
// whenever the user clicks outside the opend reading card the card closes
document.addEventListener('click',((e)=>{
    if (e.target.id=='cardCont'){
        toggleCard()    
    }
}))

// to delete the file from the files_db when del button is pressed
function delCard(fn){
    console.log('del pressed')
    fetch('/files'+'/'+fn, {method:'delete'}).then(res=>res.json()).then(
        location.reload()
    )
}





// this calls the files/:fn in place of the 'a' tag ..... 
// because it prevents from reload of the page and still be able to get the data and json from the file/:fn api
function openTask(fn){

    fetch(`files/:${fn}`).then(res=>res.json()).then(data=>
        {
        document.getElementById('cardCont').classList.remove('hidden')
        document.getElementById('read_tit').innerText=data.file_tit;
        document.getElementById('read_cnt').innerText=data.file_cnt;
        }
    )
}

