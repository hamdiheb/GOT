import { render } from "./script.js";
export async function apifetchShow(){
    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    return data;
}

async function apiFetchEps(showID){
    const render = document.querySelector(".rendering");
    const res = await fetch(`https://api.tvmaze.com/shows/${showID}/episodes`);
    if(res.ok){
        const data = await res.json();
        render.innerHTML ='';
        return data;
    }else{
        render.innerText = `API data couldn't be rendered Error ${res.status}`;
    }
}

function addshowsSelector(allshows){
    const selectShows = document.querySelector(".show-select");
    allshows.map(element => {
        const {name,id}=element;
        const newShow = document.createElement("option");
        newShow.id = id;
        newShow.classList.add('show-select-option');
        newShow.innerText = `${name}`;
        selectShows.append(newShow);
    });
}
export async function main(){
    const allshows= await apifetchShow();
    addshowsSelector(allshows);
    let showID =1;
    const allEpisodes=await apiFetchEps(showID);
    render(allEpisodes);

    selectShows.addEventListener("change", async (event) => {
        const showtarget = event.target.value;

        for(let i=0;i<allshows.length;i++){
            if(allshows[i].name === showtarget){
                showID = allshows[i].id;
            }
        }
        const showEp = await apiFetchEps(showID);
        render(showEp);
    });

}