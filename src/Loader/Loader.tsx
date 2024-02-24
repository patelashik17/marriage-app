import Backdrop from "@mui/material/Backdrop";
import "./Loader.scss";

interface loader {
  open: boolean;
}

export default function Loader(props: loader) {
  const { open } = props;

  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <span className="loader"></span>
      </Backdrop>
    </div>
  );
}
