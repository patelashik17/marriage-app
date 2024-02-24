import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Approve } from "../../Api/Apis";
import { convertDateFormat } from "../../../config";
import "./style.scss";

interface ModalState {
  certificateData: string | undefined;
  disable: boolean;
  commentdata: string | undefined;
  approveDate: any;
}

interface ApproveModalProps {
  open: boolean;
  handleClose: () => void;
  currentIndex: string | undefined;
  onApproveSuccess: () => void;
}

const customModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  width: "40rem",
};

const CustomModal: React.FC<ApproveModalProps> = (props: ApproveModalProps) => {
  const { open, handleClose, currentIndex } = props;

  const [modalState, setModalState] = useState<ModalState>({
    certificateData: undefined,
    disable: true,
    commentdata: undefined,
    approveDate: undefined,
  });

  useEffect(() => {
    if (
      modalState.certificateData &&
      modalState.commentdata &&
      modalState.approveDate
    ) {
      setModalState((prevState) => ({
        ...prevState,
        disable: false,
      }));
    }
  }, [
    modalState.certificateData,
    modalState.commentdata,
    modalState.approveDate,
  ]);

  const resetState = () => {
    setModalState({
      certificateData: undefined,
      disable: true,
      commentdata: undefined,
      approveDate: undefined,
    });
  };

  const handleApprove = () => {
    const Logintoken = sessionStorage.getItem("LoginToken");

    const obj = {
      loginToken: Logintoken,
      userId: currentIndex,
      approveAppointmentDate: convertDateFormat(modalState.approveDate),
      approveRequestCertificate: modalState.certificateData,
      approveMessage: modalState.commentdata,
    };
    Approve(obj)
      .then((response) => {
        if (response) {
          handleClose();
          resetState();
          props.onApproveSuccess();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChnage = (e: string) => {
    setModalState((prevState) => ({ ...prevState, commentdata: e }));
  };

  const handleDateChange = (e: Date | null) => {
    setModalState((prevState) => ({ ...prevState, approveDate: e }));
  };

  const handleCertificateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalState((prevState) => ({
      ...prevState,
      certificateData: e.target.value,
    }));
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="approve-modal"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={customModalStyle}>
          <div className="approve-model-inner">
            <div className="modal-title">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Approve Application
              </Typography>
              <hr />
            </div>
            <div className="modal-body">
              <div className="date-time">
                Date/Time:
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Enter Date"
                      value={modalState?.approveDate}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="document-number">
                Number of documents:
                <TextField
                  className="document-input-box"
                  variant="outlined"
                  value={modalState?.certificateData}
                  type="Number"
                  onChange={handleCertificateValue}
                />
              </div>

              <div className="comment-box">
                Comments:
                <TextareaAutosize
                  className="comment-box-text-area"
                  minRows={5}
                  value={modalState?.commentdata}
                  onChange={(e) => handleChnage(e?.target?.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-button">
            <Button
              className="approve-button"
              variant="contained"
              color="primary"
              onClick={handleApprove}
              disabled={modalState?.disable}
            >
              Approve
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
