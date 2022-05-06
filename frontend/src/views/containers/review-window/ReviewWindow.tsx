import { Box, Button, IconButton, InputAdornment, Rating, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { ViewReview } from "../../../controller/model/ViewReview";


interface Props {
    pageSetter: (type: string) => void;
}

const useStyles = makeStyles({
    formBox: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    formContainer: {
        width: "30vw",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        width: "85%",
        height: "85%",
        alignItems: "left",
        background: "#EBEBEB",
        boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
        borderRadius: 10,

    },
    reviewForm: {
        margin: '3vh',
        width: "85%",
        height: "400px",
        alignItems: "left",
        background: "#EBEBEB",
        overflow: "auto",
    },
    inputForm: {
        margin: "3vh",
        display: "flex",
        flexDirection: "column",
        width: "85%",
        height: "85%",
        alignItems: "left",
        background: "#EBEBEB",
        borderRadius: 10,
    },

    inputField: {
        margin: "2vh",
        width: "15vw",
        "& label.Mui-focused": {
            color: "black"
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "black"
            }
        }
    },

    submitButton: {
        marginTop: "5vh",
        width: "7vw",
        background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
        color: "#EBEBEB",
        fontWeight: 600,
    }
})

function isInputEmpty(input: string | undefined) {
    return input !== undefined && input !== "";
}

function submitHandlerPreset(element: any, setUsernameErrors: (error: string | undefined) => void, setPasswordErrors: (error: string | undefined) => void): void {
    element.preventDefault();
    setUsernameErrors(undefined);
    setPasswordErrors(undefined);
}

export const ReviewWindow = ({ pageSetter }: Props) => {
    const styleClasses = useStyles();
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [reviewText, setReviewText] = useState<string>("");
    const [nameValue, setNameValue] = useState<string>("");
    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewText(event.target.value);
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    };
    const handleSubmitReview = () => {
        const review = new ViewReview(nameValue, reviewText, ratingValue);

    };

    return (
        <Box className={styleClasses.formBox}
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
        >
            <Box className={styleClasses.form}>
                <Box className={styleClasses.reviewForm} sx={{ overflow: 'auto' }}>
                <Box sx={{ display: "flex", flexDirection: 'row', height: '55px', backgroundColor: 'white', borderRadius: 10, paddingLeft: '40px', margin: '5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column',  width: '50%', justifyContent: 'flex-start' }}>
                            <Typography sx={{ height: "20px", display: 'flex', fontWeight: 'bold', marginTop: '5px', marginBottom: '5px' }}>Dovydas sako:</Typography>
                            <Typography>Nuostabi sistema!</Typography>
                        </Box>
                        <Rating sx={{ display: 'flex', width: '50%', paddingRight:'20px', justifyContent: 'flex-end' }} name="read-only" value={5} readOnly />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'row', height: 'auto', backgroundColor: 'white', borderRadius: 10, paddingLeft: '40px', margin: '5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '85%', justifyContent: 'flex-start' }}>
                            <Typography sx={{ height: "20px", display: 'flex', fontWeight: 'bold', marginTop: '5px', marginBottom: '5px' }} align='center'>Tomas sako:</Typography>
                            <Typography sx={{wordWrap: "break-word" }} align='left'>Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu! Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!Pritariu!</Typography>
                        </Box>
                        <Rating  sx={{ display: 'flex', width: '20%',paddingRight:'20px', justifyContent: 'flex-end' }} name="read-only" value={3} readOnly />
                    </Box>



                </Box>
                <Box className={styleClasses.inputForm}>
                    <Typography component="legend" >Jūsų įvertinimas sistemai:</Typography>
                    <Rating
                        name="simple-controlled"
                        value={ratingValue}
                        onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }}
                    />
                    <TextField
                        label="Vardas"
                        sx={{backgroundColor: 'white', width: '25ch' }}
                        value={nameValue}
                        onChange={handleNameChange}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        sx={{backgroundColor: 'white', width: '84%' }}
                        label="Komentaras:"
                        multiline
                        minRows={5}
                        maxRows={15}
                        value={reviewText}
                        onChange={handleReviewChange}
                    />
                    <Button className={styleClasses.submitButton} onClick={handleSubmitReview}>Įvertinti</Button>
                    {/* <Typography component="legend">Read only</Typography>
                    <Rating name="read-only" value={value} readOnly />
                    <Typography component="legend">Disabled</Typography>
                    <Rating name="disabled" value={value} disabled />
                    <Typography component="legend">No rating given</Typography>
                    <Rating name="no-value" value={null} />
                    <TextField className={styleClasses.inputField}></TextField> */}
                </Box>
            </Box>
        </Box>
    )
}