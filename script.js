const contentLeftAndRight = () => {
    return `
        <video autoplay muted loop id="myVideo">
            <source src="./video.mp4" type="video/mp4">
        </video>
        <div class="mainTitle">
            <span class="mainTitleLoader"></span>
            <h1>What happened in space?</h1>
        </div>
        <div id="contentLeft"></div>
        <div id="contentRight"></div>
    `
}

const text = (title, explanation) => {
    return `
        <div id="dailyTitleID" class="dailyTitle">
            <h2>${title}</h2>
        </div>
        <div id="paragraphID" class="paragraph">
            <p>${explanation}</p>
        </div>
    `;
};

const image = (img) => {
    return `
        <div id="mediaContainerID">
            <img src="${img}"></img>
        </div>
    `
}

const video = (video) => {
    return `
        <div id="mediaContainerID">
            <iframe src="${video}"></iframe>
        </div>
    `
}
const datePicker = () => {
    
    const today = new Date();

    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    if (today.getMonth()+1<10) {
        date = today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate();        
    }

    let datePickerHTML =
    `
        <div id="datePickerContainer">
            <form class="datePicker">
                <label for="datePick">Choose a day:</label>
                <input type="date" id="datePick" name="datePick"
                min="1995-06-16" max=${date}>
            </form>
        </div>        
    `;
    
    return datePickerHTML;
}

//A function to fetch when the page loads
const todayFetch = async () => {

    const nasaApiKey = "miqERbSb62hxqg4SbPUozPDc1WtXjrIhv6V0NPfz";

    const today = new Date();

    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    
    const requestedDate = date; //pl 2022-4-8
    
    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);

    const apodJson = await apod.json();

    const contentLeft = document.getElementById("contentLeft")

    contentLeft.insertAdjacentHTML("beforeend", text(apodJson.title, apodJson.explanation))

    const contentRight = document.getElementById("contentRight")

    if (apodJson.media_type === "video"){
        contentRight.insertAdjacentHTML("beforeend", video(apodJson.url));
    }else{
        contentRight.insertAdjacentHTML("beforeend", image(apodJson.url));
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

    const nasaApiKey = "miqERbSb62hxqg4SbPUozPDc1WtXjrIhv6V0NPfz";

    const requestedDate = getValueOfPicker();

    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);

    const apodJson = await apod.json();

    const dailyTitle = document.getElementById("dailyTitleID")
    const paragraph = document.getElementById("paragraphID")
    const mediaContainer = document.getElementById("mediaContainerID")

    dailyTitle.remove();
    paragraph.remove();
    mediaContainer.remove();

    let contentLeft = document.getElementById("contentLeft")
    let contentRight = document.getElementById("contentRight")

    contentLeft.insertAdjacentHTML("beforeend", text(apodJson.title, apodJson.explanation))

    if (apodJson.media_type === "video"){
        contentRight.insertAdjacentHTML("beforeend", video(apodJson.url));
    }else{
        contentRight.insertAdjacentHTML("beforeend", image(apodJson.url));
    }
}

const loadEvent = () => {

    console.log("page is loaded");

    let rootElement = document.getElementById("root");

    rootElement.insertAdjacentHTML("beforeend", contentLeftAndRight())
    
    todayFetch();
    
    let contentRight = document.getElementById("contentRight");
    
    contentRight.insertAdjacentHTML("beforeend", datePicker());

    let picker = document.getElementById("datePick");

    picker.addEventListener("change", chosenDateFetch);
}

window.addEventListener("load", loadEvent);