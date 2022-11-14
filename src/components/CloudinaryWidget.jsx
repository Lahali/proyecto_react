import { useState } from 'react';
import UploadWidget from "./UploadWidget";

export default function CloudinaryWidget(props) {

    // const [url, updateUrl] = useState();
    const [error, updateError] = useState();
  
    /**
     * handleOnUpload
     */
  
    function handleOnUpload(error, result, widget) {
      if ( error ) {
        updateError(error);
        widget.close({ 
          quiet: true
        });
        return;
      }
      props.updateUrl(result?.info?.secure_url);
      //updateUrl("imagen cargada con exito");
      
      console.log('result: ',result); // esto te da todos los detalles
      //console.log('result.info.url: ',result.info.url); // url de la imagen

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
                <button onClick={handleOnClick}>
                  UPLOAD AN IMAGE
                </button>
              )
            }}
          </UploadWidget>
  
          {error && <p>{ error }</p>}
  
          {props.url && (
            <>
            {/* aqui para cambiar que pasa despues upload con exito */}

              <p><img src={ props.url } alt="Uploaded image" /></p>
              <p>{ props.url }</p>
            </>
          )}
        </div>
      </main>
    );
  }  