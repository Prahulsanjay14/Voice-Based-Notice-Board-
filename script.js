let recognition;
let notices = JSON.parse(localStorage.getItem("notices")) || [];

window.onload = function () {
    displayNotices();
};

function startRecognition() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech Recognition not supported in this browser");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
        let speechText = event.results[0][0].transcript;
        document.getElementById("voiceText").innerText = speechText;

        notices.push(speechText);
        localStorage.setItem("notices", JSON.stringify(notices));

        displayNotices();
    };

    recognition.onerror = function () {
        alert("Error occurred in recognition");
    };
}

function displayNotices() {
    let noticeList = document.getElementById("noticeList");
    noticeList.innerHTML = "";

    notices.forEach(function (notice) {
        let li = document.createElement("li");
        li.innerText = notice;
        noticeList.appendChild(li);
    });
}

function clearNotices() {
    localStorage.removeItem("notices");
    notices = [];
    displayNotices();
}
