const key = "Ra2HHFZLvYYn7v7ijJxYWukl18oL8czQwybROR2K"; // Clé API
const refresh = document.querySelector(".btn-refresh"); // Sélectionner le bouton de rafraîchissement
const input = document.querySelector("input"); // Sélectionner l'élément input
const submitBtn = document.querySelector(".btn-next"); // Sélectionner le bouton
let score = 0; // Déclaration de la variable score
let countryData = null; // Variable pour stocker les données du pays actuel

// Fonction pour obtenir un pays aléatoire
function getRandomCountry() {
    const url = `https://countryapi.io/api/all?apikey=${key}`; // URL de l'API
    try {
        return axios.get(url);
    } catch (e) {
        console.error(e);
    }
}

let questionCount = 0; // Variable pour compter le nombre de questions

function displayNewQuestion() {
    if (questionCount >= 10) {
        // Si le nombre de questions atteint 10, afficher le score final
        alert("Partie terminée. Votre score final est de " + score);
        location.reload();
    }

    getRandomCountry()
        .then(res => {
            const body = res.data;
            console.log(body);
            const countries = Object.keys(body); // Récupérer les clés de l'objet
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            const country = body[randomCountry].name;
            const capital = body[randomCountry].capital.toLowerCase();
            const flag = body[randomCountry].flag.medium;
            const img = document.querySelector("img");
            img.src = flag;
            const h2 = document.querySelector("h2");
            h2.textContent = "Quel est la capital de " + country + " ?";
            const p = document.querySelector("p");
            p.textContent = "Score: " + score;
            countryData = { country, capital };
            questionCount++; // Incrémenter le nombre de questions
        })
        .catch(e => console.error(e));
}

function checkAnswer() {
    if (input.value === countryData.capital) {
        alert("Bonne réponse");
        score++;
        displayNewQuestion();
        input.value = "";
    } else {
        input.value = "";
        const answer = " Mauvaise, réponse ! La bonne réponse est " + countryData.capital;
        alert(answer);
        displayNewQuestion();

    }
}


refresh.addEventListener("click", function () {
    location.reload();
});


// Attacher l'événement click avec la fonction de vérification de réponse
submitBtn.addEventListener("click", checkAnswer);
// Attacher l'événement keypress pour détecter l'appui sur la touche "Entrée"
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Afficher la première question au chargement
displayNewQuestion();
