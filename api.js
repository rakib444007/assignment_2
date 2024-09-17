


document.getElementById("search-btn").addEventListener('click',(event)=>{

    const searchData = document.getElementById("input-btn").value;
    
    AllData(searchData);

    document.getElementById("input-btn").value = "";
   



});

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        defaultData(data);
        
        
        

    });
  

const AllData=(info)=>{

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`)
    .then(res=>res.json())
    .then(data=>{
        
        DisplayData(data);
       
        
    })
    .catch((err)=>{

        const ans = document.getElementById("error");
        ans.append("Not found !")
    });



};

   
const defaultData =(data)=>{
    
   
    data.meals.forEach(element => {
        // console.log(data)
        const container = document.getElementById("data-container");
        const div = document.createElement("div");
        div.classList.add("child");

       

            
        div.innerHTML +=`
            <img id="data-img" class="mb-3" src="${element.strMealThumb}" alt="photo">
            <h5>Name: ${element.strMeal}</h5>
            <p>Category: ${element.strCategory}</p>
            <p>Origin:${element.strArea}</p>
            <p>Type: ${element.strTags}</p>
            <p class="des">Description: ${element.strInstructions.slice(0,50)}
            <br>
            <button id="add" onclick="AllName('${element.strMeal}')" class="btn-add bg-primary text-white ">Add to cart</button>
            <button id="details" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="DisplayDetails('${element.idMeal}')" class="btn-add bg-primary text-white mt-3 tt">Details</button>
            <a href="http://${element.strInstagram}" target="_blank"><i class="fa-brands fa-instagram mt-4 st "></i></a>
            <a href="${element.strYoutube}" target="_blank"><i class="fa-brands fa-youtube st"></i></i></a>
            
        `;


        

        container.appendChild(div);
    });


}


const DisplayData = (data) => {
    const container = document.getElementById("data-container");
    document.getElementById("data-container").innerHTML =" ";
    data.meals.forEach(element => {
        
        const div = document.createElement("div");
        div.classList.add("child");

   
        div.innerHTML +=`
           <img id="data-img" class="mb-3" src="${element.strMealThumb}" alt="photo">
            <h5>Name: ${element.strMeal}</h5>
            <p>Category: ${element.strCategory}</p>
            <p>Origin:${element.strArea}</p>
            <p>Type: ${element.strTags}</p>
            <p class="des">Description: ${element.strInstructions.slice(0,50)}
            <br>
            <button id="add" onclick="AllName('${element.strMeal}')" class="btn-add bg-primary text-white ">Add to cart</button>
            <button id="details" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="DisplayDetails('${element.idMeal}')" class="btn-add bg-primary text-white mt-3 tt">Details</button>
            <a href="http://${element.strInstagram}" target="_blank"><i class="fa-brands fa-instagram mt-4 st "></i></a>
            <a href="${element.strYoutube}" target="_blank"><i class="fa-brands fa-youtube st"></i></i></a>
        `;

        container.appendChild(div);
    });
}

const DisplayDetails = (info) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
        .then(res => res.json())
        .then(data => {
          

            const content = document.getElementById("modal-body");

            // Clear existing content before appending new details
            content.innerHTML += "";

            const div = document.createElement("div");
            div.classList.add("dis-details");

            const meal = data.meals[0]; // Access the first player

            div.innerHTML = `
                <img id="popup" class="mb-3" src="${meal.strMealThumb}" alt="photo">
                <p>Ingredient1: ${meal.strIngredient1}</p>
                <p>Ingredient2: ${meal.strIngredient2}</p>
                <p>Ingredient3: ${meal.strIngredient3}</p>
                <p>Ingredient4: ${meal.strIngredient4}</p>
                <p>Ingredient5: ${meal.strIngredient5}</p>
                <p>Ingredient6: ${meal.strIngredient6}</p>
                <p>Ingredient7: ${meal.strIngredient7}</p>
                <p>Ingredient8: ${meal.strIngredient8}</p>
                <p>Ingredient9: ${meal.strIngredient9}</p>
                <p>Ingredient10: ${meal.strIngredient10}</p>
            `;

            content.appendChild(div);
        })
        document.getElementById("modal-body").innerHTML = "";
};

 

const AllName = (name) => {
    const member = document.getElementById("Total-member").innerText;
    let memberCount = parseInt(member);


    if (memberCount < 11) {
        memberCount += 1;
        document.getElementById("Total-member").innerText = memberCount;

      
        const Name = document.getElementById("card-main-container");
        const n = document.createElement("h6");
        n.innerText = name;
        Name.append(n);

        
        
    } else {
        modalName(); 
    }
};




const modalName = () => {
    const name = document.getElementById("modal-body-1");
    name.innerHTML = ''; 
    const div = document.createElement("div");
    div.classList.add("parent")
    div.innerHTML = `
        <h3>You cannot add more than 11 meals!</h3>
    `;

    name.appendChild(div);

    const modal = new bootstrap.Modal(document.getElementById('exampleModal-1'));
    modal.show();
};
