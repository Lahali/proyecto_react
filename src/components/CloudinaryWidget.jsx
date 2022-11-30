import { useState } from "react";
import UploadWidget from "./UploadWidget";

export default function CloudinaryWidget(props) {
  const [error, updateError] = useState();

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    props.updateUrl(result?.info?.secure_url);
  }

  return (
    <main className="main">
      <div className="container">
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className="mt-5 btn btn-outline btn-secondary w-80"
                onClick={handleOnClick}
              >
                SUBE UNA IMAGEN
              </button>
            );
          }}
        </UploadWidget>
       {props.url && <p className="text-base text-gray-400 mt-2">imagen cargada con exito!</p>}
      </div>
    </main>
  );
}

