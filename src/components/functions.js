export const showAvatar = (img) =>{
    if(typeof img === 'object'){
        return URL.createObjectURL(img)
    }else if(img?.startsWith('src')){
        return `http://localhost:3000/${img.replace('src\\uploads', 'files')}`
    }else if(!img){
        return `/imgs/default-avatar.png`
    }else{
        return img;
    }
}

export const showImg = (img) =>{
    if(typeof img === 'object'){
        return URL.createObjectURL(img)
    }else if(img?.startsWith('src')){
        return `http://localhost:3000/${img.replace('src\\uploads', 'files')}`
    }else if(!img){
        return `/imgs/default-img.png`
    }else{
        return img;
    }
}