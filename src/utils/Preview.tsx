import React, { useRef } from "react";
import uploadpic from "./upload.png";
import "./Preview.scss";
import { Interface } from "readline";

interface props {
  id: number;
  title: string;
  image: any;

  onChange: (image: any, index: number) => void;
}

const Preview = ({ id, title, image, onChange }: props) => {
  const inputref: any = useRef(null);

  const handleClick = () => {
    if (inputref.current) inputref.current?.click();
  };

  const handleChange = (e: any) => {
    onChange(e.target.files[0], id);
  };

  return (
    <div>
      <div onClick={handleClick}>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="after-Image"
          />
        ) : (
          <img src={uploadpic} alt="" className="before-image" />
        )}
        <h6>{title}</h6>
        <input
          type="file"
          ref={inputref}
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Preview;
