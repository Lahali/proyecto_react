import { useState } from "react";
import UploadWidget from "./UploadWidget";

export default function CloudinaryWidget(props) {
  // const [url, updateUrl] = useState();
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
    //updateUrl("imagen cargada con exito");
  }

  return (
    <main className="main">
      {/* este classname que es? */}
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

        {error && <p>{error}</p>}

        {/* aqui para cambiar que pasa despues upload con exito */}
        {props.url && <p className="text-base text-gray-400 mt-2">imagen cargada con exito!</p>}
      </div>
    </main>
  );
}

