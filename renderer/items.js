let items  =  document.getElementById('items')

exports.storage = JSON.parse(localStorage.getItem('readit-item')) || []

exports.save = () =>{
    localStorage.setItem('readit-item',JSON.stringify(this.storage))
}

exports.addItem = (item,isNew = false) =>{
    let itemNode = document.createElement('div')
    itemNode.setAttribute('class','read-item')
    itemNode.innerHTML = `<img src="${item.screenShot}"><h2>${item.title}</h2>`
    items.appendChild(itemNode)
    if(isNew){
        this.storage.push(item)
        this.save();
    }
}

this.storage.forEach(element => {
    this.addItem(element)
});