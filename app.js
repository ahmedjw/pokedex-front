const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("searchBar");
const arrayHolder = [];
const data = [];
console.log(arrayHolder)

const fetchpokemon = async () => {
  let Promises = [];

  for (let i = 1; i <= 100; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    Promises.push(
      fetch(url).then((res) => {
        return res.json();
      })
    );
  }
  Promise.all(Promises).then((R) => {
    R.forEach((pokemons) => {
      const currentItem = {
        Name: pokemons.name,
        Id: pokemons.id,
        Img: pokemons.sprites.front_default,
        type: pokemons.types.map((type) => type.type.name).join(", "),
      };
      data.push(currentItem);
      arrayHolder.push(currentItem);
    });
    desplayPokemons(data);
  });
};
const desplayPokemons = (pokemon) => {
  console.log(pokemon);
  const dataHolder = [];
  for (let i = 0; i < 5; i++) {
    const elemnt = pokemon[Math.floor(Math.random() * pokemon.length)];
    dataHolder.push(`
        
        <li class=" col s3" >
       
      
        <div class="card " onclick="selectpokemon(${elemnt.Id})">
        
        <p class=" center grey-text text-darken-4 ">${elemnt.Id}</p>
        <div class=" center ">
             <img class="activator"  src="${elemnt.Img} "/>
                 </div>
       <h4 class="card-title activator grey-text text-darken-4 center ">${elemnt.Name}</h4>
       <p class=" center grey-text text-darken-4 ">${elemnt.type}</p>
      
       </div>

       </li>
        
       
        
        `);
  }
  pokemonHtml = dataHolder.join("");
  pokedex.innerHTML = pokemonHtml;
};
const  selectpokemon= async(id)=>{
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   
        const res = await fetch(url);
         const pokemon= await res.json();
         console.log(pokemon)
         popup(pokemon);
       
      
}
const popup=(pokemon)=>{
    const image=pokemon.sprites.front_default;
    const type=pokemon.types.map((type) => type.type.name).join(", ");
    const hp=pokemon.stats[0].base_stat;
    const attack=pokemon.stats[1].base_stat;
    const defence=pokemon.stats[2].base_stat;
    const sa=pokemon.stats[3].base_stat
    const sd=pokemon.stats[4].base_stat;
    const speed=pokemon.stats[5].base_stat;
   

    const pokemondetails=`
<li class=" col s12 center" >
       
      
<div class="card " >


<div class=" center ">
     <img class="activator"  src="${image} "/>
         </div>
         
<h4 class="card-title activator grey-text text-darken-4 center border ">${pokemon.name}</h4>
<div class="card-panel">
<h6>type(s)</h6>
<p  class=" center grey-text text-darken-4 btn disabled teal lighten-2">${type}</p>

</div>
<h4 class="center">Status</h4>

<label class=" textSize left"for="pokemon">hp:</label>
<progress id="pokemon" value="${hp}" max="100"> 32% </progress>
<br/><br/>
<label class="textSize left"for="pokemon">Attack:</label>
<progress id="pokemon" value="${attack}" max="100"> 32% </progress>
<br/><br/>
<label class="left textSize"for="pokemon">Defence:</label>
<progress id="pokemon" value="${defence}" max="100"> 32% </progress>
<br/><br/>
<label class="left textSize"for="pokemon">spicial-attack:</label>
<progress id="Pokemon textSize" value="${sa}" max="100"> 32% </progress>
<br/><br/>
<label class="left textSize"for="pokemon">special-defence:</label>
<progress id="pokemon" value="${sd}" max="100"> 32% </progress>
<br/><br/>
<label class="left textSize"for="pokemon">Speed:</label>
<progress id="pokemon" value="${speed}" max="100">  </progress>
<br/><br/>

</li>


`;
pokemondetails
pokedex.innerHTML=pokemondetails
}
searchBar.addEventListener("keyup", (e) => {
    const searchString=e.target.value;
    const filterdpokemon=arrayHolder.filter(pokemon=>{
      return  pokemon.Name.includes(searchString)
    })
    desplayPokemonsfromSearch(filterdpokemon)
   });
   const desplayPokemonsfromSearch = (pokemon) => {
       console.log(pokemon);
       const dataHolder = [];
      
         const elemnt = pokemon[Math.floor(Math.random() * pokemon.length)];
         dataHolder.push(`
             
             <li class=" col s3" >
            
           
             <div class="card " onclick="selectpokemon(${elemnt.Id})">
             
             <p class=" center grey-text text-darken-4 ">${elemnt.Id}</p>
             <div class=" center ">
                  <img class="activator"  src="${elemnt.Img} "/>
                      </div>
            <h4 class="card-title activator grey-text text-darken-4 center ">${elemnt.Name}</h4>
            <p class=" center grey-text text-darken-4 ">${elemnt.type}</p>
            </div>
            
            </li>
             
            
             
             `);
     
       pokemonHtml = dataHolder.join("");
       pokedex.innerHTML = pokemonHtml;
     };
fetchpokemon();
