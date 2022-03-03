import React from 'react';
import {Description, Link, Text} from "@geist-ui/core";
import styled from "styled-components";

const Footer = () => {
    return (
        <>
            <StyledFooterContainer>
                <StyledFooter>
                    <Description
                        title={'Благодарности'}
                        content={
                            <>
                                <Text children={'JetBrains дал нам подписку на все свои продукты'}/>
                                <Link href={'https://www.jetbrains.com/community/opensource/#support'}
                                      target={'_blank'}>
                                    <img
                                        style={{height: '200px'}}
                                        src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png"
                                        alt="JetBrains Logo (Main) logo."/>
                                </Link>

                            </>
                        }
                    />
                </StyledFooter>
            </StyledFooterContainer>
            <StyledSubFooter>
                Выпущено под лицензией MIT.<Link target={'_blank'} href={"https://github.com/Alex5"} block children={'Aleksei Ilin'}/>
            </StyledSubFooter>
        </>

    );
};

const StyledFooterContainer = styled.div`
  padding: 0 24px;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
  display: flex;
`

const StyledFooter = styled.div`
  margin: auto;
  width: 100%;
  align-items: center;
  max-width: 1048px;
  padding: 12px 0 12px 0;
`

const StyledFooterContent = styled.div`

`

const StyledSubFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 23px 0 24px;
  background-color: #eaeaea;
`

export default Footer;