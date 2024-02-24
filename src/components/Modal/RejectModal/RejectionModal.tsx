import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Reject } from "../../Api/Apis";
import { checkUserDocument } from "../../Interface/Interface";
import "./styles.scss";

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

interface RejectModalProps {
  open: boolean;
  handleClose: () => void;
  currentIndex: string;
  onRejectSuccess: () => void;
}

const RejectModal: React.FC<RejectModalProps> = (props: RejectModalProps) => {
  const { open, handleClose, currentIndex } = props;
  const [commentdata, setCommentData] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const [checkboxState, setCheckboxState] = useState<checkUserDocument>({
    husbandSchoolLeavingCertificateStatus: false,
    wifeSchoolLeavingCertificateStatus: false,
    witnessOnePhotoProofStatus: false,
    witnessTwoPhotoProofStatus: false,
    agreementStampStatus: false,
    husbandPhotoIdProofStatus: false,
    wifePhotoIdProofStatus: false,
    priestPhotoIdProofStatus: false,
    marriageEvidenceStatus: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setCheckboxState((prev: any) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (commentdata && checkboxState) {
      setDisable(false);
    }
  }, [commentdata, checkboxState]);

  const resetState = () => {
    setCommentData("");
    setCheckboxState({
      husbandSchoolLeavingCertificateStatus: false,
      wifeSchoolLeavingCertificateStatus: false,
      witnessOnePhotoProofStatus: false,
      witnessTwoPhotoProofStatus: false,
      agreementStampStatus: false,
      husbandPhotoIdProofStatus: false,
      wifePhotoIdProofStatus: false,
      priestPhotoIdProofStatus: false,
      marriageEvidenceStatus: false,
    });
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

  const handleChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
  };

  const handleRejectModal1 = () => {
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
      userId: currentIndex,
      rejectedMessage: commentdata,
      husbandSchoolLeavingCertificateStatus:
        checkboxState.husbandSchoolLeavingCertificateStatus,
      wifeSchoolLeavingCertificateStatus:
        checkboxState.wifeSchoolLeavingCertificateStatus,
      witnessOnePhotoProofStatus: checkboxState.witnessOnePhotoProofStatus,
      witnessTwoPhotoProofStatus: checkboxState.witnessTwoPhotoProofStatus,
      agreementStampStatus: checkboxState.agreementStampStatus,
      husbandPhotoIdProofStatus: checkboxState.husbandPhotoIdProofStatus,
      wifePhotoIdProofStatus: checkboxState.wifePhotoIdProofStatus,
      priestPhotoIdProofStatus: checkboxState.priestPhotoIdProofStatus,
      marriageEvidenceStatus: checkboxState.marriageEvidenceStatus,
    };
    Reject(obj).then(() => {
      handleClose();
      props.onRejectSuccess();
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="reject-modal"
    >
      <Box sx={customModalStyle}>
        <div className="reject-modal-inner">
          <div className="modal-title">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Reject Application
            </Typography>
            <hr />
          </div>
          <div className="reject-modal-body">
            <div className="text-area-heading">
              Rejection Message:
              <TextareaAutosize
                className="text-area"
                minRows={5}
                value={commentdata}
                onChange={handleChnage}
              />
            </div>
          </div>
        </div>
        <FormGroup className="check-box-group" sx={{ marginLeft: "9px" }}>
          {Object.entries(checkboxState).map(([name, checked]) => (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={checked as boolean}
                  onChange={handleCheckboxChange}
                  name={name}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    fontSize: "17px",
                  }}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>

        <div className="modal-button">
          <Button
            variant="contained"
            color="primary"
            className="reject-button"
            onClick={handleRejectModal1}
            disabled={disable}
          >
            Reject
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RejectModal;
