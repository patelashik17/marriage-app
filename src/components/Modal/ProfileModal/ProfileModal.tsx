import "./style.scss";
import { useEffect, useState } from "react";
import { formatDate, formatDates } from "../../../config";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { userResponse } from "../../Interface/Interface";

interface RootState {
  application: any;
}

interface propsType {
  open: boolean;
  handleClose: () => void;
  storeId: string | undefined;
}

export default function ProfileModal(props: propsType) {
  const userData = useSelector(
    (state: RootState) => state?.application?.useData
  );
  const { open, handleClose, storeId } = props;
  const [filterData, setFilterData] = useState<any>();

  useEffect(() => {
    const filteredData = userData?.filter(
      (item: userResponse) => item?._id === storeId
    );
    setFilterData(filteredData);
  }, [open, storeId, handleClose]);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const modalStyle = {
    display: open ? "block" : "none",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "auto",
  };

  const closeModalStyle = {
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
  };

  return (
    <div
      className={`modal ${open ? "fade show model fade data-display" : ""}`}
      id="exampleModalLong"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              User Details
            </h5>

            <span aria-hidden="true" onClick={handleClose} className="close">
              &times;
            </span>
          </div>
          {filterData && (
            <div className="modal-body">
              <div>
                <div
                  className="model-date"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <span className="application" style={{ fontStyle: "bold" }}>
                      {" "}
                      Application Date{" "}
                    </span>
                    : {currentDate}
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    Merriage Date :{" "}
                    {filterData[0]?.approveAppointmentDate
                      ? formatDate(filterData[0]?.approveAppointmentDate)
                      : ""}
                  </div>
                </div>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        Husband Detail
                      </span>
                      <div>
                        Husband name : {filterData[0]?.husbandDetails?.name}{" "}
                      </div>
                      <div>
                        Husband Age :{filterData[0]?.husbandDetails?.age}{" "}
                      </div>
                      <div>
                        Husband religious :
                        {filterData[0]?.husbandDetails?.religious}{" "}
                      </div>
                      <div>
                        Husband location :
                        {filterData[0]?.husbandDetails?.location}{" "}
                      </div>
                      <div>
                        Husband address :
                        {filterData[0]?.husbandDetails?.address}{" "}
                      </div>
                      <div>
                        Husband mobile :
                        {filterData[0]?.husbandDetails?.mobileNumber}{" "}
                      </div>
                      <div>
                        Husband email :
                        {filterData[0]?.husbandDetails?.emailId
                          ? filterData[0]?.husbandDetails?.emailId
                          : "N/A"}{" "}
                      </div>
                    </div>
                    <br />
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        Husband Gardian Detail
                      </span>
                      <div>
                        Husband name :
                        {filterData[0]?.husbandDetails?.guardianDetails?.name}{" "}
                      </div>
                      <div>
                        Husband Age :
                        {filterData[0]?.husbandDetails?.guardianDetails?.age}{" "}
                      </div>
                      <div>
                        Husband location :
                        {
                          filterData[0]?.husbandDetails?.guardianDetails
                            ?.location
                        }{" "}
                      </div>
                    </div>
                    <br />
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        Witness-1 Detail
                      </span>
                      <div>
                        Witness-1 name :{filterData[0]?.witnessOneDetails?.name}{" "}
                      </div>
                      <div>
                        Witness-1 Age :{filterData[0]?.witnessOneDetails?.age}{" "}
                      </div>
                      <div>
                        Witness-1 Birthdate :
                        {formatDates(
                          filterData[0]?.witnessOneDetails?.dateOfBirth
                        )}{" "}
                      </div>
                      <div>
                        Witness-1 address :
                        {filterData[0]?.witnessOneDetails?.address}{" "}
                      </div>
                    </div>
                    <br />
                    <div>
                      <div style={{ fontSize: "20px", fontWeight: "500" }}>
                        Priest Detail
                      </div>
                      <div style={{ marginBottom: "3rem" }}>
                        <div>
                          Priest name : {filterData[0]?.priestDetails?.name}{" "}
                        </div>
                        <div>
                          Priest Age : {filterData[0]?.priestDetails?.age}{" "}
                        </div>
                        <div>
                          Priest Birthdate :{" "}
                          {filterData[0]?.priestDetails?.dateOfBirth
                            ? formatDate(
                                filterData[0]?.priestDetails?.dateOfBirth
                              )
                            : ""}{" "}
                        </div>
                        <div>
                          Priest address :{" "}
                          {filterData[0]?.priestDetails?.address}{" "}
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <div>
                        <span style={{ fontSize: "20px", fontWeight: "500" }}>
                          Wife Detail
                        </span>
                        <div>
                          Wife name : {filterData[0]?.wifeDetails?.name}{" "}
                        </div>
                        <div>Wife Age : {filterData[0]?.wifeDetails?.age} </div>
                        <div>
                          Wife religious :{" "}
                          {filterData[0]?.wifeDetails?.religious}{" "}
                        </div>
                        <div>
                          Wife location : {filterData[0]?.wifeDetails?.location}{" "}
                        </div>
                        <div>
                          Wife address : {filterData[0]?.wifeDetails?.address}{" "}
                        </div>
                        <div>
                          Wife mobile :
                          {filterData[0]?.wifeDetails?.mobileNumber}{" "}
                        </div>
                        <div>
                          Wife email :
                          {filterData[0]?.wifeDetails?.emailId
                            ? filterData[0]?.wifeDetails?.emailId
                            : "N/A"}{" "}
                        </div>
                      </div>
                    </div>
                    <br />
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        Wife Gardian Detail
                      </span>
                      <div>
                        Wife name :{" "}
                        {filterData[0]?.wifeDetails?.guardianDetails?.name}{" "}
                      </div>
                      <div>
                        Wife Age :
                        {filterData[0]?.wifeDetails?.guardianDetails?.age}{" "}
                      </div>
                      <div>
                        Wife location :
                        {filterData[0]?.wifeDetails?.guardianDetails?.location}{" "}
                      </div>
                    </div>
                    <br />
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        Witness-2 Detail
                      </span>
                      <div>
                        Witness-2 name :{filterData[0]?.witnessTwoDetails?.name}{" "}
                      </div>
                      <div>
                        Witness-2 Age :{filterData[0]?.witnessTwoDetails?.age}{" "}
                      </div>
                      <div>
                        Witness-2 Birthdate :
                        {formatDates(
                          filterData[0]?.witnessTwoDetails?.dateOfBirth
                        )}{" "}
                      </div>
                      <div>
                        Witness-2 address :
                        {filterData[0]?.witnessTwoDetails?.address}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
