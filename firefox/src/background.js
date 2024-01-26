browser.contextMenus.create({
    id: 'copy-alt-text',
    title: 'Copy alt text',
    type: 'normal',
    contexts: ['image', 'video'],
});

const findBySrcUrlAndCopyAltText = (srcUrl) => {
    const imgElement = document.querySelector(`[src="${srcUrl}"]`);
    const altText = imgElement.alt || imgElement.title || '';
    navigator.clipboard.writeText(altText);
};

browser.contextMenus.onClicked.addListener((info, tab) => {
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: findBySrcUrlAndCopyAltText,
        args: [info.srcUrl],
    });
});
