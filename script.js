const text = (title, explanation) => {
    return `
    <div id="container">
        <div class="dailyTitle">
            <h2>${title}</h2>
        </div>
        <div class="paragraph">
            <p>${explanation}</p>
        </div>
    </div>
    `;
};

const image = (img) => {
    return `
        <div id="mediaContainer">
            <img src="${img}"></img>
        </div>
    `
}

const video = (video) => {
    return `
    <div id="mediaContainer">
        <iframe src="${video}"></iframe>
    </div>
    `
}

//A function to fetch when the page loads
const todayFetch = async () => {

    let rootElement = document.getElementById("root");

    const nasaApiKey = "miqERbSb62hxqg4SbPUozPDc1WtXjrIhv6V0NPfz";

    const today = new Date();

    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    //console.log(date)
    
    const requestedDate = date; //pl 2022-4-8
    
    let todayString = today.toISOString()

    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);

    const apodJson = await apod.json();

    //console.log(apodJson)

    const contentRight = document.getElementById("contentRight")

    if (apodJson.media_type === "video"){
        contentRight.insertAdjacentHTML("beforeend", video(apodJson.url));
    }else{
        contentRight.insertAdjacentHTML("beforeend", image(apodJson.url));
    }

    const contentLeft = document.getElementById("contentLeft")

    contentLeft.insertAdjacentHTML("beforeend", text(apodJson.title, apodJson.explanation))
}

const datePicker = () => {
    
    const today = new Date();

    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    if (today.getMonth()+1<10) {
        date = today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate();        
    }

    let datePickerHTML = document.getElementById("datePickerContainer");

    datePickerHTML =
    `
        <div id="datePickerContainer">
            <form class="datePicker">
                <label for="datePick">Choose a day:</label>
                <input type="date" id="datePick" name="datePick"
                min="1995-06-16" max=${date}>
            </form>
        </div>        
    `;

    return datePickerHTML
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
        rootElement.insertAdjacentHTML("beforeend", htmlBodyWithImg(apodJson.title, apodJson.explanation, apodJson.url));
    }
}

const contentLeftAndRight = () => {
    return `
        <div class="mainTitle">
            <span class="mainTitleLoader"></span>
            <h1>What happened in space?</h1>
        </div>
        <div id="contentLeft"></div>
        <div id="contentRight"></div>
    `
}

const loadEvent = () => {

    console.log("page is loaded");

    let rootElement = document.getElementById("root");

    rootElement.insertAdjacentHTML("beforeend", contentLeftAndRight())
    
    todayFetch();
    
    let contentRight = document.getElementById("contentRight");
    
    contentRight.insertAdjacentHTML("afterend", datePicker());
    //console.log(datePickerHTML)

    let picker = document.getElementById("datePick");

    picker.addEventListener("change", chosenDateFetch);
}

window.addEventListener("load", loadEvent);