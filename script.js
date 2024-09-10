// let user = prompt("Enter a word for meaning:");
let user = document.querySelector("input");
let btn = document.querySelector(".bttn");
let word = document.querySelector(".mainWord");
let meaning = document.querySelector("#meaning");
let wiki = document.querySelector("#wiki");
let audio = document.querySelector("#audio");
let h2 = document.querySelectorAll("h2");

btn.addEventListener("click", () => {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${user.value.toLowerCase()}`;
  console.log(user.value);
  dictnory(url);
});

user.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log(event);
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${user.value.toLowerCase()}`;
    console.log(user.value);
    dictnory(url);
  }
});

async function dictnory(url) {
  try {
    let obj = await axios.get(url);
    console.log(obj);
    let definition = obj.data[0].meanings[0].definitions[0].definition;
    let text = obj.data[0].word;
    let link = obj.data[0].sourceUrls[0];
    let awaaz = obj.data[0].phonetics[0].audio;
    h2.forEach((element) => {
      element.style.display = "block";
    });
    word.innerText = `${text.toUpperCase()}`;
    meaning.innerHTML = `${definition}`;
    wiki.innerHTML = `<a href = "${link}" target=__blank >${link} </a>`;
    audio.innerHTML = `<audio controls> <source src = "${awaaz}"> </audio>   `;
    console.log(text.toUpperCase());
  } catch (e) {
    console.log(e);
    word.innerHTML = "Word Not Found !";
    meaning.innerHTML = ``;
    wiki.innerHTML = ``;
    audio.innerHTML = ``;
    h2.forEach((h2) => {
      h2.style.display = "none";
    });
  }

  // console.log(definition);
  // console.log(dict.sourceUrls[0]);
  // console.log(dict.phonetics[0].audio);
}
