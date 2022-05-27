const htmlBodyWithImg = (title, explanation, img) => {
    return `
    <div id="container">
        <div class="title">
            <span class="block"></span>
            <h1>What happened in space?</h1>
        </div>
        <h2 id="h2">${title}</h2>
        <p id="p">${explanation}</p>
        <img id="img" src="${img}"></img>
    </div>
    `;
};

const htmlBodyWithVideo = (title, explanation, video) => {
    return `
    <div id="container">
        <div class="title">
            <span class="block"></span>
            <h1>What happened in space?</h1>
        </div>
        <h2 id="h2">${title}</h2>
        <p id="p">${explanation}</p>
        <iframe id="video" src="${video}"></iframe>
    </div>
`;
};

const datePicker = () => {
    
    const today = new Date();

    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    if (today.getMonth()+1<10) {
        date = today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate();        
    }

    const datePickerHTML = `
    <form id="datePicker">
        <label for="datePick">Choose a day:</label>
        <input type="date" id="datePick" name="datePick"
        min="1995-06-16" max=${date}>
    </form>
    `;

    return datePickerHTML
}

//A function to fetch when the page loads
const todayFetch = async () => {

    let rootElement = document.getElementById("root");

    const nasaApiKey = "miqERbSb62hxqg4SbPUozPDc1WtXjrIhv6V0NPfz";

    const today = new Date();

    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    console.log(date)
    
    const requestedDate = date; //pl 2022-4-8
    
    let todayString = today.toISOString()

    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);

    const apodJson = await apod.json();

    if (apodJson.media_type === "video"){
        rootElement.insertAdjacentHTML("beforeend", htmlBodyWithVideo(apodJson.title, apodJson.explanation, apodJson.url));
    }else{
        rootElement.insertAdjacentHTML("beforeend", htmlBodyWithImg(apodJson.title, apodJson.explanation, apodJson.hdurl));
    }
}

//A function to get the value of the datepicker
const getValueOfPicker = () => {
    const picker = document.getElementById("datePick");
    const valueOfPicker = picker.value;
    return valueOfPicker;
}

//A function to fetch a given date
const chosenDateFetch = async () => {

    let rootElement = document.getElementById("root");

    const nasaApiKey = "miqERbSb62hxqg4SbPUozPDc1WtXjrIhv6V0NPfz";

    const requestedDate = getValueOfPicker();

    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);

    const apodJson = await apod.json();

    const container = document.getElementById('container');

    container.remove();

    if (apodJson.media_type === "video"){
        rootElement.insertAdjacentHTML("beforeend", htmlBodyWithVideo(apodJson.title, apodJson.explanation, apodJson.url));
    }else{
        rootElement.insertAdjacentHTML("beforeend", htmlBodyWithImg(apodJson.title, apodJson.explanation, apodJson.hdurl));
    }
}

function loadEvent() {
    console.log("Load");

    todayFetch();

    let rootElement = document.getElementById("root");

    rootElement.insertAdjacentHTML("beforeend", datePicker());

    const picker = document.getElementById("datePick");

    picker.addEventListener("change", chosenDateFetch);


}

window.addEventListener("load", loadEvent);