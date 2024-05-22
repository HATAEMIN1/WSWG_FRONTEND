import React, { useEffect} from 'react'
import { Button } from '../Form/Button'


function DefualtModal({show, onClose ,children,...props}) {
    useEffect(() => {
        if (show) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }, []);
    
      if (!show) {
        return null;
      }
  return (
    <>
          <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-60 z-20 layer">
            <div className="relative w-[100%] md:w-[400px] m-auto modalWrap ">
                <button onClick={onClose} className="absolute top-[-40px] right-[0px]">
                    <img src={`${process.env.PUBLIC_URL}/images/btnModalClose.svg`} />
                </button>
                <div className="m-auto bg-white min-h-[100px] rounded-[1.25em] p-[30px]">
                    <div className="text-center">{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DefualtModal