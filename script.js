import {main} from './render.js';

export function render(allEpisodes){
        document.querySelector(".episode-numbers") .innerText = `Displaying ${allEpisodes.length} EP`; // Render Dynamic Data about episodes
        document.querySelector(".episodes-display").innerHTML = cleanDisplay();
    function renderAll(){
        allEpisodes.map(element => {
        document.querySelector(".episodes-display").append(episodeComponent(element));
    })};
    
    renderAll();
    const inputSearch = document.querySelector("#search-input");
    inputSearch.addEventListener("keyup", () =>{
        filterEpisodes(allEpisodes,inputSearch.value);
    }); 


    
    const select = document.querySelector("#select-season");
    select.innerHTML = `<select class="search-option" id="select-season"></select>`
    const episodesList = allEpisodes.map(element => {
        const optionClone = document.createElement("option");
        optionClone.classList.add("season-select-option");
        optionClone.innerText = `${element.name}`;
        select.append(optionClone);
    });

    select.addEventListener("change", (event) => {
        const selectedOption = event.target.value;
        selectedOption!='All Seasons' ? filterEpisodes(allEpisodes,selectedOption) : renderAll();
    });
}

function episodeComponent(element){
    const {name, season, number, summary} = element;
    const {medium} = element.image;
    const componentCloned = document.querySelector("template").cloneNode(true);
    componentCloned.content.querySelector("h5").innerText = `S${season.toString().padStart(2,'0')}E${number.toString().padStart(2,'0')}`;
    componentCloned.content.querySelector("img").src = medium;
    componentCloned.content.querySelector("h3").innerText = `${name}`;
    componentCloned.content.querySelector(".episode-summary").innerHTML = element.summary;
    const newArticle = document.createElement("div");
    newArticle.classList.add("episode-component");
    newArticle.append(componentCloned.content);
    return newArticle;
}

function filterEpisodes(allEpisodes,input){
    document.querySelector(".episodes-display").innerHTML = cleanDisplay();
    let count =0;
    allEpisodes.filter(element => {
        if((element.name.toUpperCase().includes(input.toUpperCase())) || (element.summary.toUpperCase().includes(input.toUpperCase()))){
            const newcomponent = episodeComponent(element);
            document.querySelector(".episodes-display").append(newcomponent);
            count++;
            document.querySelector(".episode-numbers") .innerText = `Displaying ${count}/${allEpisodes.length}`;
        }
    });
}

function cleanDisplay(){
    return                     `<template class="episode-component">
                    <h5 class="episode-nb-sn">S01E01</h5>
                    <img class="episode-img" src="http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg" alt="episode-image"/>
                    <h3 class="episode-title margin">Winter is Coming</h3>
                    <p class="episode-summary margin">Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>
                    <div class="episode-duration-rate">
                        <p>62 min</p>
                        <p><img class="rate-ep" src="./img/star-svgrepo-com.svg"/>8.1</p>
                    </div>
                </template>
    `;
}
main();
