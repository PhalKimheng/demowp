export const generateAttributes = (defaultAttributes) => {
    const id = genId;
    const attributes = { id };
    for (const key in defaultAttributes) {
        attributes[key] = {
            type: typeof defaultAttributes[key],
            default: defaultAttributes[key]
        };
    }
    return attributes;
};

export const cleansePostContent = (dirtyContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dirtyContent;
    const cleanContent = tempDiv.textContent || tempDiv.innerText || '';
    const imageLink = tempDiv.querySelector('img') ? tempDiv.querySelector('img').src : null;
    return { cleanContent, imageLink };
}

export const formatDate = (date) =>{
    return (new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '/'))
}

export const objectMapping = (object) => {
    return Object.keys(object).map(key => ({
        label: key,
        value: object[key]
    }));
};

export const genId = Math.random().toString(36).substr(2, 9);
export const isHorizontalStyle = (style) => style.includes("card-horizontal");
export const getRelativeTime = (date) => {
    return moment(date).fromNow();
};