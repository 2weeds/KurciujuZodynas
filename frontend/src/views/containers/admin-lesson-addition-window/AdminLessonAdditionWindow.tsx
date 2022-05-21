import { Box, Button, Modal, TextField, Typography, Table, TableRow, TableBody, TableCell, TableHead, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { EDIT_NAME_ERROR, SUBTOPICS_REQUIRED, FILLED_SUBTOPICS_REQUIRED, FIELD_EMPTY, PARTS_REQUIRED, FILLED_PARTS_REQUIRED } from "../../../constants/ErrorConstants";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { ViewLessonPart } from "../../../controller/model/ViewLessonPart";
import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import { ViewExplanation } from "../../../controller/model/ViewExplanation";
import useLexiconWindow from "../lexicon-window/useLexiconWindow";
import { lexiconUnitsRetrievalController, newLessonCreationController, phrasesRetrievalController } from "../../../config/ControllerConfiguration";
import usePhraseWindow from "../phrases-window/usePhraseWindow";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import useAdminLessonAdditionWindow from "./useAdminLessonAdditionWindow";

interface Props {
  token: string | undefined
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    minHeight: "100%",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "30vw",
    height: "60vh",
    alignItems: "center",
    background: "#EBEBEB",
    boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
    borderRadius: 10,
    overflow: 'auto',
  },

  leftForm: {
    marginRight: '1vw',
    width: '25vw',
  },

  inputField: {
    marginTop: "5vh",
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
    width: "15vw",
    background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
    color: "#EBEBEB",
    fontWeight: 600,
  },

  addButton: {
    marginTop: '3vh',
  },

  lessonPartAdditionBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2vh',
    width: '85%'
  },

  lessonPartModificationBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2vh',
    width: '70%',
    alignItems: 'center',
  },

  addLessonPartButton: {
    color: "green",
    backgroundColor: '#EBEBEB',
    border: "1px solid",
    borderRadius: "5px",
    borderColor: "black",
    marginLeft: '1vw',
    '&:hover': {
      backgroundColor: '#fff',
      '&:active': {
        backgroundColor: '#a8a8a8',
      }
    }
  },

  subTopicsTable: {
    tableLayout: 'fixed',
    width: '100%',
  },

  nameTableCells: {
    width: '70%',
  },

  btnTableCells: {
    width: '10%',
  },

  removeBtn: {
    color: 'red'
  },

  pickContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '3vh',
    width: '100%',
    height: '25vh'
  },

  leftPickContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'auto'
  },

  rightPickContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'auto'
  },

  tableElements: {
    padding: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
  },

  inBetween: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  addToListBtn: {
    marginLeft: '0vw',
    marginBottom: '4px',
  },

  removeFromListBtn: {
    marginTop: '4px',
  },
})

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin-top: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
  const components: SelectUnstyledProps<string>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

const partAdditionModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: 'auto'
}

const textModalHeight = {
  height: {
    xs: '210vh',
    sm: '120vh',
    md: '75vh'
  }
}

function isInputDataValid(word: string | undefined, setWordErrors: (error: string) => void,
  abbr: string | undefined, setAbbrErrors: (error: string) => void,
  parts: ViewLessonPart[], setPartsRequiredErrors: (error: string | undefined) => void,
  setPartsFilledErrors: (error: string | undefined) => void): boolean {
  const validInputs: boolean[] = [];

  if (isInputEmpty(word))
    validInputs.push(true)
  else {
    setWordErrors(FIELD_EMPTY);
  }

  if (isInputEmpty(abbr))
    validInputs.push(true)
  else {
    setAbbrErrors(FIELD_EMPTY);
  }

  if (parts.length > 0) {
    validInputs.push(true);
    validInputs.push(validateAllLessonParts(parts, setPartsFilledErrors));
  }
  else {
    setPartsRequiredErrors(PARTS_REQUIRED);
  }

  return validInputs[0] === true && validInputs[1] === true && validInputs[2] === true && validInputs[3] === true;
}

function validateAllLessonParts(parts: ViewLessonPart[], setPartsFilledErrors: (error: string | undefined) => void): boolean {
  const validInputs: boolean[] = [];
  parts.forEach(part => {
    if (part.name !== "Pamokos dalis" && part.name !== "" && areSubtopicsValid(part.subTopics, setPartsFilledErrors, setPartsFilledErrors, true))
      validInputs.push(true)
    else {
      validInputs.push(false);
      setPartsFilledErrors(FILLED_PARTS_REQUIRED);
    }
  })

  return !validInputs.includes(false);
}

function isInputEmpty(input: string | undefined): boolean {
  return input !== undefined && input !== "";
}

function removeExtraWhitespaces(element: string): string {
  return element.trim().split(/\s\s+/g).join(' ');
}

