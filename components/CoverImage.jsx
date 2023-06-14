import { Dispatch, SetStateAction, useState, useRef } from "react"
import React from "react"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
  
export function CoverImage({ setImage }) {
    const [previewUrl, setPreviewUrl] = useState("")
    const fileInput = useRef(null)

    const handleFile = (file) => {
        //you can carry out any file validations here...
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleOnDragOver = (event) => {
        event.preventDefault()
    }
    const handleOnDrop = (event) => {
        //prevent the browser from opening the image
        event.preventDefault()
        event.stopPropagation()
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0]
        handleFile(imageFile)
    }
    // wrapper w-[720px] h-[360px] bg-green-900 rounded-2xl overflow-hidden relative
    return (
        <div style={{
            height:'300px',
            width: '420px',
            backgroundColor: 'rgb(22, 255, 153,1)',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            position: 'relative',
            objectFit: 'cover',
            marginLeft: '2rem'
        }}>
        <div
            className="drop_zone px-4 py-4 flex flex-row justify-end absolute z-10 top-0 right-0"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                position: 'absolute',
                zIndex: '10',
                top: 0,
                right: 0,
                padding: 4
            }}
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            onClick={() => fileInput.current.click()}
        >
            {/* <p>Drag and drop image here....</p> */}
            <span className="material-icons self-center bg-white-100 p-2 cursor-pointer rounded-full"
                style={{
                    backgroundColor: '#cffafe',
                    padding: 5,
                    cursor: 'pointer',
                    borderRadius: '1rem'
                }}
            >
                <ModeEditOutlineIcon />
            </span>
            <input
            type="file"
            accept="image/*"
            ref={fileInput}
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
        {previewUrl && (
            <img
            src={previewUrl}
            alt="image"
            className="w-full h-full absolute top-0"
            />
        )}
        </div>
    )
}