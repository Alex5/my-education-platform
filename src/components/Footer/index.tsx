import React from 'react';
import {Description, Grid, Link, Text} from "@geist-ui/core";
import styled from "styled-components";

const Footer = () => {
    return (
        <>
            <StyledFooterContainer>
                <StyledFooter>
                    <Grid.Container>
                        <Grid xs={24}>
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
                        </Grid>
                        <Grid xs={8}>
                        </Grid>
                        <Grid xs={8}>
                        </Grid>
                    </Grid.Container>
                </StyledFooter>

            </StyledFooterContainer>
            <StyledSubFooter>
                Выпущено под лицензией MIT.<Link block children={'Aleksei Ilin'}/>
            </StyledSubFooter>
        </>

    );
};

const StyledFooterContainer = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 40px 0 40px 0;
  border-top: 1px solid #eaeaea;
`

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1048px;
  margin: auto;
  padding: 0 24px;
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