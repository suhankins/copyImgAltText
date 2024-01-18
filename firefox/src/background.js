browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: 'copy-alt-text',
        title: 'Copy alt text',
        type: 'normal',
        contexts: ['image'],
    });
});

const findBySrcUrlAndCopyAltText = (srcUrl) => {
    const imgElement = document.querySelector(`[src="${srcUrl}"]`);
    const altText = imgElement.alt;
    navigator.clipboard.writeText(altText);
};

browser.contextMenus.onClicked.addListener((info, tab) => {
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: findBySrcUrlAndCopyAltText,
        args: [info.srcUrl],
    });
});
