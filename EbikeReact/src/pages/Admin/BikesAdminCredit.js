import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useRecoilState} from "recoil";
import {useLocation, useHistory} from 'react-router-dom'
import {Api} from "../../configuration/config";
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function BikesAdminCredit() {
    const classes = useStyles();
    const [bikeId, setBikeId] = React.useState("");
    const [editView,setEditView] = React.useState(false);

    const [bikeName, setBikeName] = React.useState("");
    const [bikePrice, setBikePrice] = React.useState("");
    const [bikeDescription, setBikeDescription] = React.useState("");
    const [bikeWeight, setBikeWeight] = React.useState("");
    const [bikeRunningCost, setBikeRunningCost] = React.useState("");
    const [bikeRange, setBikeRange] = React.useState("");

    const location = useLocation()
    React.useEffect(() => {
        var query = new URLSearchParams(location.search)
        if(query.get('Type') === 'EditView') {
            setEditView(true);
            console.log(query.get("BikeName"));
            if (query.get("BikeName")) {
                setBikeName(query.get("BikeName"));
                setBikeId(query.get("BikeId"));
                setBikePrice(query.get("BikePrice"));
                setBikeDescription(query.get("BikeDescription"));
                setBikeWeight(query.get("BikeWeight"));
                setBikeRunningCost(query.get("BikeRunningCost"));
                setBikeRange(query.get("BikeRange"));
            }
        }
    }, [])

    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [showPrompt, setShowPrompt] = useState(false)
    const handleConfirm = () => {
        console.log("You clicked Yes!");
        setShowConfirm(!showConfirm);
    }
    const handleCancel = () => {
        console.log("You clicked No!");
        return setShowConfirm(false);
    }
    const handleClose = () => {
        console.log("You closed Alert!");
        return setShowAlert(false);
    }
    const handlePrompt = (result) => {
        console.log(`User input: ${result}`);
        return setShowPrompt(false);
    }
    let history = useHistory()

    function handleLogin(e) {
        e.preventDefault();
        if (bikeName && bikeName.length > 0) {
            if(editView) {
                Api.postEditBikes(bikeId,bikeName, parseInt(bikePrice), bikeDescription,parseInt(bikeWeight),parseInt(bikeRunningCost),parseInt(bikeRange), (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/BikesAdmin');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
            }
            else{
                Api.postAddBikes(bikeName, parseInt(bikePrice), bikeDescription,parseInt(bikeWeight),parseInt(bikeRunningCost),parseInt(bikeRange), (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/BikesAdmin');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
            }

        }
    }

return (
    <Container component="main" maxWidth="xs">
        <>
        <CssBaseline/>
        {/*<button onClick={ () => setShowAlert(true) }> Alert </button>*/}
        <Bootbox show={showAlert}
                 type={"alert"}
                 message={"An error occurred, please check your credentials or try again later"}
                 onClose={handleClose}
        />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <DirectionsBikeIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {editView ? 'Edit Bike!' : 'Add Bike!' }
            </Typography>
            <form className={classes.form}  onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Bike Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={e => setBikeName(e.target.value)}
                    value={bikeName}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Bike Price"
                    price="price"
                    autoComplete="price"
                    autoFocus
                    onChange={e => setBikePrice(e.target.value)}
                    value={bikePrice}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Bike Description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    onChange={e => setBikeDescription(e.target.value)}
                    value={bikeDescription}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="weight"
                    label="Bike Weight"
                    name="weight"
                    autoComplete="weight"
                    autoFocus
                    onChange={e => setBikeWeight(e.target.value)}
                    value={bikeWeight}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="runningCost"
                    label="Bike Running Cost"
                    name="runningCost"
                    autoComplete="runningCost"
                    autoFocus
                    onChange={e => setBikeRunningCost(e.target.value)}
                    value={bikeRunningCost}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="range"
                    label="Bike Range"
                    name="range"
                    autoComplete="range"
                    autoFocus
                    onChange={e => setBikeRange(e.target.value)}
                    value={bikeRange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {editView ? 'Edit Bike!' : 'Add Bike!' }
                </Button>
                <Grid container>
                    <Grid item xs>

                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright/>
        </Box>
    </>
    </Container>
);
}