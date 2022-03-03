import {Input, Spacer, Grid} from "@geist-ui/core"
import {PlusCircle} from "@geist-ui/react-icons";
import {nanoid} from "nanoid";
import {FC, useState} from "react"
import SocialCard from "./components/SocialCard";
import {ICourse} from "../../../../redux/slices/coursesSlice/types";
import {getSocialInfo} from "../../../../services/helpers";

export type CompanyType = 'github' | 'vk' | 'instagram' | 'telegram' | 'ok' | '';

export interface ISocialInfo {
    id: string;
    name: string;
    link: string;
    company: CompanyType;
    icon: string;

}

interface Props {
    handleUpdateState: (key: keyof ICourse, targetValue: any) => void;
    existSocials: ISocialInfo[]
}

const AuthorSocialMediaAccounts: FC<Props> = ({handleUpdateState, existSocials}) => {
    const [link, setLink] = useState<string>('');
    const [socials, setSocials] = useState<ISocialInfo[]>(existSocials || []);

    const handleAddSocial = () => {
        const social = getSocialInfo(link);

        const addSocial: ISocialInfo[] = [...socials, {
            id: social.id,
            link,
            name: social.name,
            company: social.company,
            icon: social.icon
        }]

        setSocials(addSocial)
        handleUpdateState('socialAccounts', addSocial);
        setLink('');
    }

    const deleteSocial = (id: string) => {
        const deleteSocial = socials.filter(social => social.id !== id);
        setSocials(deleteSocial)
        handleUpdateState('socialAccounts', deleteSocial);
    }

    return (
        <>
            <Input
                width={'100%'}
                onChange={(e) => setLink(e.target.value)}
                onIconClick={handleAddSocial}
                value={link}
                iconClickable={!!link}
                iconRight={link ? <PlusCircle/> : <></>}
                placeholder="https://github.com/Alex5"
            >
                Вставьте ссылку на соц. сеть
            </Input>
            <Spacer h={3}/>
            <Grid.Container gap={2}>
                {socials && socials.map(social => (
                    <Grid key={social.id} xs={8}>
                        <SocialCard
                            id={social.id}
                            name={social.name}
                            icon={social.icon}
                            link={social.link}
                            deleteSocial={deleteSocial}
                        />
                    </Grid>
                ))}
            </Grid.Container>
        </>
    )
}

export default AuthorSocialMediaAccounts;