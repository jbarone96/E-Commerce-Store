import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useFileHandler = (initialState) => {
  const [image, setImage] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const removeImage = ({ id, name }) => {
    const items = image[name].filter((item) => item.id !== id);

    setImage({
      ...image,
      [name]: items,
    });
  };

  const onFileChange = (event, { name, type }) => {
    const value = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setIsLoading(true);

    if (!regex.exec(value)) {
      alert("File type must be JPEG or PNG", "error");
      setIsLoading(false);
    } else if (size > 0.5) {
      alert(
        "File size exceeded 500 KB, consider optimizing your image.",
        "error"
      );
      setIsLoading(false);
    } else if (type === "multiple") {
      Array.from(event.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          setImage((oldFile) => ({
            ...oldFile,
            [name]: [
              ...oldFile[name],
              { file, url: event.target.result, id: uuidv4 },
            ],
          }));
        });
        reader.readAsDataURL(file);
      });

      setIsLoading(false);
    } else {
    }
  };
};

export default useFileHandler;
