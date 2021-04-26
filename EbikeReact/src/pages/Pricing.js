import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Api} from "../configuration/config";
import {loginAtom} from "../globalState/atom";
import {useRecoilState} from "recoil";
import {useHistory} from "react-router-dom";
import Bootbox from "bootbox-react/src";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Halifax E Bikes Corp.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['5% off on checkout', 'Newsletter and Free Promotions to Email', 'Help center access', 'Email support'],
        buttonText: 'Go Free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '10% off on checkout',
            'Promotions & coupon code to Email',
            'Help center & accessories supply',
            'Priority email support',
        ],
        buttonText: 'Go Pro',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '15% off on checkout',
            'Yearly corpo sale',
            'Loaner bike provided on repair',
            'Phone & email support',
        ],
        buttonText: 'The only choice',
        buttonVariant: 'outlined',
    },
];
// const footers = [
//     {
//         title: 'Company',
//         description: ['Team', 'History', 'Contact us', 'Locations'],
//     },
//     {
//         title: 'Features',
//         description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
//     },
//     {
//         title: 'Resources',
//         description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//     },
//     {
//         title: 'Legal',
//         description: ['Privacy policy', 'Terms of use'],
//     },
// ];
const footers = []

export default function Pricing() {
    const classes = useStyles();
    const [user, setUser] = useRecoilState(loginAtom);
    let history = useHistory();
    const [showAlert, setShowAlert] = React.useState(false)
    const [showNeedToSignUp, setShowNeedToSignUp] = React.useState(false)
    const handleClose = () => {
        console.log("You closed Alert!");
        return setShowAlert(false);
    }
    function changePricing(type) {
        if(!(!user || typeof user === 'object' && !Object.keys(user).length)){
            let new_membership = type === 'Free' ? 'Free' : type === 'Pro' ? 'Pro' : 'Ent'
            Api.postEditPeople(user.personId, user.firstName, user.lastName, user.password, user.contact, user.email, user.city, user.province, user.postalcode,
                user.country, user.isAdmin, new_membership, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            debugger
                            setShowAlert(true);
                            console.table(user)
                            debugger
                            let tempUser = {...user}
                            tempUser['isMember'] = new_membership
                            setUser(tempUser)
                            console.table(user)
                            debugger
                            history.push('/');
                        })
                    } else {
                        // setShowAlert(true);
                    }
                })
        }
        else {
            setShowNeedToSignUp(true);
        }

    }

    return (
        <>
        <Bootbox show={showAlert}
                 type={"alert"}
                 message={"Membership Updated"}
                 onClose={handleClose}
        />
        <Bootbox show={showNeedToSignUp}
                 type={"alert"}
                 message={"Before you can do that, You need to sign up first! Please access Sign Up form from the homescreen"}
                 onClose={handleClose}
        />
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Halifax EBike Corp
                    </Typography>
                    <nav>
                        {/*<Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                        {/*    Features*/}
                        {/*</Link>*/}
                        {/*<Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                        {/*    Enterprise*/}
                        {/*</Link>*/}
                        {/*<Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                        {/*    Support*/}
                        {/*</Link>*/}
                    </nav>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Pricing
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Quickly build an effective pricing table for your potential customers with this layout.
                    It&apos;s built with default Material-UI components with little customization.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            /mo
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={()=>changePricing(tier.title)} fullWidth variant={tier.buttonVariant} color="primary">
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justify="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
        </>
    );
}