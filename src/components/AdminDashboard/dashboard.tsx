import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserCount } from "../Api/Apis";
import { userData } from "../Interface/Interface";
import Header from "../Shared/Header/Header";
import Loader from "../../Loader/Loader";
import "./style.scss";
import Table from "./Table";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<number>(0);
  const [totalUserApprove, setTotalUserApprove] = useState<number>(0);
  const [totalUserReject, setTotalUserReject] = useState<number>(0);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setLoadingPage(true);
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
    };

    UserCount(obj)
      .then((response: userData) => {
        setUserData(response?.data?.totalUsers);
        setTotalUserApprove(response?.data?.totalUsersApprove);
        setTotalUserReject(response?.data?.totalUsersReject);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoadingPage(false);
  }, []);

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
            {t("Dashboard")}
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

      <Grid
        container
        sx={{ justifyContent: "space-around", marginTop: "20px" }}
      >
        <Grid item xs={3} sx={{ border: "1px solid green", height: "100px" }}>
          <Typography
            sx={{ marginTop: "20px" }}
            align="center"
            variant="h5"
            component="h6"
            color={"rgb(70, 70, 201)"}
          >
            {userData}
          </Typography>
          <Typography align="center">
            {t("Number of Application Accept")}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ border: "1px solid green", height: "100px" }}>
          <Typography
            sx={{ marginTop: "20px" }}
            align="center"
            variant="h5"
            component="h6"
            color={"rgb(70, 70, 201)"}
          >
            {totalUserApprove}
          </Typography>
          <Typography align="center">
            {t("Number of Application Reject")}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ border: "1px solid green", height: "100px" }}>
          <Typography
            sx={{ marginTop: "20px" }}
            align="center"
            variant="h5"
            component="h6"
            color={"rgb(70, 70, 201)"}
          >
            {totalUserReject}
          </Typography>
          <Typography align="center">
            {t("Number of Application Receive")}
          </Typography>
        </Grid>
      </Grid>

      <Table />
      <Loader open={loadingPage} />
    </>
  );
};

export default Dashboard;
