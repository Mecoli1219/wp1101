var photo_src = {
    all:[],
    memes:[
        "./photos/sample1.png",
        "./photos/sample2.png",
        "./photos/sample3.png",
        "./photos/sample4.png",
        "./photos/sample5.png",
        "./photos/sample6.png"
    ],
    animals:[
        "https://as1.ftcdn.net/v2/jpg/03/12/26/06/1000_F_312260680_EVMXPzgpDj0F5FVoiJUbQ1axYmS5JArN.jpg",
        "https://as2.ftcdn.net/v2/jpg/02/11/96/65/1000_F_211966533_4QpqeotqB423I4OH63qmg9HQjmjqdEWX.jpg",
        "https://as2.ftcdn.net/v2/jpg/03/09/02/47/1000_F_309024722_TAmBo2y4fS3dGUUedoouEWPp0IneDpbX.jpg",
        "https://as1.ftcdn.net/v2/jpg/01/03/31/48/1000_F_103314840_pSOFixTmp0m48TfBFoYPw0pOpoaKebwJ.jpg",
        "https://t4.ftcdn.net/jpg/02/34/04/81/360_F_234048177_FCeHsVw3ltxzNCD28iBxdJNQUMjHcj9h.jpg",
        "https://t3.ftcdn.net/jpg/02/84/05/00/240_F_284050063_vV7DdVPop4WJZVA6Jne40g1pmdEoTChE.jpg",
        "https://t4.ftcdn.net/jpg/02/92/92/47/240_F_292924793_UJriQiQzkgcu7u1jQyo4jgdfuXe9Z4St.jpg",
        "https://t3.ftcdn.net/jpg/03/02/14/00/240_F_302140095_ZNvUZwG6IofM1vt5VPC758sCFsT2BVYb.jpg",
        "https://t3.ftcdn.net/jpg/02/72/79/96/240_F_272799660_QuFGZaL167GFVknOkOArcYNHgfpO8WYO.jpg",
        "https://t3.ftcdn.net/jpg/04/29/58/80/360_F_429588037_giqFISiI0QntYw5RU2U2gu84lFYzYOI4.jpg",
        "https://t3.ftcdn.net/jpg/04/32/03/28/240_F_432032876_wx4EkFWR3jMGNlvXVYHpe9ysDiReSgRF.jpg",
        "https://t4.ftcdn.net/jpg/03/17/29/49/240_F_317294940_RlGjGql19G5JMTxDy3aMDGJx6E7ula43.jpg",
        "https://t3.ftcdn.net/jpg/04/32/01/46/240_F_432014627_50z6UgOky7HzOYtP871sQLxuiqx5Fb4A.jpg",
        "https://t4.ftcdn.net/jpg/02/35/60/59/240_F_235605982_gcVk2zQoNS8cROH7TBqqdmbxSULsQUDx.jpg",
        "https://t3.ftcdn.net/jpg/01/37/88/54/240_F_137885441_P3SkigUdqODl867qQhbmD1YGhsT5gcJw.jpg",
    ],
    empty:[],
}
photo_src.all = [...photo_src.memes, ...photo_src.animals, ...photo_src.empty]

var albums = ["all", "memes", "animals", "empty"]

var state = {
    album:"all",
    select: [
        0,
        0
    ],
    total_photo:0,
    current_photo:0,
    total_album:0,
    current_album: 1,
    on_album: false,
    can_delete : false
}

function changeAlbum(value){
    return (event) => {
        if(photo_src[value].length === 0 && value === "empty"){
            alert("This album is empty!")
            return
        }
        state.current_album = event.currentTarget.number
        state.album = value
        highlightAlbum()
        changePhoto()
        state.on_album = true
        state.can_delete = true
    }
}

const photo_list = document.getElementById("photo-list")
const album_list = document.getElementById("album-list")

const highlightAlbum = () =>{
    const {album} = state
    const elements = document.getElementsByClassName('album-item')
    Array.from(elements).forEach(function(element) {
        element.style.borderColor = "black"
    });
    const element = document.getElementById(`album-item-${album}`)
    element.style.borderColor = "yellow"
}

