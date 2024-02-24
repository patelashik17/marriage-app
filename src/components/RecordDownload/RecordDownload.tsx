import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { shortByDate } from "../Api/Apis";
import { jsPDF } from "jspdf";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "jspdf-autotable";
import Header from "../Shared/Header/Header";
import Loader from "../../Loader/Loader";

const RecordDownload: React.FC = () => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<any>([]);
  const [disbled, setDisbled] = useState(true);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = formattedMonth + "-" + formattedDay + "-" + year;

    return formattedDate;
  };

  useEffect(() => {
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
      fromDate: fromDate,
      toDate: toDate,
    };

    shortByDate(obj)
      .then((response) => {
        setApiResponse(response.data);
        setLoadingPage(false);
      })
      .catch((error: any) => {
        setLoadingPage(false);
        console.error(error);
      });
  }, [fromDate, toDate]);

  useEffect(() => {
    if (fromDate && toDate) {
      setDisbled(false);
    }
  }, [fromDate, toDate]);

  const downloadUserData = async () => {
    try {
      const Logintoken = sessionStorage.getItem("LoginToken");
      const obj = {
        loginToken: Logintoken,
        fromDate: fromDate,
        toDate: toDate,
      };

      const response = await shortByDate(obj);
      await setApiResponse(response.data);
      const doc = new jsPDF();

      (await apiResponse) &&
        apiResponse.forEach((item: any, index: number) => {
          doc.text(`Husband Details:`, 10, 10 + index * 10);
          doc.text(`Name: ${item.husbandDetails.name}`, 10, 20 + index * 10);
          doc.text(
            `Surname: ${item.husbandDetails.surname}`,
            10,
            30 + index * 10
          );
          doc.text(
            `Date of Birth: ${item.husbandDetails.dateOfBirth}`,
            10,
            40 + index * 10
          );

          doc.text(`Wife Details:`, 10, 60 + index * 10);
          doc.text(`Name: ${item.wifeDetails.name}`, 10, 70 + index * 10);
          doc.text(`Surname: ${item.wifeDetails.surname}`, 10, 80 + index * 10);
          doc.text(
            `Date of Birth: ${item.wifeDetails.dateOfBirth}`,
            10,
            90 + index * 10
          );

          doc.text(`Priest Details:`, 10, 110 + index * 10);
          doc.text(`Name: ${item.priestDetails.name}`, 10, 120 + index * 10);
          doc.text(
            `Date of Birth: ${item.priestDetails.dateOfBirth}`,
            10,
            130 + index * 10
          );

          doc.text(`Witness One Details:`, 10, 150 + index * 10);
          doc.text(
            `name: ${item.witnessOneDetails.name}`,
            10,
            160 + index * 10
          );
          doc.text(
            `Date of Birth: ${item.witnessOneDetails.dateOfBirth}`,
            10,
            170 + index * 10
          );

          doc.text(`Witness Two Details:`, 10, 190 + index * 10);
          doc.text(
            `name: ${item.witnessTwoDetails.name}`,
            10,
            200 + index * 10
          );
          doc.text(
            `Date of Birth: ${item.witnessTwoDetails.dateOfBirth}`,
            10,
            210 + index * 10
          );

          doc.text(`Other Details:`, 10, 230 + index * 10);
          doc.text(
            `Application Status: ${item.applicationStatus}`,
            10,
            240 + index * 10
          );
          doc.text(
            `Approve Appointment Date: ${item.approveAppointmentDate}`,
            10,
            250 + index * 10
          );
          doc.text(`UserID: ${item._id}`, 10, 260 + index * 10);

          if (index < apiResponse.length - 1) {
            doc.addPage();
          }
        });

      await doc.save("user_record.pdf");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFromDateChange = (newDate: string | null) => {
    setFromDate(formatDate(newDate));
  };

  const handleToDateChange = (newDate: string | null) => {
    setToDate(formatDate(newDate));
  };

  const { t, i18n } = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <Header />
      <div className="dashboard_modal">
        <Box
          sx={{
            display: "flex",
            p: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            margin: "30px",
          }}
        >
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h5"
            component="h2"
            color={"rgb(70, 70, 201)"}
          >
            {t("Application Record Download")}
          </Typography>

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

      <div
        className="heading-date"
        style={{ fontSize: "29px", fontWeight: "500", marginLeft: "5rem" }}
      >
        {t("Date")} :
      </div>

      <div
        className="search-box"
        style={{ justifyContent: "flex-start", marginLeft: "7rem" }}
      >
        <div style={{ fontSize: "20px", fontWeight: "500" }}>{t("From")}:</div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select a date"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div
        className="search-box"
        style={{ justifyContent: "flex-start", marginLeft: "7rem" }}
      >
        <div
          style={{ fontSize: "20px", fontWeight: "500", marginRight: "1.8rem" }}
        >
          {t("To")}:
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select a date"
              value={toDate}
              onChange={handleToDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Button
        variant="contained"
        size="medium"
        sx={{ marginLeft: "11.7rem", marginTop: "2rem" }}
        onClick={downloadUserData}
        disabled={disbled}
      >
        {t("Download")}
      </Button>
      <Loader open={loadingPage} />
    </>
  );
};

export default RecordDownload;
