function createContextMenu() {
    chrome.contextMenus.create({
        id: 'copy-alt-text',
        title: 'Copy alt text',
        type: 'normal',
        contexts: ['image', 'video'],
    });
}

// Chrome requires you to register your context menu like this,
// but in Firefox, onInstalled is triggered only once - on install.
// So below we call create context menu again for Firefox.
chrome.runtime.onInstalled.addListener(() => createContextMenu());
createContextMenu();

/**
 * Context menu callback doesn't return IMG element itself,
 * instead it returns some data about it, so we use this
 * data to find it in the file.
 * @param {string} srcUrl 
 */
const findBySrcUrlAndCopyAltText = (srcUrl) => {
    const imgElement = document.querySelector(`[src="${srcUrl}"], [srcset*="${srcUrl}"]`);

    const altText = imgElement.alt || imgElement.title;
    
    navigator.clipboard.writeText(altText);
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: findBySrcUrlAndCopyAltText,
        args: [info.srcUrl],
    });
});
