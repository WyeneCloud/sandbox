const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
	greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

async function get_images_list() {
	let showNonSupported = document.getElementById("showNonSupported").ariaChecked
	let imagesList_div = document.getElementById("imagesList")
	invoke("get_all_docker_images").then((result) => {
		let lignes = String(result).replace("\"", "").split('\n')
		console.log(lignes)
		lignes.forEach(ligne => {
			let row = ligne
			let collumns = row.split(",")

			if (collumns[0] == undefined || collumns[1] == undefined || collumns[2] == undefined) {
				return;
			}
			let name = collumns[1]

			console.log(collumns)
			let template = document.getElementById("ImageLine")
			const nouvelElementLi = document.createElement('li');
			nouvelElementLi.id = 'completeLine';
			let supported = false
			if (name.includes("_sandbox")) {
				supported = true
				name = name.replace("_sandbox", "")
			}
			if (showNonSupported && supported != true) {
				return;
			}
			// Créez des éléments p pour les classes "name", "size" et "supported" et ajoutez-leur du contenu.
			const nomElementP = document.createElement('p');
			nomElementP.classList.add('name');
			nomElementP.textContent = name; // Remplacez "Votre Nom" par le contenu souhaité.


			const tailleElementP = document.createElement('p');
			tailleElementP.classList.add('size');
			tailleElementP.textContent = collumns[2]; // Utilisez votre nombre défini.

			const supportElementP = document.createElement('p');
			supportElementP.classList.add('supported');
			if (supported) {
				supportElementP.innerHTML = '&#9989'; // Vous pouvez personnaliser ceci.
			} else {
				supportElementP.innerHTML = '&#10060'; // Vous pouvez personnaliser ceci.
			}
			// Créez un bouton.
			const boutonElement = document.createElement('button');
			boutonElement.textContent = 'Start';

			// Ajoutez les éléments p et le bouton à l'élément li.
			nouvelElementLi.appendChild(nomElementP);
			nouvelElementLi.appendChild(tailleElementP);
			nouvelElementLi.appendChild(supportElementP);
			nouvelElementLi.appendChild(boutonElement);

			// Ajoutez l'élément li créé au document (par exemple, à un conteneur existant).
			template.appendChild(nouvelElementLi);

		});
	});
}



window.addEventListener("DOMContentLoaded", () => {
	get_images_list();
	let showNonSupported = document.getElementById("showNonSupported")
	showNonSupported.addEventListener('click', () => {
		get_images_list();
	})
	greetInputEl = document.querySelector("#greet-input");
	greetMsgEl = document.querySelector("#greet-msg");
	document.querySelector("#greet-form").addEventListener("submit", (e) => {
		e.preventDefault();
		greet();
	});
});
