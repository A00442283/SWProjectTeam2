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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useRecoilState} from "recoil";
import {useLocation, useHistory} from 'react-router-dom'
import {Api} from "../../configuration/config";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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

export default function PeopleAdminCredit() {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const classes = useStyles();
    const [personId, setPersonId] = React.useState("");
    const [editView, setEditView] = React.useState(false);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [postalcode, setPostalcode] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState("");
    const [isMember, setIsMember] = React.useState("");

    const location = useLocation()
    React.useEffect(() => {
        var query = new URLSearchParams(location.search)
        if (query.get('Type') === 'EditView') {
            setEditView(true);
            setPersonId(query.get("PersonId"));
            setFirstName(query.get("FirstName"));
            setLastName(query.get("LastName"));
            setPassword(query.get("Password"));
            setContact(query.get("Contact"));
            setEmail(query.get("Email"));
            setCity(query.get("City"));
            setProvince(query.get("Province"));
            setPostalcode(query.get("Postalcode"));
            setCountry(query.get("Country"));
            setIsAdmin(query.get("IsAdmin"));
            setIsMember(query.get("IsMember"));
        }
    }, [])

    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [bootboxMessage, setBootBoxMessage] = React.useState("Validation Success")
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
        let validPeople = true;
        e.preventDefault();
        //YOUR VALIDATIONS GO HERE. 
        let lettersOnly = new RegExp(/^[a-zA-Z\s]+$/);
        let pass_regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        let phone_regex = new RegExp(/^\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*$/)
        let email_regex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        let postal_regex = new RegExp(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/)

        console.log(firstName);
        console.log(lastName);
        console.log(password);
        console.log(contact);
        console.log(email);
        console.log(city);
        console.log(province);
        console.log(postalcode);
        console.log(country);
        console.log(isAdmin);
        console.log(isMember);
        debugger


        if (firstName.length < 3 && firstName.length > 20 && !lettersOnly.test(firstName)) {
            setShowAlert(true)
            setBootBoxMessage("First Name should be of Min 3 and Max 20 characters(No Digits/Special Characters allowed)")
            validPeople = false
            return undefined;
        }

        if (lastName.length < 3 && lastName.length > 20 && !lettersOnly.test(lastName)) {
            setShowAlert(true)
            setBootBoxMessage("Last Name should be of Min 3 and Max 20 characters(No Digits/Special Characters allowed)")
            validPeople = false
            return undefined;
        }

        if (!pass_regex.test(password)) {
            setShowAlert(true)
            setBootBoxMessage("Please enter minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
            validPeople = false
            return undefined;
        }

        console.log(phone_regex.test(contact))
        if (!phone_regex.test(contact)) {
            setShowAlert(true)
            setBootBoxMessage("Please enter valid phone number")
            validPeople = false
            return undefined;
        }

        if (!email_regex.test(email)) {
            setShowAlert(true)
            setBootBoxMessage("Please enter valid email")
            validPeople = false
            return undefined;
        }

        if (!lettersOnly.test(city)) {
            setShowAlert(true)
            setBootBoxMessage("Digits or special characters are not allowed for city")
            validPeople = false
            return undefined;
        }

        if (!lettersOnly.test(province)) {
            setShowAlert(true)
            setBootBoxMessage("Digits or special characters are not allowed for province")
            validPeople = false
            return undefined;
        }

        if (!lettersOnly.test(country)) {
            setShowAlert(true)
            setBootBoxMessage("Digits or special characters are not allowed for country")
            validPeople = false
            return undefined;
        }

        if (!postal_regex.test(postalcode)) {
            setShowAlert(true)
            setBootBoxMessage("Please enter a valid postal code")
            validPeople = false
            return undefined;
        }

        if(validPeople){
            if (editView) {
                Api.postEditPeople(personId, firstName, lastName, password, contact, email, city, province, postalcode, country, isAdmin, isMember, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/PeopleAdmin');
                        })
                    } else {
                        setShowAlert(true);
                    }
                })
            } else {
                Api.postAddValidationPeople(firstName, lastName, password, contact, email, city, province, postalcode, country, isAdmin, isMember, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            console.log(res.data)
                            history.push('/PeopleAdmin');
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
                         message={bootboxMessage}
                         onClose={handleClose}
                />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <GroupAddIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {editView ? 'Edit People!' : 'Add People!'}
                    </Typography>
                    {/*form*/}{/*TextField*/}

                    {/*<ValidatorForm className={classes.form}  onSubmit={handleLogin}>*/}
                    <form className={classes.form} onSubmit={(handleLogin)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="firstName"
                            label="FirstName"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            pattern="[Bb]anana|[Cc]herry"
                            maxLength="20"
                            minLength="5"
                            type="text"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="LastName"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
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
                            value={contact}
                            validators={['matchRegexp:^[0-9]$']}
                            errorMessages={['Only Numbers']}
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
                            value={email}
                            validators={['isEmail']}
                            errorMessages={['Email is not valid']}
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
                            value={city}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
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
                            value={province}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="postalcode"
                            label="Postal Code"
                            name="postalcode"
                            autoComplete="postalcode"
                            autoFocus
                            onChange={e => setPostalcode(e.target.value)}
                            value={postalcode}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
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
                            value={country}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="isAdmin"
                            label="IsAdmin?"
                            name="isAdmin"
                            autoComplete="isAdmin"
                            autoFocus
                            onChange={e => setIsAdmin(e.target.value)}
                            value={isAdmin}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="isMember"
                            label="IsMember?"
                            name="isMember"
                            autoComplete="isMember"
                            autoFocus
                            onChange={e => setIsMember(e.target.value)}
                            value={isMember}
                            validators={['isString', 'maxNumber:20']}
                            errorMessages={['Only Characters', 'Extra Characters']}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {editView ? 'Edit People!' : 'Add People!'}
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
