(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const messages = [
    "nn yakin?",
    "benaran??",
    "Seriuss ? :/",
    "ayolahh...",
    "coba pikir ulang!",
    "masa nda sihh, sedih gw ntar...",
    "masa nda??...",
    "parah sih kalo nd...",
    "Baiklah, apa boleh buat...",
    "candaa, ayokk bilang iyaaa yahh! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    let musicTime = localStorage.getItem("musicTime");
    if (musicTime !== null) {
        audio.currentTime = parseFloat(musicTime);
    }

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicTime", audio.currentTime);
    });

    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            audio.muted = false; // Unmute setelah berhasil play
        }).catch(error => {
            console.warn("Autoplay diblokir, pengguna harus berinteraksi terlebih dahulu.");
        });
    }

    audio.onplay = function () {
        localStorage.setItem("musicPlaying", "true");
    };

    audio.onpause = function () {
        localStorage.setItem("musicPlaying", "false");
    };
});
