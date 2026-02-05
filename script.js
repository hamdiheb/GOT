function render(){
    const allEpisodes = getAllEpisodes();
    allEpisodes.map(element => {
        document.querySelector(".episodes-display").append(episodeComponent(element));
    });
    
    const inputSearch = document.querySelector("#search-input");
    inputSearch.addEventListener("keydown", (event) =>{
    if(event.keyCode === 13){
        filterEpisodes(inputSearch.value);
    }
    });
}

function episodeComponent(element){
    const {name, season, number, summary} = element;
    const {medium} = element.image;
    const componentCloned = document.querySelector("template").cloneNode(true);
    componentCloned.content.querySelector("h5").innerText = `S${season.toString().padStart(2,'0')}E${number.toString().padStart(2,'0')}`;
    componentCloned.content.querySelector("img").src = medium;
    componentCloned.content.querySelector("h3").innerText = `${name}`;
    componentCloned.content.querySelector("p").innerHtml = summary;
    const newArticle = document.createElement("div");
    newArticle.classList.add("episode-component");
    newArticle.append(componentCloned.content);
    return newArticle;
}

function filterEpisodes(input){
    const allEpisodes = getAllEpisodes();
    console.log(allEpisodes.filter(element => {
        if(element.name.toUpperCase().includes(input.toUpperCase())){
            const newcomponent = episodeComponent(element);
            document.querySelector(".episodes-display").innerHTML = `<article class="episodes-display"></article`;
            document.querySelector(".episodes-display").append(newcomponent);
        }
    }));
    
}

render();