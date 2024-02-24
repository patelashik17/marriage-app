import { FileInputButton, FileCard, ExtFile } from "@files-ui/react";
import * as React from "react";

export default function File() {
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id: number | string | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleFinishUpload = (uploadedFiles: ExtFile[]) => {};
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "10px",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <FileInputButton
        onChange={updateFiles}
        value={files}
        accept={"image/*"}
        maxFileSize={28 * 1024 * 1024}
        maxFiles={1}
        actionButtons={{
          uploadButton: {},
          abortButton: {},
        }}
      />
      {files.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "5px",
            minWidth: "50%",
          }}
        >
          {files.map((file: ExtFile) => (
            <FileCard
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
            />
          ))}
        </div>
      )}
    </div>
  );
}
