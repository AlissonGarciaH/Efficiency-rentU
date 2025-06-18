'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div
          style={{
            height: '70vh',             // h-[70vh]
            display: 'flex',            // flex
            flexDirection: 'column',    // flex-col
            justifyContent: 'center',   // justify-center
            alignItems: 'center'        // items-center
          }}
        >
          <PuffLoader
          size={100}
          color="#00f5a1"
          />
        </div>

    )
};


export default Loader;