import { Typography, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { login } from "../Formik/InitalValue";
import { loginSchema } from "../Formik/validationSchema";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoginDatas } from "../reducer/dashboardReducer";
import Loader from "../../Loader/Loader";
import CustomSnackbar from "../../utils/CustomSnackbar";
import { loginPayload } from "../Interface/Interface";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const loginApi = async (payload: loginPayload, dispatch: any) => {
    setLoading(true);
    const url = "https://marriage-portal-api.onrender.com/login";
    let response: any;
    try {
      response = await axios.post(url, payload);

      if (response && response.status === 200) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter valid Email and password");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const {
    values: valuesForm1,
    touched: touchedForm1,
    errors: errorsForm1,
    handleBlur: handleBlurForm1,
    handleChange: handleChangeForm1,
    handleSubmit: handleSubmitForm1,
  } = useFormik({
    initialValues: login,
    validationSchema: loginSchema,
    onSubmit: (valuesForm1) => {
      const obj = {
        email: valuesForm1?.email,
        password: valuesForm1?.password,
      };

      loginApi(obj, dispatch)
        .then((response) => {
          dispatch(setLoginDatas(response?.data));
          sessionStorage.setItem("LoginData", JSON.stringify(response?.data));
          sessionStorage.setItem("email", valuesForm1?.email);
          sessionStorage.setItem("LoginToken", response.data.loginToken);
          const destination =
            response && response.data.role === "User"
              ? "/UserDashboard"
              : "/dashboard";
          navigate(destination);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form>
          <Box
            display="flex"
            flexDirection={"column"}
            width={"29rem"}
            alignContent="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography variant="h2" padding={3} textAlign="center">
              Login
            </Typography>
            <TextField
              margin={"normal"}
              type={"email"}
              variant="outlined"
              placeholder="Email"
              name="email"
              value={valuesForm1.email}
              onChange={handleChangeForm1}
              onBlur={handleBlurForm1}
            />
            {errorsForm1.email && touchedForm1.email ? (
              <span style={{ color: "red" }}>{errorsForm1.email}</span>
            ) : null}
            <TextField
              margin={"normal"}
              type={"password"}
              variant="outlined"
              placeholder="Password"
              name="password"
              value={valuesForm1.password}
              onChange={handleChangeForm1}
              onBlur={handleBlurForm1}
            />
            {errorsForm1.password && touchedForm1.password ? (
              <span style={{ color: "red" }}>{errorsForm1.password}</span>
            ) : null}
            <Button
              onClick={() => handleSubmitForm1()}
              sx={{ marginTop: 3, width: 84, alignSelf: "center" }}
              variant="contained"
              color="info"
            >
              Login
            </Button>
          </Box>
        </form>
      </div>
      <Loader open={loading} />
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};
export default Login;
