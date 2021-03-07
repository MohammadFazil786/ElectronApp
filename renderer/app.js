// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const{ipcRenderer} = require('electron')
const items =  require('./items')

let showModal = document.getElementById('show-modal'),
    closeModal  = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemUrl = document.getElementById('url')
    
    const toggleModal = () =>{
        if(addItem.disabled === true){
            addItem.disabled = false;
            addItem.style.opacity = 1;
            addItem.innerText = 'Add Item'
            closeModal.style.display = 'inline'
        }else{
            addItem.disabled = true;
            addItem.style.opacity = 0.5;
            addItem.innerText = 'Adding...'
            closeModal.style.display = 'none'
        }
    }
    showModal.addEventListener('click',event =>{
        modal.style.display = 'flex'
    })

    closeModal.addEventListener('click',event =>{
        modal.style.display = 'none'
    })
  
    addItem.addEventListener('click',event =>{
        if(itemUrl.value){
            ipcRenderer.send('new-item',itemUrl.value)
            toggleModal()
        }
    })
    
   ipcRenderer.on('new-item-success',(event,newitem) =>{
       items.addItem(newitem,true)
       toggleModal()
       modal.style.display = 'none'
       itemUrl.value = '';
   })
    itemUrl.addEventListener('keyup',event =>{
        if(event.key === 'Enter'){
            addItem.click()
        }
    })