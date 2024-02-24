import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { formatDateFirstMonth } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Grid,
  TextField,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Modal,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  HusbandSchema,
  MerriageSchema,
  PriestSchema,
  WifeSchema,
  Witness1Schema,
  Witness2Schema,
  passwordSchema,
} from "../Formik/validationSchema";
import {
  HusbandValue,
  MerriageValue,
  PrietsValue,
  WifeValue,
  Witness1Value,
  Witness2Value,
  password,
} from "../Formik/InitalValue";
import { registration, updateUser, updateUserDetails } from "../Api/Apis";
import {
  husband,
  husbandGardian,
  merriage,
  priest,
  witness,
} from "../Interface/Interface";
import Preview from "./Preview";
import CustomSnackbar from "../../utils/CustomSnackbar";
import Loader from "../../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const MainForm = () => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>();

  const state = useLocation();
  const isSecondTime = state?.state?.fillForm;

  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { t, i18n } = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [document, setDocument] = useState([
    {
      id: 0,
      title: `${t("Husband School Leaving Certificate/ Birth Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 1,
      title: `${t("Wife School Leaving Certificate/ Birth Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 2,
      title: `${t("Witness-1 photo ID Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 3,
      title: `${t("Witness-2 photo ID Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 4,
      title: `${t("200+200 Agreement Stamp")}`,
      image: "",
      error: "",
    },
    {
      id: 5,
      title: `${t("Husband photo ID Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 6,
      title: `${t("Wife photo ID Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 7,
      title: `${t("Priest photo ID Proof")}`,
      image: "",
      error: "",
    },
    {
      id: 8,
      title: `${t("Marriage Evidence")}`,
      image: "",
      error: "",
    },
  ]);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const [merriageDetail, setMerriageDetail] = useState<merriage>({
    location: "",
    marriageDate: "",
    marriageAddress: "",
  });

  const [husbandDetail, setHusbandDetail] = useState<husband>({
    surname: "",
    name: "",
    birthDate: "",
    age: 0,
    statusBride: "",
    Religions: "",
    location: "",
    address: "",
    mobile: "",
    email: "",
  });

  const [husbandGardian, setHusbandGardian] = useState<husbandGardian>({
    surname: "",
    name: "",
    age: 0,
    location: "",
    address: "",
    landline: "",
  });

  const [wifeDetail, setWifeDetail] = useState<husband>({
    surname: "",
    name: "",
    birthDate: "",
    age: 0,
    statusBride: "",
    Religions: "",
    location: "",
    address: "",
    mobile: "",
    email: "",
  });

  const [wifeGardian, setWifeGardian] = useState<husbandGardian>({
    surname: "",
    name: "",
    age: 0,
    location: "",
    address: "",
    landline: "",
    // mobile: "",
    // email: "",
  });

  const [priestDetail, setPriestDetail] = useState<priest>({
    name: "",
    birthDate: "",
    age: 0,
    location: "",
    address: "",
  });

  const [witness1, setWitness1] = useState<witness>({
    name: "",
    birthDate: "",
    age: 0,
    address: "",
  });

  const [witness2, setWitness2] = useState<witness>({
    name: "",
    birthDate: "",
    age: 0,
    address: "",
  });
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const {
    values: valuesForm1,
    touched: touchedForm1,
    errors: errorsForm1,
    handleBlur: handleBlurForm1,
    handleChange: handleChangeForm1,
    handleSubmit: handleSubmitForm1,
  } = useFormik({
    initialValues: MerriageValue,
    validationSchema: MerriageSchema,
    onSubmit: (valuesForm1) => {
      setMerriageDetail((prevState: any) => ({
        ...prevState,
        location: valuesForm1?.location,
        marriageDate: valuesForm1?.marriageDate,
        marriageAddress: valuesForm1?.marriageAddress,
      }));
    },
  });

  const {
    values: valuesForm2,
    touched: touchedForm2,
    errors: errorsForm2,
    handleBlur: handleBlurForm2,
    handleChange: handleChangeForm2,
    handleSubmit: handleSubmitForm2,
  } = useFormik({
    initialValues: HusbandValue,
    validationSchema: HusbandSchema,
    onSubmit: (valuesForm2) => {
      setHusbandDetail((prevState: any) => ({
        ...prevState,
        surname: valuesForm2?.husbandsurname,
        name: valuesForm2?.husbandname,
        birthDate: valuesForm2?.husbandbirthdate,
        age: valuesForm2?.husbandage,
        statusBride: valuesForm2?.husbandstatus,
        Religions: valuesForm2?.husbandreligions,
        location: valuesForm2?.husbandlocation,
        address: valuesForm2?.husbandaddress,
        mobile: valuesForm2?.mobile,
        email: valuesForm2?.email,
      }));
      setHusbandGardian((prevState: any) => ({
        ...prevState,
        surname: valuesForm2?.gardianSurname,
        name: valuesForm2?.gardianName,
        age: valuesForm2?.gardianAge,
        location: valuesForm2?.gardianLocation,
        address: valuesForm2?.gardianAddress,
        landline: valuesForm2?.gardianContact,
        mobile: valuesForm2?.gardianMobile,
        email: valuesForm2?.gardianEmail,
      }));
    },
  });

  const {
    values: valuesForm3,
    touched: touchedForm3,
    errors: errorsForm3,
    handleBlur: handleBlurForm3,
    handleChange: handleChangeForm3,
    handleSubmit: handleSubmitForm3,
  } = useFormik({
    initialValues: WifeValue,
    validationSchema: WifeSchema,
    onSubmit: (valuesForm3) => {
      setWifeDetail((prevState: any) => ({
        ...prevState,
        surname: valuesForm3?.wifesurname,
        name: valuesForm3?.wifename,
        birthDate: valuesForm3?.wifebirthdate,
        age: valuesForm3?.wifeage,
        statusBride: valuesForm3?.wifestatus,
        Religions: valuesForm3?.wifereligions,
        location: valuesForm3?.wifelocation,
        address: valuesForm3?.wifeaddress,
        mobile: valuesForm3?.wifemobile,
        email: valuesForm3?.wifeemail,
      }));
      setWifeGardian((prevState: any) => ({
        ...prevState,
        surname: valuesForm3?.gardianwifeSurname,
        name: valuesForm3?.gardianwifeName,
        age: valuesForm3?.gardianwifeAge,
        location: valuesForm3?.gardianwifeLocation,
        address: valuesForm3?.gardianwifeAddress,
        landline: valuesForm3?.gardianwifeContact,
        mobile: valuesForm3?.gardianwifeMobile,
        email: valuesForm3?.gardianwifeEmail,
      }));
    },
  });

  const {
    values: valuesForm4,
    touched: touchedForm4,
    errors: errorsForm4,
    handleBlur: handleBlurForm4,
    handleChange: handleChangeForm4,
    handleSubmit: handleSubmitForm4,
  } = useFormik({
    initialValues: PrietsValue,
    validationSchema: PriestSchema,
    onSubmit: (valuesForm4) => {
      setPriestDetail((prevState: any) => ({
        ...prevState,
        name: valuesForm4?.priestname,
        birthDate: valuesForm4?.priestbirthdate,
        age: valuesForm4?.priestage,
        location: valuesForm4?.priestlocation,
        address: valuesForm4?.prietsaddress,
      }));
    },
  });

  const {
    values: valuesForm5,
    touched: touchedForm5,
    errors: errorsForm5,
    handleBlur: handleBlurForm5,
    handleChange: handleChangeForm5,
    handleSubmit: handleSubmitForm5,
  } = useFormik({
    initialValues: Witness1Value,
    validationSchema: Witness1Schema,
    onSubmit: (valuesForm5) => {
      setWitness1((prevState: any) => ({
        ...prevState,
        name: valuesForm5?.witness1detail,
        birthDate: valuesForm5?.witness1birthdate,
        age: valuesForm5?.witness1age,
        address: valuesForm5?.witness1address,
      }));
    },
  });

  const {
    values: valuesForm6,
    touched: touchedForm6,
    errors: errorsForm6,
    handleBlur: handleBlurForm6,
    handleChange: handleChangeForm6,
    handleSubmit: handleSubmitForm6,
  } = useFormik({
    initialValues: Witness2Value,
    validationSchema: Witness2Schema,
    onSubmit: (valuesForm6) => {
      setWitness2((prevState: any) => ({
        ...prevState,
        name: valuesForm6?.witness2name,
        birthDate: valuesForm6?.witness2birthdate,
        age: valuesForm6?.witness2age,
        address: valuesForm6?.witness2address,
      }));
    },
  });

  const {
    values: valuesFormPassword,
    touched: touchedFormPassword,
    errors: errorsFormPassword,
    handleBlur: handleBlurFormPassword,
    handleChange: handleChangeFormPassword,
    handleSubmit: handleSubmitFormPassword,
  } = useFormik({
    initialValues: password,
    validationSchema: passwordSchema,
    onSubmit: (valuesFormPassword) => {
      setUserPassword(valuesFormPassword?.password);
      setOpen(false);
    },
  });

  const handleSubmit = () => {
    const updatedDocument: any = [...document];
    for (let i = 0; i < updatedDocument.length; i++) {
      if (updatedDocument[i].image === "") {
        updatedDocument[i].error = "Please select this image";
      } else if (updatedDocument[i].image?.size > 500000) {
        updatedDocument[i].error = "Image size should not exceed 500 KB";
      } else {
        updatedDocument[i].error = "";
      }
    }

    setDocument(updatedDocument);
  };

  const handleChange = (image: any, index: number) => {
    const data = [...document];
    data[index].image = image;
    setDocument(data);
  };

  const submitData = async (e: any) => {
    setLoadingPage(true);
    e.preventDefault();

    const marriageDetails = {
      marriageDate: formatDateFirstMonth(merriageDetail?.marriageDate),
      location: merriageDetail?.location,
      marriageAddress: merriageDetail?.marriageAddress,
    };

    const husbandDetails = {
      name: husbandDetail.name,
      surname: husbandDetail.surname,
      dateOfBirth: formatDateFirstMonth(husbandDetail?.birthDate),
      age: String(husbandDetail?.age),
      statusOfBridegroom: husbandDetail?.statusBride,
      religious: husbandDetail?.Religions,
      location: husbandDetail?.location,
      address: husbandDetail?.address,
      mobileNumber: husbandDetail?.mobile,
      emailId: husbandDetail?.email,
      guardianDetails: {
        name: husbandGardian?.name,
        surname: husbandGardian?.surname,
        age: String(husbandGardian?.age),
        location: husbandGardian?.location,
        address: husbandGardian?.address,
        contactNumber: String(husbandGardian?.landline),
      },
    };

    const wifeDetails = {
      name: wifeDetail.name,
      surname: wifeDetail.surname,
      dateOfBirth: formatDateFirstMonth(wifeDetail?.birthDate),
      age: String(wifeDetail?.age),
      statusOfBridegroom: wifeDetail?.statusBride,
      religious: wifeDetail?.Religions,
      location: wifeDetail?.location,
      address: wifeDetail?.address,
      mobileNumber: wifeDetail?.mobile,
      emailId: wifeDetail?.email,
      guardianDetails: {
        name: wifeGardian?.name,
        surname: wifeGardian?.surname,
        age: String(wifeGardian?.age),
        location: wifeGardian?.location,
        address: wifeGardian?.address,
        contactNumber: String(wifeGardian?.landline),
      },
    };

    const priestDetails = {
      name: priestDetail?.name,
      dateOfBirth: formatDateFirstMonth(priestDetail?.birthDate),
      age: String(priestDetail?.age),
      location: priestDetail?.location,
      address: priestDetail?.address,
    };

    const witnessOneDetails = {
      name: witness1?.name,
      dateOfBirth: formatDateFirstMonth(witness1?.birthDate),
      age: String(witness1?.age),
      address: String(witness1?.address),
    };

    const witnessTwoDetails = {
      name: witness2?.name,
      dateOfBirth: formatDateFirstMonth(witness2?.birthDate),
      age: String(witness2?.age),
      address: String(witness2?.address),
    };

    const formData = new FormData();

    formData.append(
      "marriageDetails[marriageDate]",
      marriageDetails.marriageDate
    );
    formData.append("marriageDetails[location]", marriageDetails.location);
    formData.append(
      "marriageDetails[marriageAddress]",
      marriageDetails.marriageAddress
    );

    formData.append("husbandDetails[name]", husbandDetails.name);
    formData.append("husbandDetails[surname]", husbandDetails.surname);
    formData.append("husbandDetails[dateOfBirth]", husbandDetails.dateOfBirth);
    formData.append("husbandDetails[age]", husbandDetails.age);
    formData.append(
      "husbandDetails[statusOfBridegroom]",
      husbandDetails.statusOfBridegroom
    );
    formData.append("husbandDetails[religious]", husbandDetails.religious);
    formData.append("husbandDetails[location]", husbandDetails.location);
    formData.append("husbandDetails[address]", husbandDetails.address);
    formData.append(
      "husbandDetails[mobileNumber]",
      husbandDetails.mobileNumber
    );
    formData.append("husbandDetails[emailId]", husbandDetails.emailId);
    formData.append(
      "husbandDetails[guardianDetails][name]",
      husbandDetails.guardianDetails.name
    );
    formData.append(
      "husbandDetails[guardianDetails][surname]",
      husbandDetails.guardianDetails.surname
    );
    formData.append(
      "husbandDetails[guardianDetails][age]",
      husbandDetails.guardianDetails.age
    );
    formData.append(
      "husbandDetails[guardianDetails][location]",
      husbandDetails.guardianDetails.location
    );
    formData.append(
      "husbandDetails[guardianDetails][address]",
      husbandDetails.guardianDetails.address
    );
    formData.append(
      "husbandDetails[guardianDetails][contactNumber]",
      husbandDetails.guardianDetails.contactNumber
    );

    formData.append("wifeDetails[name]", wifeDetail.name);
    formData.append("wifeDetails[surname]", wifeDetail.surname);
    formData.append(
      "wifeDetails[dateOfBirth]",
      formatDateFirstMonth(wifeDetail.birthDate)
    );
    formData.append("wifeDetails[age]", String(wifeDetail.age));
    formData.append("wifeDetails[statusOfBridegroom]", wifeDetail.statusBride);
    formData.append("wifeDetails[religious]", wifeDetail.Religions);
    formData.append("wifeDetails[location]", wifeDetail.location);
    formData.append("wifeDetails[address]", wifeDetail.address);
    formData.append("wifeDetails[mobileNumber]", wifeDetails?.mobileNumber);
    formData.append("wifeDetails[emailId]", wifeDetails?.emailId);
    formData.append(
      "wifeDetails[guardianDetails][name]",
      wifeDetails.guardianDetails.name
    );
    formData.append(
      "wifeDetails[guardianDetails][surname]",
      wifeDetails.guardianDetails.surname
    );
    formData.append(
      "wifeDetails[guardianDetails][age]",
      wifeDetails.guardianDetails.age
    );
    formData.append(
      "wifeDetails[guardianDetails][location]",
      wifeDetails.guardianDetails.location
    );
    formData.append(
      "wifeDetails[guardianDetails][address]",
      wifeDetails.guardianDetails.address
    );
    formData.append(
      "wifeDetails[guardianDetails][contactNumber]",
      wifeDetails.guardianDetails.contactNumber
    );

    formData.append("priestDetails[name]", priestDetails.name);
    formData.append("priestDetails[dateOfBirth]", priestDetails.dateOfBirth);
    formData.append("priestDetails[age]", priestDetails.age);
    formData.append("priestDetails[location]", priestDetails.location);
    formData.append("priestDetails[address]", priestDetails.address);

    formData.append("witnessOneDetails[name]", witnessOneDetails.name);
    formData.append(
      "witnessOneDetails[dateOfBirth]",
      witnessOneDetails.dateOfBirth
    );
    formData.append("witnessOneDetails[age]", witnessOneDetails.age);
    formData.append("witnessOneDetails[address]", witnessOneDetails.address);

    formData.append("witnessTwoDetails[name]", witnessTwoDetails.name);
    formData.append(
      "witnessTwoDetails[dateOfBirth]",
      witnessTwoDetails.dateOfBirth
    );
    formData.append("witnessTwoDetails[age]", witnessTwoDetails.age);
    formData.append("witnessTwoDetails[address]", witnessTwoDetails.address);

    formData.append("HusbandSchoolLeavingCertificate", document[0]?.image);
    formData.append("WifeSchoolLeavingCertificate", document[1]?.image);
    formData.append("WitnessOnePhotoProof", document[2]?.image);
    formData.append("WitnessTwoPhotoProof", document[3]?.image);
    formData.append("AgreementStamp", document[4]?.image);
    formData.append("HusbandPhotoIdProof", document[5]?.image);
    formData.append("WifePhotoIdProof", document[6]?.image);
    formData.append("PriestPhotoIdProof", document[7]?.image);
    formData.append("MarriageEvidence", document[8]?.image);

    try {
      const response = await registration(formData);

      if (response.statusCode === 200) {
        await setLoadingPage(false);
        await setOpenSnackbar(true);
        await setSnackbarSeverity("success");
        await setSnackbarMessage("Registration successful!");
        // setOpen(true);
        await sessionStorage.setItem(
          "passwordToken",
          response?.data?.setPasswordToken
        );
        navigate("/set-password");
      } else {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(response?.message);
        setLoadingPage(false);
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Something went wrong!");
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    const loginToken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: loginToken,
    };
    updateUserDetails(obj)
      .then((response) => {
        setResponseData(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isSecondTime]);

  return (
    <form onSubmit={submitData}>
      <Header />
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "background.paper",
            m: "10px",
            p: "10px",
          }}
        >
          <Box
            p={1}
            sx={{
              ":hover": {
                bgcolor: "#063970",
                color: "white",
                cursor: "pointer",
                borderRadius: "10px",
              },
            }}
            onClick={() => changeLanguage("en")}
          >
            Eng
          </Box>
          <Box
            p={1}
            sx={{
              ":hover": {
                bgcolor: "#063970",
                color: "white",
                cursor: "pointer",
                borderRadius: "10px",
              },
            }}
            onClick={() => changeLanguage("gu")}
          >
            Guj
          </Box>
        </Box>
      </div>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel1bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Merriage Details")}
          </AccordionSummary>

          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Application Date")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="applicationDate"
                    defaultValue={currentDate}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="location"
                    value={valuesForm1.location}
                    onChange={handleChangeForm1}
                    onBlur={handleBlurForm1}
                  />
                  {errorsForm1.location && touchedForm1.location ? (
                    <span style={{ color: "red" }}>{errorsForm1.location}</span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Marriage Date")}</InputLabel>
                  <TextField
                    type="date"
                    InputProps={{
                      inputProps: {
                        min: "1956-01-01",
                        max: currentDate,
                      },
                    }}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="marriageDate"
                    value={valuesForm1.marriageDate || ""}
                    onChange={handleChangeForm1}
                    onBlur={handleBlurForm1}
                  />

                  {errorsForm1.marriageDate && touchedForm1.marriageDate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm1.marriageDate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Marriage Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="marriageAddress"
                    value={valuesForm1.marriageAddress}
                    onChange={handleChangeForm1}
                    onBlur={handleBlurForm1}
                  />
                  {errorsForm1.marriageAddress &&
                  touchedForm1.marriageAddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm1.marriageAddress}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Button
                  onClick={() => handleSubmitForm1()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel2bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Husband Details")}
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Surname")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandsurname"
                    value={valuesForm2.husbandsurname}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandsurname && touchedForm2.husbandsurname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandsurname}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandname"
                    value={valuesForm2.husbandname}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandname && touchedForm2.husbandname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandname}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Birth Date")}</InputLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandbirthdate"
                    value={valuesForm2.husbandbirthdate || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandbirthdate &&
                  touchedForm2.husbandbirthdate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandbirthdate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandage"
                    value={valuesForm2.husbandage}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandage && touchedForm2.husbandage ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandage}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>
                    {t("Status of Bridegroom at the time")}
                  </InputLabel>
                  <Select
                    label="Age"
                    sx={{ width: "100%" }}
                    name="husbandstatus"
                    value={valuesForm2.husbandstatus}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  >
                    <MenuItem value="">
                      <em>{t("None")}</em>
                    </MenuItem>
                    <MenuItem value={"Married"}>{t("Married")}</MenuItem>
                    <MenuItem value={"UnMarried"}>{t("UnMarried")}</MenuItem>
                    <MenuItem value={"Divorced"}>{t("Divorced")}</MenuItem>
                    <MenuItem value={"Widower/Widow"}>
                      {t("Widower/Widow")}
                    </MenuItem>
                  </Select>
                  {errorsForm2.husbandstatus && touchedForm2.husbandstatus ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandstatus}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Religious")}</InputLabel>
                  <Select
                    label="Age"
                    sx={{ width: "100%" }}
                    name="husbandreligions"
                    value={valuesForm2.husbandreligions || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  >
                    <MenuItem value="">
                      <em>{t("None")}</em>
                    </MenuItem>
                    <MenuItem value={"Hindu"}>{t("Hindu")}</MenuItem>
                    <MenuItem value={"Jain"}>{t("Jain")}</MenuItem>
                    <MenuItem value={"Buddhist"}>{t("Buddhist")}</MenuItem>
                    <MenuItem value={"Sikh"}>{t("Sikh")}</MenuItem>
                    <MenuItem value={"Christian"}>{t("Christian")}</MenuItem>
                    <MenuItem value={"Parsi"}>{t("Parsi")}</MenuItem>
                    <MenuItem value={"Jewish"}>{t("Jewish")}</MenuItem>
                    <MenuItem value={"Muslim"}>{t("Muslim")}</MenuItem>
                    <MenuItem value={"Other"}>{t("Other")}</MenuItem>
                    <MenuItem value={"No Religion"}>
                      {t("No Religion")}
                    </MenuItem>
                    <MenuItem value={"Spiritual-not religious"}>
                      {t("Spiritual-not religious")}
                    </MenuItem>
                  </Select>
                  {errorsForm2.husbandreligions &&
                  touchedForm2.husbandreligions ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandreligions}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandlocation"
                    value={valuesForm2.husbandlocation}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandlocation &&
                  touchedForm2.husbandlocation ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandlocation}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandaddress"
                    value={valuesForm2.husbandaddress}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.husbandaddress && touchedForm2.husbandaddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.husbandaddress}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="mobile"
                    value={valuesForm2.mobile}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.mobile && touchedForm2.mobile ? (
                    <span style={{ color: "red" }}>{errorsForm2.mobile}</span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="email"
                    value={valuesForm2.email || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.email && touchedForm2.email ? (
                    <span style={{ color: "red" }}>{errorsForm2.email}</span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <h3>{t("Guardian/Mother/Father")}</h3>
                  <InputLabel sx={{ marginTop: "1.9rem" }}>
                    {t("Surname")}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianSurname"
                    value={valuesForm2.gardianSurname || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianSurname && touchedForm2.gardianSurname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianSurname}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{ width: "100%", mt: "60px" }}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianName"
                    value={valuesForm2.gardianName || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianName && touchedForm2.gardianName ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianName}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianAge"
                    value={valuesForm2.gardianAge}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianAge && touchedForm2.gardianAge ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianAge}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianLocation"
                    value={valuesForm2.gardianLocation || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianLocation &&
                  touchedForm2.gardianLocation ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianLocation}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianAddress"
                    value={valuesForm2.gardianAddress || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianAddress && touchedForm2.gardianAddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianAddress}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Contact(Landline)")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianContact"
                    value={valuesForm2.gardianContact}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianContact && touchedForm2.gardianContact ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianContact}
                    </span>
                  ) : null}
                </Grid>
                {/* <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianMobile"
                    value={valuesForm2.gardianMobile}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianMobile && touchedForm2.gardianMobile ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianMobile}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianEmail"
                    value={valuesForm2.gardianEmail || ""}
                    onChange={handleChangeForm2}
                    onBlur={handleBlurForm2}
                  />
                  {errorsForm2.gardianEmail && touchedForm2.gardianEmail ? (
                    <span style={{ color: "red" }}>
                      {errorsForm2.gardianEmail}
                    </span>
                  ) : null}
                </Grid> */}
                <Button
                  onClick={() => handleSubmitForm2()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel3bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Wife Details")}
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Surname")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifesurname"
                    value={valuesForm3.wifesurname}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifesurname && touchedForm3.wifesurname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifesurname}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifename"
                    value={valuesForm3.wifename}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifename && touchedForm3.wifename ? (
                    <span style={{ color: "red" }}>{errorsForm3.wifename}</span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Birth Date")}</InputLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifebirthdate"
                    value={valuesForm3.wifebirthdate || ""}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />

                  {errorsForm3.wifebirthdate && touchedForm3.wifebirthdate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifebirthdate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeage"
                    value={valuesForm3.wifeage}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifeage && touchedForm3.wifeage ? (
                    <span style={{ color: "red" }}>{errorsForm3.wifeage}</span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>
                    {t("Status of Bridegroom at the time")}
                  </InputLabel>
                  <Select
                    label="Age"
                    sx={{ width: "100%" }}
                    name="wifestatus"
                    value={valuesForm3.wifestatus}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  >
                    <MenuItem value="">
                      <em>{t("None")}</em>
                    </MenuItem>
                    <MenuItem value={"Married"}>{t("Married")}</MenuItem>
                    <MenuItem value={"UnMarried"}>{t("UnMarried")}</MenuItem>
                    <MenuItem value={"Divorced"}>{t("Divorced")}</MenuItem>
                    <MenuItem value={"Widower/Widow"}>
                      {t("Widower/Widow")}
                    </MenuItem>
                  </Select>
                  {errorsForm3.wifestatus && touchedForm3.wifestatus ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifestatus}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Religious")}</InputLabel>
                  <Select
                    label="Age"
                    sx={{ width: "100%" }}
                    name="wifereligions"
                    value={valuesForm3.wifereligions}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  >
                    <MenuItem value="">
                      <em>{t("None")}</em>
                    </MenuItem>
                    <MenuItem value={"Hindu"}>{t("Hindu")}</MenuItem>
                    <MenuItem value={"Jain"}>{t("Jain")}</MenuItem>
                    <MenuItem value={"Buddhist"}>{t("Buddhist")}</MenuItem>
                    <MenuItem value={"Sikh"}>{t("Sikh")}</MenuItem>
                    <MenuItem value={"Christian"}>{t("Christian")}</MenuItem>
                    <MenuItem value={"Parsi"}>{t("Parsi")}</MenuItem>
                    <MenuItem value={"Jewish"}>{t("Jewish")}</MenuItem>
                    <MenuItem value={"Muslim"}>{t("Muslim")}</MenuItem>
                    <MenuItem value={"Other"}>{t("Other")}</MenuItem>
                    <MenuItem value={"No Religion"}>
                      {t("No Religion")}
                    </MenuItem>
                    <MenuItem value={"Spiritual-not religious"}>
                      {t("Spiritual-not religious")}
                    </MenuItem>
                  </Select>
                  {errorsForm3.wifereligions && touchedForm3.wifereligions ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifereligions}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifelocation"
                    value={valuesForm3.wifelocation}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifelocation && touchedForm3.wifelocation ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifelocation}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeaddress"
                    value={valuesForm3.wifeaddress}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifeaddress && touchedForm3.wifeaddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifeaddress}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifemobile"
                    value={valuesForm3.wifemobile}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifemobile && touchedForm3.wifemobile ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifemobile}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeemail"
                    value={valuesForm3.wifeemail}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.wifeemail && touchedForm3.wifeemail ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.wifeemail}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={6}>
                  <h3>{t("Guardian/Mother/Father")}</h3>
                  <InputLabel sx={{ marginTop: "1.9rem" }}>
                    {t("Surname")}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeSurname"
                    value={valuesForm3.gardianwifeSurname}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeSurname &&
                  touchedForm3.gardianwifeSurname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeSurname}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{ width: "100%", mt: "60px" }}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeName"
                    value={valuesForm3.gardianwifeName}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeName &&
                  touchedForm3.gardianwifeName ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeName}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeAge"
                    value={valuesForm3.gardianwifeAge}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeAge && touchedForm3.gardianwifeAge ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeAge}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeLocation"
                    value={valuesForm3.gardianwifeLocation}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeLocation &&
                  touchedForm3.gardianwifeLocation ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeLocation}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeAddress"
                    value={valuesForm3.gardianwifeAddress}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeAddress &&
                  touchedForm3.gardianwifeAddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeAddress}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Contact(Landline)")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeContact"
                    value={valuesForm3.gardianwifeContact}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeContact &&
                  touchedForm3.gardianwifeContact ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeContact}
                    </span>
                  ) : null}
                </Grid>
                {/* <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeMobile"
                    value={valuesForm3.gardianwifeMobile}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeMobile &&
                  touchedForm3.gardianwifeMobile ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeMobile}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeEmail"
                    value={valuesForm3.gardianwifeEmail}
                    onChange={handleChangeForm3}
                    onBlur={handleBlurForm3}
                  />
                  {errorsForm3.gardianwifeEmail &&
                  touchedForm3.gardianwifeEmail ? (
                    <span style={{ color: "red" }}>
                      {errorsForm3.gardianwifeEmail}
                    </span>
                  ) : null}
                </Grid> */}
                <Button
                  onClick={() => handleSubmitForm3()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel4bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Priest Details")}
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestname"
                    value={valuesForm4.priestname}
                    onChange={handleChangeForm4}
                    onBlur={handleBlurForm4}
                  />
                  {errorsForm4.priestname && touchedForm4.priestname ? (
                    <span style={{ color: "red" }}>
                      {errorsForm4.priestname}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestbirthdate"
                    value={valuesForm4.priestbirthdate}
                    onChange={handleChangeForm4}
                    onBlur={handleBlurForm4}
                  />
                  {errorsForm4.priestbirthdate &&
                  touchedForm4.priestbirthdate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm4.priestbirthdate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestage"
                    value={valuesForm4.priestage}
                    onChange={handleChangeForm4}
                    onBlur={handleBlurForm4}
                  />
                  {errorsForm4.priestage && touchedForm4.priestage ? (
                    <span style={{ color: "red" }}>
                      {errorsForm4.priestage}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Priest Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestlocation"
                    value={valuesForm4.priestlocation}
                    onChange={handleChangeForm4}
                    onBlur={handleBlurForm4}
                  />
                  {errorsForm4.priestlocation && touchedForm4.priestlocation ? (
                    <span style={{ color: "red" }}>
                      {errorsForm4.priestlocation}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="prietsaddress"
                    value={valuesForm4.prietsaddress}
                    onChange={handleChangeForm4}
                    onBlur={handleBlurForm4}
                  />
                  {errorsForm4.prietsaddress && touchedForm4.prietsaddress ? (
                    <span style={{ color: "red" }}>
                      {errorsForm4.prietsaddress}
                    </span>
                  ) : null}
                </Grid>
                <Button
                  onClick={() => handleSubmitForm4()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel5bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Witness-1 Details")}
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1detail"
                    value={valuesForm5.witness1detail}
                    onChange={handleChangeForm5}
                    onBlur={handleBlurForm5}
                  />
                  {errorsForm5.witness1detail && touchedForm5.witness1detail ? (
                    <span style={{ color: "red" }}>
                      {errorsForm5.witness1detail}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1birthdate"
                    value={valuesForm5.witness1birthdate}
                    onChange={handleChangeForm5}
                    onBlur={handleBlurForm5}
                  />
                  {errorsForm5.witness1birthdate &&
                  touchedForm5.witness1birthdate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm5.witness1birthdate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1age"
                    value={valuesForm5.witness1age}
                    onChange={handleChangeForm5}
                    onBlur={handleBlurForm5}
                  />
                  {errorsForm5.witness1age && touchedForm5.witness1age ? (
                    <span style={{ color: "red" }}>
                      {errorsForm5.witness1age}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1address"
                    value={valuesForm5.witness1address}
                    onChange={handleChangeForm5}
                    onBlur={handleBlurForm5}
                  />
                  {errorsForm5.witness1address &&
                  touchedForm5.witness1address ? (
                    <span style={{ color: "red" }}>
                      {errorsForm5.witness1address}
                    </span>
                  ) : null}
                </Grid>
                <Button
                  onClick={() => handleSubmitForm5()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel6bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Witness-2 Details")}
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2name"
                    value={valuesForm6.witness2name}
                    onChange={handleChangeForm6}
                    onBlur={handleBlurForm6}
                  />
                  {errorsForm6.witness2name && touchedForm6.witness2name ? (
                    <span style={{ color: "red" }}>
                      {errorsForm6.witness2name}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2birthdate"
                    value={valuesForm6.witness2birthdate}
                    onChange={handleChangeForm6}
                    onBlur={handleBlurForm6}
                  />
                  {errorsForm6.witness2birthdate &&
                  touchedForm6.witness2birthdate ? (
                    <span style={{ color: "red" }}>
                      {errorsForm6.witness2birthdate}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2age"
                    value={valuesForm6.witness2age}
                    onChange={handleChangeForm6}
                    onBlur={handleBlurForm6}
                  />
                  {errorsForm6.witness2age && touchedForm6.witness2age ? (
                    <span style={{ color: "red" }}>
                      {errorsForm6.witness2age}
                    </span>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2address"
                    value={valuesForm6.witness2address}
                    onChange={handleChangeForm6}
                    onBlur={handleBlurForm6}
                  />
                  {errorsForm6.witness2address &&
                  touchedForm6.witness2address ? (
                    <span style={{ color: "red" }}>
                      {errorsForm6.witness2address}
                    </span>
                  ) : null}
                </Grid>
                <Button
                  onClick={() => handleSubmitForm6()}
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion>
          <AccordionSummary
            id="panel7bh-header"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "white",
              boxShadow: 20,
            }}
          >
            {t("Attachment Document")}
          </AccordionSummary>
          <center>
            <AccordionDetails>
              <div className="row">
                {document.map((data, index) => (
                  <div className="col-md-4" key={index}>
                    <Preview {...data} onChange={handleChange} />
                    <span style={{ color: "red" }}>{data.error}</span>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </center>
          <Box textAlign="center">
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              sx={{
                width: "10%",
                height: "40px",
                mt: "20px",
                mb: "20px",
                backgroundColor: "#2e7d32",
              }}
            >
              {t("SAVE")}
            </Button>
          </Box>
        </Accordion>
      </Box>

      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      <Box textAlign="center">
        <Button
          variant="contained"
          sx={{ width: "30%", height: "70px", mt: "150px" }}
          // onClick={submitData}
          type="submit"
        >
          {t("Apply for marriage Registration")}
        </Button>
      </Box>
      <Footer />
      <Loader open={loadingPage} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginLeft: "11px" }}
          >
            Enter password
          </Typography>
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            style={{ marginTop: "20px", width: "19rem" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={valuesFormPassword.password}
              onChange={handleChangeFormPassword}
              onBlur={handleBlurFormPassword}
            />
          </FormControl>
          <div style={{ marginLeft: "10px" }}>
            {errorsFormPassword.password && touchedFormPassword.password ? (
              <span style={{ color: "red" }}>
                {errorsFormPassword.password}
              </span>
            ) : null}
          </div>
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            onClick={() => handleSubmitFormPassword()}
          >
            Set Password
          </Button>
        </Box>
      </Modal>
    </form>
  );
};
export default MainForm;
