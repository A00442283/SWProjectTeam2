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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

export default function PersonAdminCreate() {
    const classes = useStyles();

    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [postalcode, setPostalcode] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [isadmin, setIsadmin] = React.useState("");
    const [ismember, setIsmember] = React.useState("");


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
                Api.postAddPerson(fname, lname, pass, contact, email, city, province, postalcode, country, isadmin, ismember, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/PersonAdmin');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
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

        {/*<Bootbox show={showConfirm}*/}
        {/*         type={"confirm"}*/}
        {/*         message={"An error occurred, please check your credentials or try again later"}*/}
        {/*    // onSuccess={handleYes}*/}
        {/*    // onCancel={handleNo}*/}
        {/*    // onClose={handleNo}*/}
        {/*/>*/}


        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <PersonAddIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Add Person!
            </Typography>
            <form className={classes.form}  onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="Fname"
                    name="fname"
                    autoComplete="fname"
                    autoFocus
                    onChange={e => setFname(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Lname"
                    name="lname"
                    autoComplete="lname"
                    autoFocus
                    onChange={e => setLname(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="pass"
                    label="Pass"
                    name="pass"
                    autoComplete="pass"
                    autoFocus
                    onChange={e => setPass(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    autoComplete="contact"
                    autoFocus
                    onChange={e => setContact(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    onChange={e => setCity(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="province"
                    label="Province"
                    name="province"
                    autoComplete="province"
                    autoFocus
                    onChange={e => setProvince(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="postalcode"
                    label="Postalcode"
                    name="postalcode"
                    autoComplete="postalcode"
                    autoFocus
                    onChange={e => setPostalcode(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    autoFocus
                    onChange={e => setCountry(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="isadmin"
                    label="Isadmin"
                    name="isadmin"
                    autoComplete="isadmin"
                    autoFocus
                    onChange={e => setIsadmin(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="ismember"
                    label="Ismember"
                    name="ismember"
                    autoComplete="ismember"
                    autoFocus
                    onChange={e => setIsmember(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Add Person
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