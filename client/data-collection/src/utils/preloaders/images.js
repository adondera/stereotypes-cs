var images = {};

export const preload = (questions) => {
    for (var i = 0; i < questions.length; i++) {
        if(questions[i].image){
           if(questions[i].image.link !== undefined) {
               images[questions[i].image.link] = new Image();
               images[questions[i].image.link].src = questions[i].image.link;

           }
        } 
    }
}

export const fetchImage = (link) => {
    return images[link]
}
//--

export default images