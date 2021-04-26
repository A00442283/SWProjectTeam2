import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import { useRecoilState } from "recoil";
import { loginAtom } from "../../globalState/atom";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import BikeHomePageImage from '../../assets/bike_home_page.jpg'


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

// const sections = [
//     { title: 'Technology', url: '#' },
//     { title: 'Design', url: '#' },
//     { title: 'Culture', url: '#' },
//     { title: 'Business', url: '#' },
//     { title: 'Politics', url: '#' },
//     { title: 'Opinion', url: '#' },
//     { title: 'Science', url: '#' },
//     { title: 'Health', url: '#' },
//     { title: 'Style', url: '#' },
//     { title: 'Travel', url: '#' },
// ];
const sections = [];

const mainFeaturedPost = {
    title: 'Custom Design. Pay. Ride',
    description:
        "Halifax E Bikes helps you customize acceleration mode, wheel, brakes, battery and accessories!!",
    image: 'BikeHomePageImage',
    imgText: 'main image description',
    linkText: 'Start Customizing Yours Today',
};

const featuredPosts = [
    {
        title: 'Battery',
        date: 'Available Now',
        description:
            'Choose from a baseline Battery to a "Pro" Battery for your E-Bike that meets your needs.',
        image: `battery`,
        imageText: 'Image Text',
    },
    {
        title: 'Acceleration Mode',
        date: 'Available Now',
        description:
            'Choose between the basic "Pedal Assisted" mode and a manual "Throttle" mode.\n',
        image: '',
        imageText: 'Image Text',
    },
    {
        title: 'Brakes',
        date: 'Available Now',
        description:
            'Choose between the easily reparable bar brakes to long lasting and excellent disc brakes!\n',
        image: '',
        imageText: 'Image Text',
    },
    {
        title: 'Wheel',
        date: 'Available Now',
        description:
            'Choose from the classic Spoked wheels all the way to super-strong yet light-weight Carbon Fiber wheels!\n',
        image: '',
        imageText: 'Image Text',
    }, {
        title: 'Accesories',
        date: 'Available Now',
        description:
            'Want more from you bike? Add extra accessories to make your bike do much more than just riding and make it super convenient!\n',
        image: '',
        imageText: 'Image Text',
    },
    {
        title: 'Frame and Color',
        date: 'Will be avaialable soon!!',
        description:
            'Personalize to your hearts delight',
        image: '',
        imageText: 'Image Text',
    },
];

const posts = [post1, post2, post3];

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

export default function Home() {
    const classes = useStyles();
    const [user, setUser] = useRecoilState(loginAtom);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                {/*<Header title={`Welcome ${user.firstName ? user.firstName : 'Guest' } to Halifax E Bikes Corp.`} sections={sections} />*/}
                <Header title={`Halifax E Bikes Corp.`} sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Typography align="center" component="h1" variant="h5" style={{marginBottom:'10px'}}>
                        Customization Options 
                    </Typography>
                    <Grid container spacing={5}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    
                    {/*<Grid container spacing={5} className={classes.mainGrid}>*/}
                    {/*    <Main title="From the firehose" posts={posts} />*/}
                    {/*    <Sidebar*/}
                    {/*        title={sidebar.title}*/}
                    {/*        description={sidebar.description}*/}
                    {/*        archives={sidebar.archives}*/}
                    {/*        social={sidebar.social}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}