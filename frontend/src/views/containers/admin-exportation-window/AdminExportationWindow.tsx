import { Box, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Axios  from "axios";
import React, { useEffect, useState } from "react";


interface Props {
  token: string | undefined
  page: string
  pageSetter: (type: string) => void
}

const useStyles = makeStyles({
  submitButton: {
    display: "flex",
    flex: "row",
    marginTop: "2vh",
    marginBottom: "2vh",
    marginRight: "2vh",
    marginLeft: "2vh",
    width: "15vw",
    background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
    color: "#EBEBEB",
    fontWeight: 600,
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
  formContainer:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    alignItems: "left",
    background: "#EBEBEB",
    boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
    borderRadius: 10,
  },
  form: {
    maxHeight: "10vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
})

export const AdminExportationWindow = ({ token, page, pageSetter }: Props) => {
  const styleClasses = useStyles();
  var scormProps = {
    authorsName:"",
    generalInformation:"",
  }
  const [authorsName,setAuthorsName] = useState<string>("");
  const [generalInformation,setGeneralInformation] = useState<string>("");
  const [fieldsState, setFieldsState]=useState<boolean>(false);
  const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorsName(event.target.value);
  };
  const handleGeneralInformationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralInformation(event.target.value);
  };
  const fieldsChecker = (authorsName:string, generalInformation:string) =>{
    if(authorsName !== ""){
      if(generalInformation !== "")
      setFieldsState(false);
      else{
        setFieldsState(true);
      }
    }
    else{
      setFieldsState(true);
    }
  };
  const sendScormProps = () => {
    scormProps.authorsName = authorsName;
    scormProps.generalInformation = generalInformation;
    Axios.post('http://localhost:8000/scormProps', scormProps)
};
  useEffect(()=>{fieldsChecker(authorsName,generalInformation)},[]);
  useEffect(()=>{fieldsChecker(authorsName,generalInformation)},[authorsName,generalInformation]);
  return (
    <Box className={styleClasses.formContainer}>
      <TextField
        id = 'authorsName'
        label="Autorius"
        sx={{ margin:'20px', backgroundColor: 'white', width: '25ch' }}
        value={authorsName}
        onChange={handleAuthorNameChange}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Bendra informacija"
        multiline
        minRows={5}
        maxRows={15}
        sx={{margin:'20px', backgroundColor: 'white', width: '80%' }}
        value={generalInformation}
        onChange={handleGeneralInformationChange}
      />
      {fieldsState?
      <Typography variant="caption" sx={{marginLeft:'20px', color:'red'}}>
        Įveskite autorių ir bendrąją informaciją*
      </Typography>:null}
      <Box className={styleClasses.form}>
        <Button id='phraseBtn' className={styleClasses.submitButton} disabled={fieldsState} onClick={() => 
        {
          sendScormProps();
          pageSetter("exportPhrase");
        }
        }>
            Eksportuoti frazę (-es)
        </Button>
        <Button id='lexiconUnitBtn' className={styleClasses.submitButton} disabled={fieldsState} onClick={() => 
        {
          sendScormProps();
          pageSetter("exportLexicon");
        }
        }>
          Eksportuoti leksikos vienetą (-us)
        </Button>
      </Box>
    </Box>
  );
}