import React from "react";
import {Box, Container, Row, Column, FooterLink, Heading,} from "./FooterStyles";

const Footer = () => {
    return (
        <Box className='sc-bdvvaa fkizfl'>
            {/*<h1 style={{ color: "green",*/}
            {/*    textAlign: "center",*/}
            {/*    marginTop: "-50px" }}>*/}
            {/*    GeeksforGeeks: A Computer Science Portal for Geeks*/}
            {/*</h1>*/}
            <Container>
                <Row className='sc-jRQAMF fkvJOJ' >
                    <Column>
                        <Heading className='sc-jRQAMF fkvJOJ'>About Us</Heading>
                        <FooterLink href="#">Aim</FooterLink>
                        <FooterLink href="#">Vision</FooterLink>
                        {/*<FooterLink href="#">Testimonials</FooterLink>*/}
                    </Column>
                    <Column>
                        <Heading className='sc-jRQAMF fkvJOJ'>Services</Heading>
                        <FooterLink href="#">Writing</FooterLink>
                        <FooterLink href="#">Internships</FooterLink>
                        {/*<FooterLink href="#">Coding</FooterLink>*/}
                        {/*<FooterLink href="#">Teaching</FooterLink>*/}
                    </Column>
                    <Column>
                        <Heading className='sc-jRQAMF fkvJOJ'>Contact Us</Heading>
                        <FooterLink href="#">Uttar Pradesh</FooterLink>
                        <FooterLink href="#">Ahemdabad</FooterLink>
                        {/*<FooterLink href="#">Indore</FooterLink>*/}
                        {/*<FooterLink href="#">Mumbai</FooterLink>*/}
                    </Column>
                    <Column>
                        <Heading className='sc-jRQAMF fkvJOJ'>Social Media</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
                            </i>
                        </FooterLink>
                {/*        <FooterLink href="#">*/}
                {/*            <i className="fab fa-twitter">*/}
                {/*<span style={{ marginLeft: "10px" }}>*/}
                {/*  Twitter*/}
                {/*</span>*/}
                {/*            </i>*/}
                {/*        </FooterLink>*/}
                {/*        <FooterLink href="#">*/}
                {/*            <i className="fab fa-youtube">*/}
                {/*<span style={{ marginLeft: "10px" }}>*/}
                {/*  Youtube*/}
                {/*</span>*/}
                {/*            </i>*/}
                {/*        </FooterLink>*/}
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;