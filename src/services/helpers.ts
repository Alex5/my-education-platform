export const snipText = (text: string, length?: number): string => {
    return text.length > 25 ? `${text.slice(0, length || 25)}...` : text
}

export const formatEmbedLink = (iframeLink: string): string => {
    if (!iframeLink.startsWith('<iframe')) {
        return ''
    } else {
        const searchedLink = iframeLink.replace("<iframe", "").trim().match(/src="(.*?)"/);
        return searchedLink ? searchedLink[1] : '';
    }
}

export const updateObjectProp = (key: string, obj: any, newValue: any) => ({...obj, [key]: newValue});
