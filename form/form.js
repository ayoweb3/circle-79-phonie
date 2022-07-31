const body = document.querySelector("body");
const container = document.querySelector(".container");
const title = document.querySelector("h2");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const form = document.getElementById("form");
const PhoneNumber = document.getElementById("phone_num");
const networkImage = document.querySelector("span");
const errorMessage = document.querySelector("small");
const logo = document.querySelector(".logo");
const designBtn = document.querySelector(".design-btn")
const toggleBtn = document.querySelector(".toggle-btn");
const mtnPrefix = [	"0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913"];
const gloPrefix = ["0705", "0805", "0807", "0811", "0815", "0905"];
const airtelPrefix = ["0701", "0708", "0802", "0808", "0812", "0902", "0907", "0901", "0912"];
const etisalatPrefix = ["0809", "0817", "0818", "0908", "0909"];
const prefixArr= [...mtnPrefix, ...gloPrefix, ...airtelPrefix, ...etisalatPrefix];
const themeArr = [body, firstName, lastName, PhoneNumber, title, designBtn]

const network = {
    mtn: "../images/mtn.png",
    glo: "../images/glo.jpg",
    airtel: "../images/airtel.png",
    etisalat: "../images/9mobile.png"

};


const {mtn, glo, airtel, etisalat} = network;
let inputValue = "";
let inputPrefix = "";

toggleBtn.addEventListener("click", e => {
    if (toggleBtn.src.match("dark")) {
       toggleBtn.src = "../images/light-toggle.png";
       logo.src = "../images/light-alt.png"
    }else {
       toggleBtn.src = "../images/dark-toggle.png";
       logo.src = "../images/dark-alt.png";
    }
   
   changeTheme(themeArr, "dark");
   
   })

   function changeTheme(arr, className) {
    arr.forEach(element => element.classList.toggle(`${className}`));
} 


PhoneNumber.addEventListener("input", (e) => {
     networkImage.innerHTML = "";   
     inputValue = e.target.value
     inputPrefix = inputValue.slice(0, 4);
   
    //checking for countrycode
    if (inputValue.startsWith("+") && inputValue.length <= 14 ) {
         inputPrefix = inputValue.slice(4, 7);
         inputPrefix = "0" + inputPrefix
         if (inputValue.startsWith("+234")) {
            detectNetwork() 
         }else {
            errorMessage.textContent = `* Only Nigeria call code is supported` 
         }
               
    }else if (inputValue.startsWith("0") && inputValue.length <= 11) {
        detectNetwork() 

    }else {
            errorMessage.textContent = `* Insert corect phone number` 
        }   

})

form.addEventListener("submit", e => {
if (errorMessage.textContent === "" && (inputValue.startsWith("0") && inputValue.length === 11 || inputValue.startsWith("+234") && inputValue.length === 14)) {

    window.location.href ="../response/response.html"
   
}else {
    errorMessage.textContent = `* Insert corect phone number` 
}  
e.preventDefault();

})

 function detectNetwork()  {
    errorMessage.textContent = "";
    renderNetwork(mtnPrefix, mtn);
    renderNetwork(gloPrefix, glo);
    renderNetwork(airtelPrefix, airtel);
    renderNetwork(etisalatPrefix, etisalat);       
}

function renderNetwork (prefix,networkName){  
    prefix.forEach(num => {
        if(num === inputPrefix){
            networkImage.innerHTML = `<img class="network-logo" src="${networkName}"></img>` 
        }else {
            return
        }
    })
}
autocomplete(PhoneNumber,prefixArr);

function autocomplete(autocomplete_input, suggestions) {
    let autocomplete_item = "";
    let total_autocomplete = document.getElementsByClassName('autocomplete-input').length
    autocomplete_input.parentNode.style.position = "relative";
    autocomplete_input.classList.add('autocomplete-input');
    autocomplete_input.setAttribute('data-autocomplete-list-id', "autocomplete-list-" + (total_autocomplete + 1));
    autocomplete_input.setAttribute('autocomplete', "off");
    autocomplete_input.addEventListener("input", function(e) {
    	// let this = this;
        let string_to_match = this.value.toLowerCase();
        let autocomplete_list_id = this.getAttribute('data-autocomplete-list-id');
        removeLists();

        if (string_to_match) {
           
            currentOption = -1;
            let regex = new RegExp( '(' + string_to_match + ')', 'gi' );

            let autocomplete_list = document.createElement("DIV");
	        autocomplete_list.setAttribute("id", autocomplete_list_id);
	        autocomplete_list.setAttribute("class", "autocomplete-list shadow border");
	        // autocomplete_list.style.marginTop = "0px";
	        autocomplete_list.style.maxHeight = "300px";
	        autocomplete_list.style.overflowY = "auto";
            autocomplete_list.style.cursor = "pointer";
            autocomplete_list.style.background = "whiteSmoke";
            
	        let autocomplete_items = document.createElement("DIV");
	        autocomplete_items.setAttribute("class", "list-group list-group-flush autocomplete-items");

	        suggestions.forEach(function(suggestion) {
	        	if (suggestion.toLowerCase().includes(string_to_match)) {
	        		autocomplete_item = document.createElement("DIV");
	                autocomplete_item.setAttribute('class', 'list-group-item list-group-item-action');
		        	autocomplete_item.setAttribute("data-autocomplete-text", suggestion);
	                autocomplete_item.innerHTML = suggestion.replace(regex, "<b>$1</b>" );
                    autocomplete_item.style.paddingBottom = "5px";
                   

	                autocomplete_item.addEventListener("click", function(e) {
	                    autocomplete_input.value = this.getAttribute("data-autocomplete-text");
	                    autocomplete_items.remove();
                        
	                });

	                autocomplete_items.appendChild(autocomplete_item);
	        	}
	        });

	        autocomplete_list.appendChild(autocomplete_items);
	        this.parentNode.appendChild(autocomplete_list);    
           
        }
        
    });

    function removeLists(element) {
        let autocomplete_lists = document.getElementsByClassName("autocomplete-list");
        Array.from(autocomplete_lists).forEach(autocomplete_list => {
            if (element != autocomplete_list && element != autocomplete_input) {
                autocomplete_input.focus();  // after selection, focus on the input field
    			autocomplete_list.remove();
            }
            
		});
    }

    // checking network for selected prefix 
    autocomplete_input.addEventListener("focus",( e => {
     inputValue = e.target.value;
     inputPrefix = inputValue;
     detectNetwork();
    }));

    // close autocomplete when there is a click anywhere on the document 
    document.addEventListener("click", function(e) {
        removeLists(e.target);
    });
    
}