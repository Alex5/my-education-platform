import { Input, Spacer, Grid } from "@geist-ui/core"
import { PlusCircle } from "@geist-ui/react-icons";
import { nanoid } from "nanoid";
import { useState } from "react"
import SocialCard from "./components/SocialCard";

interface ISocial {
    id: string;
    link: string
}

const AuthorSocialMediaAccounts = () => {
    const [link, setLink] = useState<string>('');
    const [socials, setSocials] = useState<ISocial[]>([]);
    const handleAddAccount = () => setSocials([...socials, { id: nanoid(), link }])

    return (
        <div>
            <Grid.Container gap={2}>
                {socials && socials.map(social => (
                    <Grid xs>
                        <SocialCard socialLink={social.link}/>
                    </Grid>
                ))}
            </Grid.Container>
            <Spacer />
            <Input
                onChange={(e) => setLink(e.target.value)}
                onIconClick={handleAddAccount}
                value={link}
                iconClickable={!!link}
                iconRight={link ? <PlusCircle /> : <></>}
                placeholder="Ссылку на соц. сеть"
            />
        </div>
    )
}

export default AuthorSocialMediaAccounts;