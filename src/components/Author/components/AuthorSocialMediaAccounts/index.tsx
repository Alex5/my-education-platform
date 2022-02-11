import { Card, Input, Image, Link, Spacer, Grid } from "@geist-ui/core"
import { Github, Icon, PlusCircle } from "@geist-ui/react-icons";
import { nanoid } from "nanoid";
import { FC, useEffect, useState } from "react"
import { ReactElement } from "react-markdown/lib/react-markdown";
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