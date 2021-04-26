import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {useHistory} from "react-router-dom";
import {Api} from "../configuration/config";
import {useRecoilState} from "recoil";
import {featureAtom, priceTrackAtom, savedConfigJsonAtom} from "../globalState/atom";
import './wizard.css'
import EnduraImage from '../assets/bike_endura.jpg'
import CruiserImage from '../assets/bike_happy_smile.jpg'
import DownTownImage from '../assets/bike_book_read.png'
import BikesPageImg from '../assets/bip.jpg';

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
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${BikesPageImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: theme.spacing(8, 0, 6),
    },
    bikehead: {
        background: 'rgb(63,81,181, 0.85)',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    biketext: {
        background: 'rgb(245,0,87,0.85)',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
export default function BikesPage() {
    const [cards,setCards] = React.useState([]);
    const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
    const [savedConfig,setSavedConfig] = useRecoilState(savedConfigJsonAtom);
    const [feature,setFeature] = useRecoilState(featureAtom);
    React.useEffect(() => {
        setPriceTrack(0);
        var x = {};
        var y ={};
        setSavedConfig(x);
        setFeature(y);
        Api.getBikes((response) => {
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.status, res.data)
                setCards(res.data);
                // setLoading(false);
            })
        });
    },[])

    const classes = useStyles();
    let history = useHistory()

    function updatePriceAndSavedConfigRedirect(page,card) {
        setSavedConfig({
                "bike": card.name,
                "bikeId":card.bikeId,
                "bikePrice": card.price
            });
            setFeature({
                "weight": card.weight,
                "runningCost":card.runningCost,
                "range": card.range
            });
        setPriceTrack(card.price)
        if(page == 'Checkout')
            history.push('/Checkout')
        else
            history.push(`/${page}`)
    }

return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar className="wizard">
                    <DirectionsBikeIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap styl>
                        Bike layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={ classes.bikehead }>
                            Benefits of biking, without all the sweat.
                        </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.biketext}>
                        Enter: the electric bike. You don't need to be physically fit to ride one. It gets you outside, reduces fossil fuels, reduces congestion, and it's fun. We have got almost every kind of ebike there is, from the best heavy-duty cargo bikes to high-end mountain bikes! Get one for yourself now!
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Read Past Customer Reviews
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Other Vendors
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        // image={card.bikeId % 3 === 1 ? "https://source.unsplash.com/random" :
                                        //     card.bikeId % 3 === 2 ? "https://source.unsplash.com/random" :
                                        //     "https://source.unsplash.com/random"
                                        // }
                                        // image={`url(${EnduraImage})`}
                                        image={card.name==='Endura' ? EnduraImage : card.name==='Cruiser' ? CruiserImage : card.name==='Downtown' ? DownTownImage : '' } // FROM API card.Image =='EnduraImage'
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            {
                                              `"${card.description}" 
                                              Price - ${card.price}$`
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=> updatePriceAndSavedConfigRedirect('Checkout',card)} size="small" color="primary">
                                            Checkout
                                        </Button>
                                        <Button onClick={()=> updatePriceAndSavedConfigRedirect('Batteries',card)} size="small" color="primary">
                                            Customize
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}