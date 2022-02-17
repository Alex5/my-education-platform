import vkIcon from '../assets/social-icons/vk.svg';
import githubIcon from '../assets/social-icons/github.svg';
import odnoklassnikiIcon from '../assets/social-icons/odnoklassniki.svg';
import telegramIcon from '../assets/social-icons/telegram.svg';
import instagramIcon from '../assets/social-icons/instagram.svg';
import {ISocialInfo} from '../components/Author/components/AuthorSocialMediaAccounts';
import {nanoid} from "nanoid";

export const snipText = (text: string, length?: number): string => {
    return text ?
        text.length > 25
            ? `${text.slice(0, length || 25)}...`
            : text
        : ''
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

export const courseDeclinations = (size: number) => {
    return size === 0
        ? 'курсов'
        : size === 1
            ? 'курс'
            : size > 1 && size < 5
                ? 'курса'
                : size > 4
                    ? 'курсов'
                    : ''
}


export const getSocialInfo = (link: string): ISocialInfo => {
    const github = link.includes('github.com');
    const vk = link.includes('vk.com');
    const instagram = link.includes('instagram.com');
    const telegram = link.includes('telegram.me') || link.includes('t.me');
    const ok = link.includes('ok.ru');

    switch (true) {
        case github:
            return {
                name: link.split('/')[3],
                link,
                company: 'github',
                icon: githubIcon,
                id: nanoid()
            }
        case vk:
            return {
                name: link.split('/')[3],
                link,
                company: 'vk',
                icon: vkIcon,
                id: nanoid()
            }
        case instagram:
            return {
                name: link.split('/')[3],
                link,
                company: 'instagram',
                icon: instagramIcon,
                id: nanoid()
            }
        case telegram:
            return {
                name: link.split('/')[3],
                link,
                company: 'telegram',
                icon: telegramIcon,
                id: nanoid()
            }
        case ok:
            return {
                name: link.split('/')[3],
                link,
                company: 'ok',
                icon: odnoklassnikiIcon,
                id: nanoid()
            }
        default:
            return {
                name: '',
                link: '',
                company: '',
                icon: '',
                id: ''
            };
    }
}