function submitHandlerPreset(setWordErrors: (error: string | undefined) => void,
  setAbbrErrors: (error: string | undefined) => void,
  setPartsRequiredErrors: (error: string | undefined) => void,
  setPartsFilledErrors: (error: string | undefined) => void): void {
  setWordErrors(undefined);
  setAbbrErrors(undefined);
  setPartsRequiredErrors(undefined);
  setPartsFilledErrors(undefined);
}

function areSubtopicsValid(subtopics: Map<string, any>,
  setRequiredErrors: (error: string | undefined) => void,
  setFilledErrors: (error: string | undefined) => void,
  lessonBeingChecked: boolean): boolean {
  const validInputs: boolean[] = [];
  if (subtopics.size > 0) {
    subtopics.forEach((subtopic, key) => {
      if (key === 'lexicon') {
        const lexiconSubtopic = subtopic as ViewLexiconUnit[];
        if (lexiconSubtopic.length > 0)
          validInputs.push(true);
        else
          validInputs.push(false)
      }

      if (key === 'phrases') {
        const phrasesSubtopic = subtopic as ViewPhrase[];
        if (phrasesSubtopic.length > 0)
          validInputs.push(true);
        else
          validInputs.push(false)
      }

      if (key === 'grammar') {
        const grammarExplanation = subtopic as ViewExplanation;
        if (grammarExplanation.text !== undefined && removeExtraWhitespaces(grammarExplanation.text.trim()).length > 0)
          validInputs.push(true);
        else
          validInputs.push(false)
      }

      if (key === 'information') {
        const infoExplanation = subtopic as ViewExplanation;
        if (infoExplanation.text !== undefined && removeExtraWhitespaces(infoExplanation.text.trim()).length > 0)
          validInputs.push(true);
        else
          validInputs.push(false)
      }

      if (key === 'test') {
        const test = subtopic as ViewExplanation;
        if (test.text !== undefined && removeExtraWhitespaces(test.text.trim()).length > 0)
          validInputs.push(true);
        else
          validInputs.push(false)
      }
    })
  } else {
    lessonBeingChecked ? setRequiredErrors(FILLED_PARTS_REQUIRED) : setRequiredErrors(SUBTOPICS_REQUIRED);
    return false;
  }

  if (validInputs.includes(false)) {
    lessonBeingChecked ? setFilledErrors(FILLED_PARTS_REQUIRED) : setFilledErrors(FILLED_SUBTOPICS_REQUIRED);
    return false;
  }
  return true;
}

function isNameValid(name: string, setErrors: (error: string | undefined) => void): boolean {
  if (name !== 'Pamokos dalis' && name !== "")
    return true;

  setErrors(EDIT_NAME_ERROR);
  return false;
}

function validateData(name: string, setNameErrors: (error: string | undefined) => void,
  subtopics: Map<string, any>,
  setRequiredErrors: (error: string | undefined) => void,
  setFilledErrors: (error: string | undefined) => void) {
  const validInputs: boolean[] = [];
  validInputs.push(isNameValid(name, setNameErrors));
  validInputs.push(areSubtopicsValid(subtopics, setRequiredErrors, setFilledErrors, false));

  return !validInputs.includes(false);
}

