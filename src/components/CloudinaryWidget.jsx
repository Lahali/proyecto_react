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

          {/* este classname que es? */}
        <div className="container">
        

          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="mt-5 btn btn-outline btn-primary w-4/5 lg:w-60" onClick={handleOnClick}>
                  SUBE UNA IMAGEN
                </button>
              )
            }}
          </UploadWidget>
  
          {error && <p>{ error }</p>}
  
          {/* aqui para cambiar que pasa despues upload con exito */}
          {props.url && <p>imagen cargada con exito!</p>}
        </div>
      </main>
    );
  }  
  
  
  
  
  
  
  
  // <p><img src={ props.url } alt="Uploaded image" /></p>
  // <p>{ props.url }</p>