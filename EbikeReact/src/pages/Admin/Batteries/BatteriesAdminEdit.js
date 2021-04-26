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
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useRecoilState} from "recoil";
import {useLocation, useHistory} from 'react-router-dom'
import {Api} from "../../../configuration/config";
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

export default function BatteriesAdminEdit() {
    const classes = useStyles();
    const [batteryCapacity, setBatteryCapacity] = React.useState("");
    const [batteryId, setBatteryId] = React.useState("");
    const [batteryType, setBatteryType] = React.useState("");

    const location = useLocation()

    React.useEffect(() => {
        var query = new URLSearchParams(location.search)
        if (query.get("BatteryId")) {
            setBatteryCapacity(query.get("BatteryCapacity"));
            setBatteryId(query.get("BatteryId"));
            setBatteryType(query.get("BatteryType"));
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
        if (batteryCapacity && batteryCapacity.length > 0) {
                Api.postEditBattery(batteryId,parseInt(batteryCapacity),batteryType, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/BatteriesAdmin');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
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
                <BatteryCharging60Icon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Edit Battery!
            </Typography>
            <form className={classes.form}  onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="capacity"
                    label="Battery Capacity"
                    name="capacity"
                    autoComplete="capacity"
                    autoFocus
                    onChange={e => setBatteryCapacity(e.target.value)}
                    value={batteryCapacity}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="Battery Type"
                    name="type"
                    autoComplete="type"
                    autoFocus
                    onChange={e => setBatteryType(e.target.value)}
                    value={batteryType}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Edit Battery!
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