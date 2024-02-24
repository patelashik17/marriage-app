import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { Grid, TextField, FormGroup, InputLabel, Box } from "@mui/material";
import { updateUser, updateUserDetails } from "../Api/Apis";
import {
  convertDateFormat,
  formatDateFirstMonth,
  formatDates,
} from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/footer";
import uploadImage from "./upload.png";
import CustomSnackbar from "../../utils/CustomSnackbar";
import Loader from "../../Loader/Loader";

const UpdateRegistrationForm = () => {
  const [responseData, setResponseData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  function changeLanguage(lang: any) {
    i18n.changeLanguage(lang);
  }

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  useEffect(() => {
    setLoading(true);

    const loginToken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: loginToken,
    };
    updateUserDetails(obj)
      .then((response) => {
        setResponseData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);
  const [image4, setImage4] = useState<any>(null);
  const [image5, setImage5] = useState<any>(null);
  const [image6, setImage6] = useState<any>(null);
  const [image7, setImage7] = useState<any>(null);
  const [image8, setImage8] = useState<any>(null);
  const [image9, setImage9] = useState<any>(null);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);
  const inputRef7 = useRef<HTMLInputElement>(null);
  const inputRef8 = useRef<HTMLInputElement>(null);
  const inputRef9 = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const ref = e.currentTarget.querySelector('input[type="file"]');
    if (ref instanceof HTMLInputElement) {
      ref.click();
    }
  };

  const handleChangeImage = (e: any, value: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Image size should not exceed 500 KB");
      } else {
        switch (value) {
          case "image1":
            setImage1(file);
            break;
          case "image2":
            setImage2(file);
            break;
          case "image3":
            setImage3(file);
            break;
          case "image4":
            setImage4(file);
            break;
          case "image5":
            setImage5(file);
            break;
          case "image6":
            setImage6(file);
            break;
          case "image7":
            setImage7(file);
            break;
          case "image8":
            setImage8(file);
            break;
          case "image9":
            setImage9(file);
            break;
          default:
            console.log("error");
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    const checkImageUploadStatus = (status: boolean, image: any) => {
      if (status && !image) {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Upload all wrong image");
      } else {
        setOpenSnackbar(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Check image before submit....");
      }
    };

    checkImageUploadStatus(
      responseData?.husbandSchoolLeavingCertificateStatus,
      image1
    );
    checkImageUploadStatus(
      responseData?.wifeSchoolLeavingCertificateStatus,
      image2
    );
    checkImageUploadStatus(responseData?.witnessOnePhotoProofStatus, image3);
    checkImageUploadStatus(responseData?.witnessTwoPhotoProofStatus, image4);
    checkImageUploadStatus(responseData?.agreementStampStatus, image5);
    checkImageUploadStatus(responseData?.husbandPhotoIdProofStatus, image6);
    checkImageUploadStatus(responseData?.wifePhotoIdProofStatus, image7);
    checkImageUploadStatus(responseData?.priestPhotoIdProofStatus, image8);
    checkImageUploadStatus(responseData?.marriageEvidenceStatus, image9);
  };

  const state = useLocation();
  const isSecondTime = state?.state?.fillForm;

  const submitData = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "marriageDetails[marriageDate]",
      convertDateFormat(responseData?.marriageDetails?.marriageDate)
    );
    formData.append(
      "marriageDetails[location]",
      responseData?.marriageDetails?.location
    );
    formData.append(
      "marriageDetails[marriageAddress]",
      responseData?.marriageDetails?.marriageAddress
    );

    formData.append("husbandDetails[name]", responseData?.husbandDetails?.name);
    formData.append(
      "husbandDetails[surname]",
      responseData?.husbandDetails?.surname
    );
    formData.append(
      "husbandDetails[dateOfBirth]",

      convertDateFormat(responseData?.husbandDetails?.dateOfBirth)
    );
    formData.append("husbandDetails[age]", responseData?.husbandDetails?.age);
    formData.append(
      "husbandDetails[statusOfBridegroom]",
      responseData?.husbandDetails?.statusOfBridegroom
    );
    formData.append(
      "husbandDetails[religious]",
      responseData?.husbandDetails.religious
    );
    formData.append(
      "husbandDetails[location]",
      responseData?.husbandDetails.location
    );
    formData.append(
      "husbandDetails[address]",
      responseData?.husbandDetails.address
    );
    formData.append(
      "husbandDetails[mobileNumber]",
      responseData?.husbandDetails.mobile
        ? responseData?.husbandDetails.mobile
        : responseData?.husbandDetails?.mobileNumber
    );
    formData.append(
      "husbandDetails[emailId]",
      responseData?.husbandDetails?.email
        ? responseData?.husbandDetails?.email
        : responseData?.husbandDetails?.emailId
    );
    formData.append(
      "husbandDetails[guardianDetails][name]",
      responseData?.husbandDetails?.guardianDetails?.name
    );
    formData.append(
      "husbandDetails[guardianDetails][surname]",
      responseData?.husbandDetails?.guardianDetails?.surname
    );
    formData.append(
      "husbandDetails[guardianDetails][age]",
      responseData?.husbandDetails?.guardianDetails?.age
    );
    formData.append(
      "husbandDetails[guardianDetails][location]",
      responseData?.husbandDetails?.guardianDetails?.location
    );
    formData.append(
      "husbandDetails[guardianDetails][address]",
      responseData?.husbandDetails?.guardianDetails?.address
    );
    formData.append(
      "husbandDetails[guardianDetails][contactNumber]",
      responseData?.husbandDetails?.guardianDetails?.contactNumber
    );

    formData.append("wifeDetails[name]", responseData?.wifeDetails?.name);
    formData.append("wifeDetails[surname]", responseData?.wifeDetails?.surname);
    formData.append(
      "wifeDetails[dateOfBirth]",
      convertDateFormat(responseData?.wifeDetails?.dateOfBirth)
    );
    formData.append("wifeDetails[age]", responseData?.wifeDetails?.age);
    formData.append(
      "wifeDetails[statusOfBridegroom]",
      responseData?.wifeDetails?.statusOfBridegroom
    );
    formData.append(
      "wifeDetails[religious]",
      responseData?.wifeDetails?.religious
    );
    formData.append(
      "wifeDetails[location]",
      responseData?.wifeDetails?.location
    );
    formData.append("wifeDetails[address]", responseData?.wifeDetails?.address);
    formData.append(
      "wifeDetails[mobileNumber]",
      responseData?.wifeDetails?.wifemobile
        ? responseData?.wifeDetails?.wifemobile
        : responseData?.wifeDetails?.mobileNumber
    );
    formData.append(
      "wifeDetails[emailId]",
      responseData?.wifeDetails?.wifeemail
        ? responseData?.wifeDetails?.wifeemail
        : responseData?.wifeDetails?.emailId
    );
    formData.append(
      "wifeDetails[guardianDetails][name]",
      responseData?.wifeDetails.guardianDetails.name
    );
    formData.append(
      "wifeDetails[guardianDetails][surname]",
      responseData?.wifeDetails.guardianDetails.surname
    );
    formData.append(
      "wifeDetails[guardianDetails][age]",
      responseData?.wifeDetails.guardianDetails.age
    );
    formData.append(
      "wifeDetails[guardianDetails][location]",
      responseData?.wifeDetails.guardianDetails.location
    );
    formData.append(
      "wifeDetails[guardianDetails][address]",
      responseData?.wifeDetails.guardianDetails.address
    );
    formData.append(
      "wifeDetails[guardianDetails][contactNumber]",
      responseData?.wifeDetails.guardianDetails.contactNumber
    );

    formData.append("priestDetails[name]", responseData?.priestDetails?.name);
    formData.append(
      "priestDetails[dateOfBirth]",
      formatDateFirstMonth(
        convertDateFormat(responseData?.priestDetails?.dateOfBirth)
      )
    );
    formData.append("priestDetails[age]", responseData?.priestDetails?.age);
    formData.append(
      "priestDetails[location]",
      responseData?.priestDetails?.location
    );
    formData.append(
      "priestDetails[address]",
      responseData?.priestDetails?.address
    );

    formData.append(
      "witnessOneDetails[name]",
      responseData?.witnessOneDetails?.name
    );
    formData.append(
      "witnessOneDetails[dateOfBirth]",
      formatDateFirstMonth(
        convertDateFormat(responseData?.witnessOneDetails?.dateOfBirth)
      )
    );
    formData.append(
      "witnessOneDetails[age]",
      responseData?.witnessOneDetails?.age
    );
    formData.append(
      "witnessOneDetails[address]",
      responseData?.witnessOneDetails?.address
    );

    formData.append(
      "witnessTwoDetails[name]",
      responseData?.witnessTwoDetails?.name
    );
    formData.append(
      "witnessTwoDetails[dateOfBirth]",
      formatDateFirstMonth(
        convertDateFormat(responseData?.witnessTwoDetails?.dateOfBirth)
      )
    );
    formData.append(
      "witnessTwoDetails[age]",
      responseData?.witnessTwoDetails?.age
    );
    formData.append(
      "witnessTwoDetails[address]",
      responseData?.witnessTwoDetails?.address
    );

    formData.append(
      "husbandSchoolLeavingCertificateStatus",
      responseData?.husbandSchoolLeavingCertificateStatus
    );

    formData.append(
      "wifeSchoolLeavingCertificateStatus",
      responseData?.wifeSchoolLeavingCertificateStatus
    );

    formData.append(
      "witnessOnePhotoProofStatus",
      responseData?.witnessOnePhotoProofStatus
    );
    formData.append(
      "witnessTwoPhotoProofStatus",
      responseData?.witnessTwoPhotoProofStatus
    );
    formData.append("agreementStampStatus", responseData?.agreementStampStatus);
    formData.append(
      "husbandPhotoIdProofStatus",
      responseData?.husbandPhotoIdProofStatus
    );
    formData.append(
      "wifePhotoIdProofStatus",
      responseData?.wifePhotoIdProofStatus
    );
    formData.append(
      "priestPhotoIdProofStatus",
      responseData?.priestPhotoIdProofStatus
    );
    formData.append(
      "marriageEvidenceStatus",
      responseData?.marriageEvidenceStatus
    );
    if (image1) {
      formData.append("HusbandSchoolLeavingCertificate", image1);
    }
    if (image2) {
      formData.append("WifeSchoolLeavingCertificate", image2);
    }
    if (image3) {
      formData.append("WitnessOnePhotoProof", image3);
    }
    if (image4) {
      formData.append("WitnessTwoPhotoProof", image4);
    }
    if (image5) {
      formData.append("AgreementStamp", image5);
    }
    if (image6) {
      formData.append("HusbandPhotoIdProof", image6);
    }
    if (image7) {
      formData.append("WifePhotoIdProof", image7);
    }
    if (image8) {
      formData.append("PriestPhotoIdProof", image8);
    }
    if (image9) {
      formData.append("MarriageEvidence", image9);
    }

    try {
      const response = await updateUser(formData);
      if (response.statusCode === 200) {
        await setLoading(false);
        await setSnackbarSeverity("success");
        await setSnackbarMessage(response?.message);
        navigate("/login");
      } else {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(response?.message);
        setLoading(false);
      }
    } catch (error) {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

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
                bgcolor: "#AF5",
                color: "white",
                cursor: "pointer",
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
                bgcolor: "#AF5",
                color: "white",
                cursor: "pointer",
              },
            }}
            onClick={() => changeLanguage("gu")}
          >
            Guj
          </Box>
        </Box>
      </div>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.marriageDetails?.location}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Marriage Date")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="marriageDate"
                    value={formatDates(
                      responseData?.marriageDetails?.marriageDate
                    )}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Marriage Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="marriageAddress"
                    value={responseData?.marriageDetails?.marriageAddress}
                    disabled
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.husbandDetails?.surname}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandname"
                    value={responseData?.husbandDetails?.name}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Birth Date")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandbirthdate"
                    value={formatDates(
                      responseData?.husbandDetails?.dateOfBirth
                    )}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandage"
                    value={responseData?.husbandDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>
                    {t("Status of Bridegroom at the time")}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandstatus"
                    value={responseData?.husbandDetails?.statusOfBridegroom}
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Religious")}</InputLabel>
                  <TextField
                    sx={{ width: "100%" }}
                    name="husbandreligions"
                    value={responseData?.husbandDetails?.religious}
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandlocation"
                    value={responseData?.husbandDetails?.location}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="husbandaddress"
                    value={responseData?.husbandDetails?.address}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="mobile"
                    value={responseData?.husbandDetails?.mobileNumber}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="email"
                    value={responseData?.husbandDetails?.emailId || ""}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <h3>{t("Guardian/Mother/Father")}</h3>
                  <InputLabel style={{ marginTop: "26px" }}>
                    {t("Surname")}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianSurname"
                    value={
                      responseData?.husbandDetails?.guardianDetails?.surname
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sx={{ width: "100%", mt: "60px" }}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianName"
                    value={responseData?.husbandDetails?.guardianDetails?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianAge"
                    value={responseData?.husbandDetails?.guardianDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianLocation"
                    value={
                      responseData?.husbandDetails?.guardianDetails?.location ||
                      ""
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianAddress"
                    value={
                      responseData?.husbandDetails?.guardianDetails?.address ||
                      ""
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Contact(Landline)")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianContact"
                    value={
                      responseData?.husbandDetails?.guardianDetails
                        ?.contactNumber
                    }
                    disabled
                  />
                </Grid>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.wifeDetails?.surname}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifename"
                    value={responseData?.wifeDetails?.name}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Birth Date")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifebirthdate"
                    value={
                      formatDates(responseData?.wifeDetails?.dateOfBirth) || ""
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeage"
                    value={responseData?.wifeDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>
                    {t("Status of Bridegroom at the time")}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifestatus"
                    value={responseData?.wifeDetails?.statusOfBridegroom}
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Religious")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifereligions"
                    value={responseData?.wifeDetails?.religious}
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifelocation"
                    value={responseData?.wifeDetails?.location}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeaddress"
                    value={responseData?.wifeDetails?.address}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>{t("Mobile")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifemobile"
                    value={responseData?.wifeDetails?.mobileNumber || ""}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Email")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="wifeemail"
                    value={responseData?.wifeDetails?.emailId}
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <h3>{t("Guardian/Mother/Father")}</h3>
                  <InputLabel>{t("Surname")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeSurname"
                    value={responseData?.wifeDetails?.guardianDetails?.surname}
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sx={{ width: "100%", mt: "60px" }}>
                  <InputLabel>{t("Name")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeName"
                    value={responseData?.wifeDetails?.guardianDetails?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeAge"
                    value={responseData?.wifeDetails?.guardianDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeLocation"
                    value={responseData?.wifeDetails?.guardianDetails?.location}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeAddress"
                    value={responseData?.wifeDetails?.guardianDetails?.address}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Contact(Landline)")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="gardianwifeContact"
                    value={
                      responseData?.wifeDetails?.guardianDetails?.contactNumber
                    }
                    disabled
                  />
                </Grid>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.priestDetails?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestbirthdate"
                    value={formatDates(
                      responseData?.priestDetails?.dateOfBirth
                    )}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestage"
                    value={responseData?.priestDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Priest Location")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="priestlocation"
                    value={responseData?.priestDetails?.location}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="prietsaddress"
                    value={responseData?.priestDetails?.address}
                    disabled
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.witnessOneDetails?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1birthdate"
                    value={formatDates(
                      responseData?.witnessOneDetails?.dateOfBirth
                    )}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1age"
                    value={responseData?.witnessOneDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness1address"
                    value={responseData?.witnessOneDetails?.address}
                    disabled
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                    value={responseData?.witnessTwoDetails?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Date of Birth")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2birthdate"
                    value={formatDates(
                      responseData?.witnessTwoDetails?.dateOfBirth
                    )}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Age")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2age"
                    value={responseData?.witnessTwoDetails?.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>{t("Address")}</InputLabel>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="witness2address"
                    value={responseData?.witnessTwoDetails.address}
                    disabled
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: "20px", width: "7%" }}
                  disabled
                >
                  {t("Save")}
                </Button>
              </Grid>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ boxShadow: 3 }}>
        <Accordion defaultExpanded={true}>
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
                {/* {document.map((data, index) => (
                  <div className="col-md-4" key={index}>
                    <Preview {...data} onChange={handleChange} />
                    <span style={{ color: "red" }}>{data.error}</span>
                  </div>
                ))} */}
                <div className="col-md-4">
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.husbandSchoolLeavingCertificateStatus ===
                        false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image1 ? (
                      <img
                        src={URL.createObjectURL(image1)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Husband School Leaving Certificate/ Birth Proof</h6>
                    <input
                      type="file"
                      ref={inputRef1}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image1")}
                      disabled={
                        responseData?.husbandSchoolLeavingCertificateStatus ===
                        false
                          ? true
                          : false
                      }
                    />
                  </div>

                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.wifeSchoolLeavingCertificateStatus ===
                        false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image2 ? (
                      <img
                        src={URL.createObjectURL(image2)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Wife School Leaving Certificate/ Birth Proof</h6>
                    <input
                      type="file"
                      ref={inputRef2}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image2")}
                      disabled={
                        responseData?.wifeSchoolLeavingCertificateStatus ===
                        false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.witnessOnePhotoProofStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image3 ? (
                      <img
                        src={URL.createObjectURL(image3)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Witness-1 photo ID Proof</h6>
                    <input
                      type="file"
                      ref={inputRef3}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image3")}
                      disabled={
                        responseData?.witnessOnePhotoProofStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.witnessTwoPhotoProofStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image4 ? (
                      <img
                        src={URL.createObjectURL(image4)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Witness-2 photo ID Proof</h6>
                    <input
                      type="file"
                      ref={inputRef4}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image4")}
                      disabled={
                        responseData?.witnessTwoPhotoProofStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.agreementStampStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image5 ? (
                      <img
                        src={URL.createObjectURL(image5)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>200+200 Agreement Stamp</h6>
                    <input
                      type="file"
                      ref={inputRef5}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image5")}
                      disabled={
                        responseData?.agreementStampStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.husbandPhotoIdProofStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image6 ? (
                      <img
                        src={URL.createObjectURL(image6)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Husband photo ID Proof</h6>
                    <input
                      type="file"
                      ref={inputRef6}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image6")}
                      disabled={
                        responseData?.husbandPhotoIdProofStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.wifePhotoIdProofStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image7 ? (
                      <img
                        src={URL.createObjectURL(image7)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Wife photo ID Proof</h6>
                    <input
                      type="file"
                      ref={inputRef7}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image7")}
                      disabled={
                        responseData?.wifePhotoIdProofStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.priestPhotoIdProofStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image8 ? (
                      <img
                        src={URL.createObjectURL(image8)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Priest photo ID Proof</h6>
                    <input
                      type="file"
                      ref={inputRef8}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image8")}
                      disabled={
                        responseData?.priestPhotoIdProofStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      cursor:
                        responseData?.marriageEvidenceStatus === false
                          ? "no-drop"
                          : " pointer",
                    }}
                  >
                    {image9 ? (
                      <img
                        src={URL.createObjectURL(image9)}
                        alt=""
                        className="after-Image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={uploadImage}
                        alt=""
                        className="before-image"
                        style={{ width: "30%" }}
                      />
                    )}
                    <h6>Marriage Evidence</h6>
                    <input
                      type="file"
                      ref={inputRef9}
                      style={{ display: "none" }}
                      onChange={(e) => handleChangeImage(e, "image9")}
                      disabled={
                        responseData?.marriageEvidenceStatus === false
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </center>
          <Box textAlign="center">
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              sx={{ width: "10%", height: "50px", mt: "20px", mb: "20px" }}
            >
              {t("Submit")}
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
          type="submit"
        >
          {t("Apply for marriage Registration")}
        </Button>
      </Box>
      <Footer />
      <Loader open={loading} />
    </form>
  );
};
export default UpdateRegistrationForm;
