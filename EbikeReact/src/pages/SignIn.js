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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useRecoilState} from "recoil";
import {loginAtom} from "../globalState/atom";
import {useLocation, useHistory} from 'react-router-dom'
import {Api} from "../configuration/config";
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

export default function SignIn() {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

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


    const [user, setUser] = useRecoilState(loginAtom);
    let history = useHistory()

    React.useEffect(() => {
        setUser('guest');
    },[])

    function handleLogin(e) {
        e.preventDefault();
        if (email && email.length > 0) {
            if (password && password.length > 0) {
                Api.postLogin(email, password,(response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            setUser(res.data);
                            if(res.data.isAdmin === 'Yes') {
                                // setShowAlert(true);
                                history.push('/AdminDashboard');
                            }
                            else
                                history.push('/');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
            }
        }
    }

return (
    <>
        <Bootbox show={showAlert}
                 type={"alert"}
                 message={`                                                                     Redirecting you to the admin dashboard. If you'd like to go to the homepage instead, you can change your settings `}
                 // message={"Redirecting you to the admin dashboard. If you'd like to go to the Redirecting you to the admin dashboard. If you'd like to go to the homepage instead, you can change your settings "}
                 onClose={handleClose}
        />
    <Container component="main" maxWidth="xs">

        <CssBaseline/>
        {/*<button onClick={ () => setShowAlert(true) }> Alert </button>*/}

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright/>
        </Box>
    </Container>
    </>
);
}