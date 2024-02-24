import { Typography, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { password } from "../Formik/InitalValue";
import { passwordSchema } from "../Formik/validationSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { setPassword } from "../Api/Apis";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    values: valuesForm1,
    touched: touchedForm1,
    errors: errorsForm1,
    handleBlur: handleBlurForm1,
    handleChange: handleChangeForm1,
    handleSubmit: handleSubmitForm1,
  } = useFormik({
    initialValues: password,
    validationSchema: passwordSchema,
    onSubmit: (valuesForm1) => {
      setLoading(true);
      const passwordToken = sessionStorage.getItem("passwordToken") || "";

      const obj = {
        password: valuesForm1?.password,
      };

      setPassword(passwordToken, obj)
        .then((response) => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setLoading(false);
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
            <Typography variant="h4" padding={3} textAlign="center">
              Reset password
            </Typography>
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
              Submit
            </Button>
          </Box>
        </form>
      </div>
      <Loader open={loading} />
    </>
  );
};
export default ResetPassword;
