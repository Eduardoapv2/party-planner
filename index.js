const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2507-EdPerez";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE ;

let parties = [];
let selectedParty = null;

async function getParties() {
    try{
        const response = await fetch(API);
        const playload = await response.json();
        parties = playload.data;
        render ();
    }catch(err){
        console.error("failed to load party:", err);
    }
}
async function getParty(id) {
    try{
        const response = await fetch(`${API}/${id}`);
        const playload = await response.json();
        selectedParty = playload.data;
        render ();
    }catch(err){
        console.error("failed to load party:", err);
    }
}

function PartyListItem (party) {
    const $li = document.createElement("li");
    
    const $a = document.createElement("a");
    $a.href = "#selected";
    $a.textContent = party.name;
    $a.classList.add("party-button");
    $a.addEventListener("click", ()=> getParty(party.id));
    $li.appendChild($a);
    return $li;
}

function PartyList () {
    const $ul = document.createElement("ul");
    $ul.className = "lineup";
    
    if (!Array.isArray(parties)){
        const $li = document.createElement("li");
        $li.textContent="Parties not available.";
        $ul.append($li);
        return $ul;
    }
    parties.forEach(party =>{
        $ul.appendChild(PartyListItem(party));
    });
    return $ul;
    }

    function PartyDetails (){
        if (!selectedParty){
            const $p = document.createElement("p");
            $p.textContent = "Please select a party to learn more.";
            return $p;
        }
        const {name, id, date, description, location}=selectedParty;
        const $section=document.createElement("section");
        $section.className = "party";

        const $h3= document.createElement("h3");
        $h3.textContent=`${name} #${id}`;

        const $h4=document.createElement("h4");
        $h4.textContent =`${date} at ${location}`;
        
        const $p=document.createElement("p");
        $p.textContent=description;
        
        $section.append($h3, $h4, $p);
        return $section;
    }

    function render() {
        const $app = document.querySelector("#app");
        $app.innerHTML = `
        <h1>Party Planner</h1>
        <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
        `;
        $app.querySelector("PartyList").replaceWith(PartyList());
        $app.querySelector("PartyDetails").replaceWith(PartyDetails());
    }
    async function init() {
        await getParties();
        
    }
    init();