import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DownloadData, userDetail } from "../Api/Apis";
import {
  UserAllDetail,
  downloadUserData,
  userResponse,
} from "../Interface/Interface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDatas } from "../reducer/dashboardReducer";
import { t } from "i18next";
import CustomModal from "../Modal/ApproveModal/ApproveModal";
import RejectModal from "../Modal/RejectModal/RejectionModal";
import ProfileModal from "../Modal/ProfileModal/ProfileModal";
import Loader from "../../Loader/Loader";

export default function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [currentIndex, setcurrentIndex] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [openProfileModal, setOpenProfileModel] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<string>();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<userResponse>();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target?.value);
  };

  useEffect(() => {
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,

      search: searchValue,
    };
    userDetail(obj)
      .then((response: UserAllDetail) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
    if (searchValue === "") {
      const Logintoken = sessionStorage.getItem("LoginToken");
      const obj = {
        loginToken: Logintoken,
      };
      userDetail(obj)
        .then((response: UserAllDetail) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    }
  }, [searchValue]);

  const handleSearch = () => {
    setLoadingPage(true);

    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,

      search: searchValue,
    };
    userDetail(obj)
      .then((response: UserAllDetail) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingPage(false);
      });
    if (searchValue === "") {
      setLoadingPage(true);

      const Logintoken = sessionStorage.getItem("LoginToken");
      const obj = {
        loginToken: Logintoken,
      };
      userDetail(obj)
        .then((response: UserAllDetail) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoadingPage(false);
        });
    }
  };

  const downloadUserData = (userId: string) => {
    setLoadingPage(true);
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
      userId: userId,
    };
    DownloadData(obj)
      .then((response: downloadUserData) => {
        setLoadingPage(false);
        window.open(response?.data, "_blank");
      })
      .catch((error: any) => {
        setLoadingPage(false);
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setOpenRejectModal(false);
  };

  const handleOpen = (index: string) => {
    setOpen(true);
    setcurrentIndex(index);
  };
  const handleRejectMOdal = (index: string) => {
    setOpenRejectModal(true);
    setcurrentIndex(index);
  };

  const handleOpenProfileModal = (index: string) => {
    setOpenProfileModel(true);
    setStoreId(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProfileModal = () => setOpenProfileModel(false);

  useEffect(() => {
    setLoadingPage(true);
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
    };

    userDetail(obj)
      .then((response) => {
        dispatch(setUserDatas(response.data));

        setUserDetails(response?.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const userDataApi = () => {
    setLoadingPage(true);
    const Logintoken = sessionStorage.getItem("LoginToken");
    const obj = {
      loginToken: Logintoken,
    };

    userDetail(obj)
      .then((response: UserAllDetail) => {
        setUserDetails(response?.data);
        setLoadingPage(false);
        setSearchValue("");
      })
      .catch((error) => {
        console.error(error);
        setLoadingPage(false);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  };

  const downloadRecord = () => {
    navigate("/record-download");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: `${t("UserID")}`, width: 250 },
    { field: "HusbandName", headerName: `${t("Husband Name")}`, width: 200 },
    { field: "WifeName", headerName: `${t("Wife Name")}`, width: 200 },
    { field: "MobileNo", headerName: `${t("Mobile No")}`, width: 150 },
    {
      field: "Status",
      headerName: `${t("Status")}`,
      width: 100,
    },
    {
      field: "actions",
      headerName: `${t("Actions")}`,
      width: 424,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: "10px" }}
            onClick={() => handleOpen(params.row.id)}
          >
            {t("Approve")}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginRight: "10px" }}
            onClick={() => handleRejectMOdal(params.row.id)}
          >
            {t("Reject")}
          </Button>
          <Button
            variant="contained"
            color="info"
            sx={{ marginRight: "10px" }}
            onClick={() => handleOpenProfileModal(params.row.id)}
          >
            {t("View")}
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => downloadUserData(params.row.id)}
          >
            {t("Download")}
          </Button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(userDetails)
    ? userDetails?.map((user: userResponse) => {
        return {
          id: user?._id,
          HusbandName:
            user.husbandDetails.name + " " + user.husbandDetails.surname,
          WifeName: user.wifeDetails.name + " " + user.husbandDetails.surname,
          MobileNo: user.husbandDetails.mobileNumber,
          Status: user.applicationStatus,
        };
      })
    : [];

  return (
    <>
      <div className="search-box">
        <TextField
          label={t("Search")}
          id="outlined-size-small"
          size="small"
          onChange={handleChange}
          value={searchValue}
        />
        <Button
          variant="contained"
          size="medium"
          sx={{ marginRight: "1rem" }}
          onClick={handleSearch}
        >
          {t("Search")}{" "}
        </Button>
        <Button
          variant="contained"
          color="success"
          size="medium"
          sx={{ marginRight: "1rem" }}
          onClick={downloadRecord}
        >
          {t("Download Record")}
        </Button>
      </div>
      <div style={{ height: 371, width: "100%" }}>
        {!loadingPage ? (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            style={{ border: "1px solid #ddd" }}
          />
        ) : (
          <Loader open={loadingPage} />
        )}
        <CustomModal
          open={open}
          handleClose={handleClose}
          currentIndex={currentIndex}
          onApproveSuccess={userDataApi}
        />
        <RejectModal
          open={openRejectModal}
          handleClose={handleCloseModal}
          currentIndex={currentIndex || ""}
          onRejectSuccess={userDataApi}
        />
        <ProfileModal
          open={openProfileModal}
          handleClose={handleCloseProfileModal}
          storeId={storeId}
        />
        <Loader open={loadingPage} />
      </div>
    </>
  );
}
