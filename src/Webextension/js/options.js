"use strict";

let url;
let defaultSettings;

function updateSetting(
    settingId,
    value
) {

    let element;

    element = document.getElementById(settingId);

    if (!element) {
        return;
    }

    switch (element.type) {

        case "checkbox":
            element.checked = value;
            break;

    }

    if (element.id === "darkTheme") {
        document.documentElement.dataset.dark = value;
    }

}

function onSettingsResponse(items) {

    console.log(items);

    if (document.getElementById("message")) {
        document.getElementById("message").textContent = JSON.stringify(items, null, 4);
    }

    for (let settingId in items) {
        if (items.hasOwnProperty(settingId)) {
            updateSetting(settingId, items[settingId]);
        }
    }

}

function onSettingsChanged(
    changes,
    namespace
) {
    console.log("options", changes);
    // for (let key in changes) {
    //     settings[key] = changes[key].newValue;
    // }
}

function onSettingsPageUpdate(event) {

    if (!event.target.classList.contains("setting")) {
        return
    }

    let data;

    data = {};
    data[event.target.id] = event.target.checked;

    chrome.storage.local.set(data, function (event) {
        console.log("onSettingsPageUpdate", event);
    });

    switch (event.target.id) {

        case "darkTheme":
            document.documentElement.dataset.dark = event.target.checked;
            break;

    }

}

function onPageClick(event) {

}

defaultSettings = {
    darkTheme: true,
    autoPlayVideo: false,
    maxResThumbnail: true
};

chrome.storage.onChanged.addListener(onSettingsChanged);

document.addEventListener("change", onSettingsPageUpdate, true);
document.addEventListener("click", onPageClick, true);

chrome.storage.local.get(defaultSettings, onSettingsResponse);
