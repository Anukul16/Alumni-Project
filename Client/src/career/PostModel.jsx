import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const [file, setFile] = useState(null); // Store the selected file
  const [fileType, setFileType] = useState(""); // Store the file type for conditional rendering

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
      setFileType(selectedFile.type); // Set the MIME type of the file
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed p-4 mt-4 text-center hover:cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}

      {/* Conditional rendering based on file type */}
      {file && (
        <>
          {fileType.startsWith("image/") && (
            <img src={file} alt="Uploaded preview" className="mt-4" />
          )}
          {fileType === "application/pdf" && (
            <iframe
              src={file}
              title="PDF preview"
              className="mt-4 w-full h-64"
              style={{ border: "1px solid #ddd" }}
            />
          )}
          {fileType.startsWith("video/") && (
            <video controls src={file} className="mt-4 w-full" />
          )}
          {fileType === "image/gif" && (
            <img src={file} alt="GIF preview" className="mt-4" />
          )}
        </>
      )}
    </div>
  );
}

const PostModel = ({ showModal, closeModal }) => {
  const [image, setImage] = useState(null);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full h-[380px]  mt-48 md:w-[620px]">
            <div className="relative bg-white w-full h-[380px] overflow-auto mx-auto border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:w-[620px]">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h1 className="text-xl font-semibold mb-4">Create a Post</h1>
              <textarea
                rows="4"
                placeholder="Write your post here..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <MyDropzone />
            </div>

            {/* Fixed Post Button outside the scrollable area */}
            <button className="absolute bottom-4 right-4 z-50 w-20 h-10 border rounded-2xl bg-blue-500 text-white hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModel;
