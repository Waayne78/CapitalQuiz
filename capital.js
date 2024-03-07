const key = "Ra2HHFZLvYYn7v7ijJxYWukl18oL8czQwybROR2K";
const input = document.querySelector("input");
const submitBtn = document.querySelector(".btn-next");
let score = 0; // Déclaration de la variable score
let countryData = null; // Variable pour stocker les données du pays actuel

// Fonction pour obtenir un pays aléatoire
function getRandomCountry() {
    const url = `https://countryapi.io/api/all?apikey=${key}`;
    try {
        return axios.get(url);
    } catch (e) {
        console.error(e);
    }
}

function displayNewQuestion() {
    getRandomCountry()
        .then(res => {
            const body = res.data;
            console.log(body);
            const countries = Object.keys(body);
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
        alert("Mauvaise réponse");
    }
}

// Attacher l'événement click avec la fonction de vérification de réponse
submitBtn.addEventListener("click", checkAnswer);

// Afficher la première question au chargement
displayNewQuestion();