const listAlbum = () =>{
    album_list.innerHTML = ""
    state.total_album = 0
    albums.map((album)=>{
        state.total_album += 1
        var liNode = document.createElement("li")
        liNode.className = "album-item"
        liNode.id = `album-item-${album}`
        var aNode = document.createElement("a")
        aNode.className = "album-bottom"
        aNode.id = `album-bottom-${album}`
        aNode.number = state.total_album
        var h2Node = document.createElement("h2")
        h2Node.id = `album-text-${album}`
        h2Node.innerText = album.toUpperCase()+`(${photo_src[album].length})`
        aNode.appendChild(h2Node)
        liNode.appendChild(aNode)
        album_list.appendChild(liNode)
    })
    var liNode = document.createElement("li")
    liNode.className = "add-album-item"
    liNode.number = state.total_album
    liNode.id = `add-album-item`
    var inputNode = document.createElement("input")
    inputNode.placeholder = "Enter Album Name"
    inputNode.type = "text"
    inputNode.id = "add-album"
    liNode.appendChild(inputNode)
    inputNode = document.createElement("input")
    inputNode.type = "submit"
    inputNode.id = "add-album-button"
    liNode.appendChild(inputNode)
    album_list.appendChild(liNode)
    listenAlbum()
    changePhoto()
}

const changeAlbumNumber = (album) =>{
    const h2Node = document.getElementById(`album-text-${album}`)
    h2Node.innerText = album.toUpperCase()+`(${photo_src[album].length})`
}

const showNumber = () =>{
    const numberNode = document.getElementById("number")
    numberNode.innerText = `${state.current_photo}/${state.total_photo}`
}

const changePhoto = () => {
    photo_list.innerHTML = ""
    if (state.album !== "empty"){
        var liNode = document.createElement("li")
        liNode.className = "photo-item-add"
        liNode.id = "photo-item-add"
        var inputNode = document.createElement("input")
        inputNode.placeholder = "Enter URL"
        inputNode.type = "text"
        inputNode.id = "add-photo"
        liNode.appendChild(inputNode)
        inputNode = document.createElement("input")
        inputNode.type = "submit"
        inputNode.id = "add-photo-button"
        liNode.appendChild(inputNode)
        liNode.style.backgroundImage = "./photos/add.png"
        liNode.style.backgroundColor = "rgba(0,0,0,0)"
        photo_list.appendChild(liNode)
    }
    state.total_photo = 0
    photo_src[state.album].map((url)=>{
        state.total_photo += 1
        var liNode = document.createElement("li")
        liNode.className = "photo-item"
        liNode.number = state.total_photo
        var imgNode = document.createElement("img")
        imgNode.src = url
        imgNode.alt = "photo"
        liNode.appendChild(imgNode)
        photo_list.appendChild(liNode)
    })
    changeLargePhoto(undefined)
    listenPhoto()
    showNumber()
}

const changeLargePhoto = (event)=>{
    const elements = document.getElementsByClassName("photo-item")
    const large_photo = document.getElementById("large-photo")
    Array.from(elements).forEach(function(element) {
        element.style.borderColor="black"
    });
    if(event===undefined){
        if (elements[0] !== undefined){
            large_photo.src = elements[0].children[0].src
            elements[0].style.borderColor="red"
            state.current_photo = 1
        }else{
            large_photo.src = "./photos/question.png"
            state.current_photo = 0
        }
    }else{
        large_photo.src = event.target.src || event.target.children[0].src
        event.currentTarget.style.borderColor="red"
        state.current_photo = event.currentTarget.number
    }
    showNumber()
    state.on_album=false
    state.can_delete = true
}

const addPhoto = ()=>{
    const element = document.getElementById("add-photo")
    const {album} = state
    url = element.value
    photo_src[album] = [url, ...photo_src[album]]
    changePhoto()   
    changeAlbumNumber(album)
}

const addAlbum = ()=>{
    const element = document.getElementById("add-album")
    url = element.value
    photo_src[url] = []
    albums = [...albums, url]
    listAlbum()   
}

const deletePhoto = () =>{ 
    if(state.can_delete){
        if(state.on_album){
            const {current_album} = state
            const delete_album = albums[current_album-1]
            albums.splice(current_album-1, 1)
            delete photo_src[delete_album]
            state.album = albums[0]
            listAlbum()
            highlightAlbum()
        }else{
            const {current_photo, album} = state
            state.total_photo -= 1
            photo_src[album].splice(current_photo-1, 1)
            changePhoto()
            changeAlbumNumber(album)
        }
    }
}

function listenPhoto(){
    const elements = document.getElementsByClassName("photo-item")
    Array.from(elements).forEach(function(element) {
        element.addEventListener('click', changeLargePhoto);
    });
    const element = document.getElementById("add-photo-button")
    element.addEventListener('click', addPhoto)
}

function listenAlbum(){
    albums.map((album)=>{
        document.getElementById(`album-bottom-${album}`).addEventListener("click", changeAlbum(album))
    })
    const element = document.getElementById("add-album-button")
    element.addEventListener('click', addAlbum)
}

window.addEventListener('keydown', function (e) {
  if(e.key == "Backspace" || e.key == "Delete"){
    deletePhoto()
  }
}, false);

listAlbum()
highlightAlbum()
changePhoto()
listenPhoto()

        