export const AdminLessonAdditionWindow = ({ token }: Props) => {
  const [name, updateName] = useState<string | undefined>("");
  const [nameErrors, setNameErrors] = useState<string | undefined>(undefined);
  const [nameShrink, setNameShrink] = useState<boolean>(false);
  const [goal, updateGoal] = useState<string | undefined>("");
  const [goalErrors, setGoalErrors] = useState<string | undefined>(undefined);
  const [goalShrink, setGoalShrink] = useState<boolean>(false);
  const [partsRequiredErrors, setPartsRequiredErrors] = useState<string | undefined>(undefined);
  const [partsFilledErrors, setPartsFilledErrors] = useState<string | undefined>(undefined);
  const [partBeingEdited, setPartBeingEdited] = useState<ViewLessonPart | undefined>(undefined);
  const [editedPartIndex, setEditedPartIndex] = useState<number>(-1);
  const [isSubtopicBeingAdded, setIsSubtopicBeingAdded] = useState<boolean>(false);
  const [partsAdded, setPartsAdded] = useState<ViewLessonPart[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>("");
  const [subtopicToRemove, setSubtopicToRemove] = useState<string | undefined>(undefined);
  const [textSubtopicBeingModified, setTextSubtopicBeingModified] = useState<string>("");
  const [listSubtopicBeingModified, setListSubtopicBeingModified] = useState<string>("");
  const [textMaterial, setTextMaterial] = useState<string>("");
  const [lexiconUnitsToDisplay, setLexiconUnitsToDisplay] = useState<ViewLexiconUnit[]>([]);
  const [phrasesToDisplay, setPhrasesToDisplay] = useState<ViewPhrase[]>([]);
  const [selectedLexiconUnits, setSelectedLexiconUnits] = useState<ViewLexiconUnit[]>([]);
  const [selectedPhrases, setSelectedPhrases] = useState<ViewPhrase[]>([]);
  const [selectedLexiconUnitsFromAdded, setSelectedLexiconUnitsFromAdded] = useState<ViewLexiconUnit[]>([]);
  const [selectedPhrasesFromAdded, setSelectedPhrasesFromAdded] = useState<ViewPhrase[]>([]);
  const [partNameErrors, setPartNameErrors] = useState<string | undefined>(undefined);
  const [subtopicsRequiredErrors, setSubtopicsRequiredErrors] = useState<string | undefined>(undefined);
  const [subtopicsFilledErrors, setSubtopicsFilledErrors] = useState<string | undefined>(undefined);
  const lexiconUnits = useLexiconWindow(lexiconUnitsRetrievalController, setLexiconUnitsToDisplay);
  const phrases = usePhraseWindow(phrasesRetrievalController, setPhrasesToDisplay);
  const lessonAddition = useAdminLessonAdditionWindow(newLessonCreationController);
  const styleClasses = useStyles();

  useEffect(() => {
    lexiconUnits();
    phrases();
  }, [])

  useEffect(() => {
    if (partBeingEdited !== undefined && subtopicToRemove !== undefined) {
      partBeingEdited.subTopics.delete(subtopicToRemove);
      setSubtopicToRemove(undefined);
    }
  }, [subtopicToRemove])

  const handleNameFieldChange = (element: any) => { updateName(element.target.value) }
  const handleGoalFieldChange = (element: any) => { updateGoal(element.target.value) }
  const handleSubmit = () => {
    submitHandlerPreset(setNameErrors, setGoalErrors, setPartsRequiredErrors, setPartsFilledErrors);

    if (isInputDataValid(name?.trim(), setNameErrors, goal?.trim(), setGoalErrors, partsAdded, setPartsRequiredErrors, setPartsFilledErrors)) {
      const trimmedName = removeExtraWhitespaces(name as string);
      const trimmedGoal = removeExtraWhitespaces(goal as string);
      const fullLesson = new ViewLesson(trimmedName, trimmedGoal, partsAdded);
      lessonAddition(fullLesson, token);
      updateName("");
      updateGoal("");
      setPartsAdded([]);
    }
  }

  const handleLessonPartNameChange = (element: any) => {
    if (partBeingEdited !== undefined) {
      const newName = element.target.value;
      const subtopics = partBeingEdited.subTopics;
      const updatedPart = new ViewLessonPart(newName, subtopics);
      setPartBeingEdited(updatedPart);
    }
  }

  const renderNameErrors = () => {
    if (nameErrors !== undefined)
      return <Typography variant="error">{nameErrors}</Typography>
  }
  const renderGoalErrors = () => {
    if (goalErrors !== undefined)
      return <Typography variant="error">{goalErrors}</Typography>
  }

  const renderPartsRequiredErrors = () => {
    if (partsRequiredErrors !== undefined)
      return <Typography variant="error">{partsRequiredErrors}</Typography>
  }

  const renderPartsFilledErrors = () => {
    if (partsFilledErrors !== undefined)
      return <Typography variant="error">{partsFilledErrors}</Typography>
  }

  const renderPartNameErrors = () => {
    if (partNameErrors !== undefined)
      return <Typography variant="error">{partNameErrors}</Typography>
  }

  const renderSubtopicRequiredErrors = () => {
    if (subtopicsRequiredErrors !== undefined)
      return <Typography variant="error">{subtopicsRequiredErrors}</Typography>
  }

  const renderSubtopicFilledErrors = () => {
    if (subtopicsFilledErrors !== undefined)
      return <Typography variant="error">{subtopicsFilledErrors}</Typography>
  }

  const handlePartAddition = () => {
    setPartsAdded(partsAdded => [...partsAdded, new ViewLessonPart('Pamokos dalis', new Map<string, any>())])
  }

  const handleSubtopicTextFieldChange = (element: any) => { setTextMaterial(element.target.value) }

  const renderLessonParts = () => {
    if (partsAdded.length > 0)
      return (
        partsAdded.map((part, index) => (
          <>
            {
              part === partBeingEdited || (editedPartIndex !== -1 && editedPartIndex === index) ?
                <TableRow sx={{ backgroundColor: '#C5E3FC' }} key={index + '-part'}>
                  <TableCell className={styleClasses.nameTableCells} key={index + '-partName'}>{part.name}</TableCell>
                  <TableCell id={index + '-partEditBtn'} className={styleClasses.btnTableCells} key={index + '-partEditBtn'}><EditIcon onClick={handlePartEditUnsetClick}></EditIcon></TableCell>
                  <TableCell id={index + '-partRmBtn'} className={styleClasses.btnTableCells} key={index + '-partRmBtn'}><RemoveIcon className={styleClasses.removeBtn} onClick={() => handlePartRemoval(part, index)}></RemoveIcon></TableCell>
                </TableRow> :
                <TableRow key={index + '-part'}>
                  <TableCell className={styleClasses.nameTableCells} key={index + '-partName'}>{part.name}</TableCell>
                  <TableCell id={index + '-partEditBtn'} className={styleClasses.btnTableCells} key={index + '-partEditBtn'}><EditIcon onClick={() => handlePartEditClick(part, index)}></EditIcon></TableCell>
                  <TableCell id={index + '-partRmBtn'} className={styleClasses.btnTableCells} key={index + '-partRmBtn'}><RemoveIcon className={styleClasses.removeBtn} onClick={() => handlePartRemoval(part, index)}></RemoveIcon></TableCell>
                </TableRow>
            }
          </>
        ))
      )
  }

  const handlePartEditClick = (part: ViewLessonPart, index: number) => {
    setPartBeingEdited(part);
    setEditedPartIndex(index);
  }

  const handlePartEditUnsetClick = () => {
    setPartBeingEdited(undefined);
    setEditedPartIndex(-1);
  }


  const handlePartRemoval = (partBeingRemoved: ViewLessonPart, index: number) => {
    const partIndex = partsAdded.indexOf(partBeingRemoved, 0);
    if (partIndex > -1) {
      if (partBeingEdited === partBeingRemoved || editedPartIndex === index) {
        setPartBeingEdited(undefined);
        setEditedPartIndex(-1);
      }
      const newPartsArray: ViewLessonPart[] = partsAdded.filter(part => part !== partBeingRemoved);
      setPartsAdded(newPartsArray);
    }
  }

  const handleSave = () => {
    setPartNameErrors(undefined);
    setSubtopicsRequiredErrors(undefined);
    setSubtopicsFilledErrors(undefined);
    if (partBeingEdited !== undefined) {
      const name = partBeingEdited.name.trim();
      const trimmedPartName = removeExtraWhitespaces(name);
      if (validateData(trimmedPartName, setPartNameErrors, partBeingEdited.subTopics, setSubtopicsRequiredErrors, setSubtopicsFilledErrors)) {
        const newPartsAdded: ViewLessonPart[] = partsAdded;
        const newPart: ViewLessonPart = new ViewLessonPart(trimmedPartName, partBeingEdited.subTopics);
        newPartsAdded[editedPartIndex] = newPart;
        setPartsAdded(newPartsAdded);
        setPartBeingEdited(undefined);
        setEditedPartIndex(-1);
      }
    }
  }

  const handleTextSubtopicModification = () => {
    if (partBeingEdited !== undefined && textMaterial !== "")
      partBeingEdited.subTopics.set(textSubtopicBeingModified, new ViewExplanation(textMaterial));
    setTextSubtopicBeingModified("");
    setTextMaterial("");
  }

  const handleTextSubtopicEdit = (subtopic: string) => {
    setTextSubtopicBeingModified(subtopic);
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has(subtopic)) {
      const subTopic: ViewExplanation = partBeingEdited.subTopics.get(subtopic);
      setTextMaterial(subTopic.text);
    }
  }

  const handleSubtopicAddition = () => {
    if (partBeingEdited !== undefined && selectValue === 'lexicon') {
      const newUnits: ViewLexiconUnit[] = [];
      partBeingEdited.subTopics.set(selectValue, newUnits);
    }
    if (partBeingEdited !== undefined && selectValue === 'phrases') {
      const newPhrases: ViewPhrase[] = [];
      partBeingEdited.subTopics.set(selectValue, newPhrases);
    }
    if (partBeingEdited !== undefined && selectValue === 'grammar') {
      const grammar = "";
      partBeingEdited.subTopics.set(selectValue, grammar);
    }
    if (partBeingEdited !== undefined && selectValue === 'information') {
      const information = "";
      partBeingEdited.subTopics.set(selectValue, information);
    }
    if (partBeingEdited !== undefined && selectValue === 'test') {
      const test = "";
      partBeingEdited.subTopics.set(selectValue, test);
    }

    setIsSubtopicBeingAdded(false);
    setSelectValue(null);
  }

  const renderLexiconOption = () => {
    if (partBeingEdited === undefined || !partBeingEdited.subTopics.has('lexicon'))
      return (
        <StyledOption value="lexicon">Leksika</StyledOption>
      )
  }

  const renderPhrasesOption = () => {
    if (partBeingEdited === undefined || !partBeingEdited.subTopics.has('phrases'))
      return (
        <StyledOption value="phrases">Frazės</StyledOption>
      )
  }

  const renderGrammarOption = () => {
    if (partBeingEdited === undefined || !partBeingEdited.subTopics.has('grammar'))
      return (
        <StyledOption sx={{id:'options'}} value="grammar">Gramatika</StyledOption>
      )
  }


  const renderInformationOption = () => {
    if (partBeingEdited === undefined || !partBeingEdited.subTopics.has('information'))
      return (
        <StyledOption sx={{id:'options'}} value="information">Sociokultūrinė informacija</StyledOption>
      )
  }

  const renderTestOption = () => {
    if (partBeingEdited === undefined || !partBeingEdited.subTopics.has('test'))
      return (
        <StyledOption sx={{id:'options'}} value="test">Užduotis</StyledOption>
      )
  }

  const handleListSubtopicRemoval = (subtopic: string) => {
    if (subtopic === 'lexicon') {
      setSelectedLexiconUnits([]);
      setSubtopicToRemove('lexicon');
    } else if (subtopic === 'phrase') {
      setSelectedPhrases([]);
      setSubtopicToRemove('phrases');
    }
  }

  const renderLexiconAddition = () => {
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has("lexicon")) {
      return (
        <TableRow>
          <TableCell className={styleClasses.nameTableCells}><Typography variant="tableBodyTitle">Leksika</Typography></TableCell>
          <TableCell className={styleClasses.btnTableCells}><EditIcon onClick={() => setListSubtopicBeingModified('lexicon')}></EditIcon></TableCell>
          <TableCell className={styleClasses.btnTableCells}><RemoveIcon className={styleClasses.removeBtn} onClick={() => handleListSubtopicRemoval('lexicon')}></RemoveIcon></TableCell>
        </TableRow>
      )
    }
  }

  const renderPhrasesAddition = () => {
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has("phrases"))
      return (
        <TableRow>
          <TableCell className={styleClasses.nameTableCells}><Typography variant="tableBodyTitle">Frazės</Typography></TableCell>
          <TableCell className={styleClasses.btnTableCells}><EditIcon onClick={() => setListSubtopicBeingModified('phrases')}></EditIcon></TableCell>
          <TableCell className={styleClasses.btnTableCells}><RemoveIcon className={styleClasses.removeBtn} onClick={() => setSubtopicToRemove('phrases')}></RemoveIcon></TableCell>
        </TableRow>
      )
  }

  const renderGrammarAddition = () => {
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has("grammar"))
      return (
        <TableRow>
          <TableCell className={styleClasses.nameTableCells}><Typography variant="tableBodyTitle">Gramatika</Typography></TableCell>
          <TableCell className={styleClasses.btnTableCells}><EditIcon onClick={() => handleTextSubtopicEdit('grammar')}></EditIcon></TableCell>
          <TableCell className={styleClasses.btnTableCells}><RemoveIcon className={styleClasses.removeBtn} onClick={() => setSubtopicToRemove('grammar')}></RemoveIcon></TableCell>
        </TableRow>
      )
  }

  const renderInformationAddition = () => {
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has("information"))
      return (
        <TableRow>
          <TableCell className={styleClasses.nameTableCells}><Typography variant="tableBodyTitle">Sociokultūrinė informacija</Typography></TableCell>
          <TableCell className={styleClasses.btnTableCells}><EditIcon onClick={() => handleTextSubtopicEdit('information')}></EditIcon></TableCell>
          <TableCell className={styleClasses.btnTableCells}><RemoveIcon className={styleClasses.removeBtn} onClick={() => setSubtopicToRemove('information')}></RemoveIcon></TableCell>
        </TableRow>
      )
  }

  const renderTestAddition = () => {
    if (partBeingEdited !== undefined && partBeingEdited.subTopics.has("test"))
      return (
        <TableRow>
          <TableCell className={styleClasses.nameTableCells}><Typography variant="tableBodyTitle">Užduotis</Typography></TableCell>
          <TableCell className={styleClasses.btnTableCells}><EditIcon onClick={() => handleTextSubtopicEdit('test')}></EditIcon></TableCell>
          <TableCell className={styleClasses.btnTableCells}><RemoveIcon className={styleClasses.removeBtn} onClick={() => setSubtopicToRemove('test')}></RemoveIcon></TableCell>
        </TableRow>
      )
  }

  const handleOutsideClick = () => {
    setIsSubtopicBeingAdded(false);
    setTextSubtopicBeingModified("");
    setListSubtopicBeingModified("");
    setSelectedLexiconUnits([]);
    setSelectedPhrases([]);
  }

  const handleLexiconUnitUnselection = (unit: ViewLexiconUnit) => {
    const newSelectedArray: ViewLexiconUnit[] = selectedLexiconUnits.filter(selectedUnit => selectedUnit !== unit);
    setSelectedLexiconUnits(newSelectedArray);
  }

  const handleLexiconUnitFromAddedUnselection = (unit: ViewLexiconUnit) => {
    const newSelectedArray: ViewLexiconUnit[] = selectedLexiconUnitsFromAdded.filter(selectedUnit => selectedUnit !== unit);
    setSelectedLexiconUnitsFromAdded(newSelectedArray);
  }

  const handlePhraseUnselection = (phrase: ViewPhrase) => {
    const newSelectedArray: ViewPhrase[] = selectedPhrases.filter(selectedPhrase => selectedPhrase !== phrase);
    setSelectedPhrases(newSelectedArray);
  }

  const handlePhraseFromAddedUnselection = (phrase: ViewPhrase) => {
    const newSelectedArray: ViewPhrase[] = selectedPhrasesFromAdded.filter(selectedPhrase => selectedPhrase !== phrase);
    setSelectedPhrasesFromAdded(newSelectedArray);
  }

  const renderLexiconElementsIfNotAdded = (element: ViewLexiconUnit, index: number) => {
    if (partBeingEdited?.subTopics.has('lexicon')) {
      const unitsArray: ViewLexiconUnit[] = partBeingEdited?.subTopics.get('lexicon');
      if (!unitsArray.includes(element)) {
        return (
          <Box className={styleClasses.tableElements} key={index + '-unit'} onClick={() => setSelectedLexiconUnits([...selectedLexiconUnits, element])}>
            <Typography key={index + '-word'}>{element.word}</Typography>
          </Box>
        )
      }
    }
  }

  const renderPhrasesIfNotAdded = (element: ViewPhrase, index: number) => {
    if (partBeingEdited?.subTopics.has('phrases'))
      if (!partBeingEdited?.subTopics.get('phrases').includes(element))
        return (
          <Box className={styleClasses.tableElements} key={index + '-unit'} onClick={() => setSelectedPhrases([...selectedPhrases, element])}>
            <Typography key={index + '-phrase'}>{element.phrase}</Typography>
          </Box>
        )
  }

  const renderAdditionElements = () => {
    return listSubtopicBeingModified === "lexicon" ? (
      lexiconUnitsToDisplay.map((unit, index) => (
        <>
          {
            selectedLexiconUnits.includes(unit) ?
              <Box className={styleClasses.tableElements} sx={{ backgroundColor: '#C5E3FC' }} key={index + '-unit'} onClick={() => handleLexiconUnitUnselection(unit)}>
                <Typography key={index + '-word'}>{unit.word}</Typography>
              </Box> :
              renderLexiconElementsIfNotAdded(unit as ViewLexiconUnit, index)
          }
        </>
      )
      )
    ) : (
      phrasesToDisplay.map((phrase, index) => (
        <>
          {
            selectedPhrases.includes(phrase) ?
              <Box className={styleClasses.tableElements} sx={{ backgroundColor: '#C5E3FC' }} key={index + '-unit'} onClick={() => handlePhraseUnselection(phrase)}>
                <Typography key={index + '-phrase'}>{phrase.phrase}</Typography>
              </Box> :
              renderPhrasesIfNotAdded(phrase as ViewPhrase, index)
          }
        </>
      )
      )
    )
  }

  const handleSelectedAddition = () => {
    if (partBeingEdited !== undefined && listSubtopicBeingModified === "lexicon") {
      const allSubtopics = partBeingEdited.subTopics;
      const lexiconSubtopic = partBeingEdited.subTopics.get('lexicon') as ViewLexiconUnit[];
      const updatedLexiconSubtopic = lexiconSubtopic.concat(selectedLexiconUnits);
      allSubtopics.set('lexicon', updatedLexiconSubtopic);
      const edited: ViewLessonPart = new ViewLessonPart(partBeingEdited.name, allSubtopics)
      setPartBeingEdited(edited);
      setSelectedLexiconUnits([]);
    } else if (partBeingEdited !== undefined && listSubtopicBeingModified === "phrases") {
      const allSubtopics = partBeingEdited.subTopics;
      const phrasesSubtopic = partBeingEdited.subTopics.get('phrases') as ViewPhrase[];
      const updatedPhrasesSubtopic = phrasesSubtopic.concat(selectedPhrases);
      allSubtopics.set('phrases', updatedPhrasesSubtopic);
      const edited: ViewLessonPart = new ViewLessonPart(partBeingEdited.name, allSubtopics)
      setPartBeingEdited(edited);
      setSelectedPhrases([]);
    }
  }

  const handleRemovalFromAdded = () => {
    if (partBeingEdited !== undefined && listSubtopicBeingModified === "lexicon") {
      const allSubtopics = partBeingEdited.subTopics;
      const lexiconSubtopic = partBeingEdited.subTopics.get('lexicon') as ViewLexiconUnit[];
      const updatedLexiconSubtopic = lexiconSubtopic.filter(unit => !selectedLexiconUnitsFromAdded.includes(unit));
      allSubtopics.set('lexicon', updatedLexiconSubtopic);
      const edited: ViewLessonPart = new ViewLessonPart(partBeingEdited.name, allSubtopics);
      setPartBeingEdited(edited);
      setSelectedLexiconUnitsFromAdded([]);
    } else if (partBeingEdited !== undefined && listSubtopicBeingModified === "phrases") {
      const allSubtopics = partBeingEdited.subTopics;
      const phrasesSubtopic = partBeingEdited.subTopics.get('phrases') as ViewPhrase[];
      const updatedPhrasesSubtopic = phrasesSubtopic.filter(unit => !selectedPhrasesFromAdded.includes(unit));
      allSubtopics.set('phrases', updatedPhrasesSubtopic);
      const edited: ViewLessonPart = new ViewLessonPart(partBeingEdited.name, allSubtopics);
      setPartBeingEdited(edited);
      setSelectedPhrasesFromAdded([]);
    }
  }

  const renderLexiconAddedElements = () => {
    if (partBeingEdited?.subTopics.has('lexicon')) {
      return (
        partBeingEdited?.subTopics.get('lexicon').map((unit: ViewLexiconUnit, index: number) => (
          <>
            {
              selectedLexiconUnitsFromAdded.includes(unit) ?
                <Box className={styleClasses.tableElements} sx={{ backgroundColor: '#C5E3FC' }} key={index + '-unit'} onClick={() => handleLexiconUnitFromAddedUnselection(unit)}>
                  <Typography key={index + '-word'}>{unit.word}</Typography>
                </Box> :
                <Box className={styleClasses.tableElements} key={index + '-unit'} onClick={() => setSelectedLexiconUnitsFromAdded([...selectedLexiconUnitsFromAdded, unit])}>
                  <Typography key={index + '-word'}>{unit.word}</Typography>
                </Box>
            }
          </>
        )
        )
      )
    }
  }

  const renderPhrasesAdded = () => {
    if (partBeingEdited?.subTopics.has('phrases')) {
      return (
        partBeingEdited?.subTopics.get('phrases').map((phrase: ViewPhrase, index: number) => (
          <>
            {
              selectedPhrasesFromAdded.includes(phrase) ?
                <Box className={styleClasses.tableElements} sx={{ backgroundColor: '#C5E3FC' }} key={index + '-unit'} onClick={() => handlePhraseFromAddedUnselection(phrase)}>
                  <Typography key={index + '-phrase'}>{phrase.phrase}</Typography>
                </Box> :
                <Box className={styleClasses.tableElements} key={index + '-unit'} onClick={() => setSelectedPhrasesFromAdded([...selectedPhrasesFromAdded, phrase])}>
                  <Typography key={index + '-phrase'}>{phrase.phrase}</Typography>
                </Box>
            }
          </>
        )
        )
      )
    }
  }

  const renderAddedElements = () => {
    return listSubtopicBeingModified === "lexicon" ? (
      renderLexiconAddedElements()
    ) : (
      renderPhrasesAdded()
    )
  }

  const renderTextModalTitle = () => {
    return textSubtopicBeingModified === 'test' ? <Box sx={{ textAlign: 'center' }}><Typography variant="h3" component="h2">Įkelkite užduoties nuorodą</Typography></Box>
      : <Typography variant="h3" component="h2">Įveskite norimą tekstą</Typography>
  }

  const pickMinRows = textSubtopicBeingModified === 'test' ? 5 : 25;

  const pickMaxRows = textSubtopicBeingModified === 'test' ? 10 : 40;

  const renderLessonPartEditForm = () => {
    if (partBeingEdited !== undefined)
      return (
        <Box className={styleClasses.form}>
          <Modal
            data-testid="subtopicAdditionModal"
            open={isSubtopicBeingAdded}
            closeAfterTransition
            onClose={handleOutsideClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={partAdditionModal} width={{ xs: "70vw", sm: "40vw", md: "25vw" }} height={{ xs: '100vh', sm: '60vh', md: '40vh' }}>
              <Typography variant="h3" component="h2">Pasirinkite potemę</Typography>
              <Box pt="3vh">
                <CustomSelect value={selectValue} onChange={setSelectValue}>
                  {renderLexiconOption()}
                  {renderPhrasesOption()}
                  {renderGrammarOption()}
                  {renderInformationOption()}
                  {renderTestOption()}
                </CustomSelect>
              </Box>
              <Button className={styleClasses.submitButton} onClick={() => handleSubtopicAddition()}>Pridėti</Button>
            </Box>
          </Modal>
          <TextField id='lessonPartField' value={partBeingEdited.name} error={partNameErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Pamokos dalies pavadinimas" size="small" multiline maxRows={2} onChange={handleLessonPartNameChange}></TextField>
          {renderPartNameErrors()}
          <Box className={styleClasses.lessonPartModificationBox}>
            {renderSubtopicRequiredErrors()}
            {renderSubtopicFilledErrors()}
            <Table className={styleClasses.subTopicsTable}>
              <TableHead>
                <TableRow>
                  <TableCell className={styleClasses.nameTableCells}>
                    <Typography variant="tableHeadTitle">Pridėti potemę</Typography>
                  </TableCell>
                  <TableCell className={styleClasses.btnTableCells}>
                    <AddIcon id='addSubtopicIconBtn' className={styleClasses.addLessonPartButton} onClick={() => setIsSubtopicBeingAdded(true)}></AddIcon>
                  </TableCell>
                  <TableCell className={styleClasses.btnTableCells}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderLexiconAddition()}
                {renderPhrasesAddition()}
                {renderGrammarAddition()}
                {renderInformationAddition()}
                {renderTestAddition()}
              </TableBody>
            </Table>
          </Box>
          <Button id='saveSubtopicBtn' className={clsx(styleClasses.submitButton, styleClasses.addButton)} onClick={() => handleSave()}>Išsaugoti</Button>
          <Modal
            data-testid="textSubtopicEditModal"
            open={textSubtopicBeingModified !== ""}
            onClose={handleOutsideClick}
            closeAfterTransition
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={partAdditionModal} height={textSubtopicBeingModified === 'test' ? { xs: '140vh', sm: '80vh', md: '50vh' } : { xs: '210vh', sm: '120vh', md: '75vh' }} width={{ xs: "70vw", sm: "40vw", md: "25vw" }}>
              {renderTextModalTitle()}
              <Box pt="3vh">
                <TextareaAutosize style={{ width: '20vw' }} value={textMaterial} minRows={pickMinRows} maxRows={pickMaxRows} onChange={handleSubtopicTextFieldChange}></TextareaAutosize>
              </Box>
              <Button className={styleClasses.submitButton} onClick={() => handleTextSubtopicModification()}>Išsaugoti</Button>
            </Box>
          </Modal>
          <Modal
            data-testid="listSubtopicEditModal"
            open={listSubtopicBeingModified !== ""}
            closeAfterTransition
            onClose={handleOutsideClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={partAdditionModal} height={{ xs: '210vh', sm: '120vh', md: '75vh' }} width={{ xs: "140vw", sm: "80vw", md: "50vw" }}>
              <Typography variant="h3" component="h2">Pasirinkite norimus elementus</Typography>
              <Box className={styleClasses.pickContainer}>
                <Box className={styleClasses.leftPickContainer}>
                  {renderAdditionElements()}
                </Box>
                <Box className={styleClasses.inBetween}>
                  <AddIcon className={clsx(styleClasses.addLessonPartButton, styleClasses.addToListBtn)} onClick={() => handleSelectedAddition()}></AddIcon>
                  <RemoveIcon className={clsx(styleClasses.removeBtn, styleClasses.removeFromListBtn)} onClick={() => handleRemovalFromAdded()}></RemoveIcon>
                </Box>
                <Box className={styleClasses.rightPickContainer}>
                  {renderAddedElements()}
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      )
  }

  return (
    <Box className={styleClasses.container}>
      <Box className={clsx(styleClasses.form, styleClasses.leftForm)}>
        <TextField id='lessonNameField' value={name} error={nameErrors !== undefined} className={styleClasses.inputField} onFocus={() => setNameShrink(true)} onBlur={() => setNameShrink(false)} InputLabelProps={{ shrink: isInputEmpty(name) || nameShrink ? true : false }} variant="outlined" label="Pamokos pavadinimas" size="small" multiline maxRows={5} onChange={handleNameFieldChange}></TextField>
        {renderNameErrors()}
        <TextField id='lessonGoalField' value={goal} error={goalErrors !== undefined} className={styleClasses.inputField} onFocus={() => setGoalShrink(true)} onBlur={() => setGoalShrink(false)} InputLabelProps={{ shrink: isInputEmpty(goal) || goalShrink ? true : false }} variant="outlined" label="Pamokos tikslas" size="small" multiline maxRows={5} onChange={handleGoalFieldChange}></TextField>
        {renderGoalErrors()}
        <Box className={styleClasses.lessonPartAdditionBox}>
          {renderPartsFilledErrors()}
          {renderPartsRequiredErrors()}
          <Table className={styleClasses.subTopicsTable}>
            <TableHead>
              <TableRow>
                <TableCell className={styleClasses.nameTableCells}>
                  <Typography variant="tableHeadTitle">Pridėti pamokos dalį</Typography>
                </TableCell>
                <TableCell className={styleClasses.btnTableCells}>
                  <AddIcon id='addLessonIconBtn' className={styleClasses.addLessonPartButton} onClick={() => handlePartAddition()}></AddIcon>
                </TableCell>
                <TableCell className={styleClasses.btnTableCells}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderLessonParts()}
            </TableBody>
          </Table>
        </Box>
        <Button id='addLessonBtn' className={clsx(styleClasses.submitButton, styleClasses.addButton)} onClick={() => handleSubmit()}>Pridėti pamoką</Button>
      </Box>
      {renderLessonPartEditForm()}
    </Box>
  )
}