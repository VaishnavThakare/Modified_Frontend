import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel ,state}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);
    const [disable, setDisable] = useState(true);

    useEffect(()=>{
        setDisable(true);
    },[])

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    }

    const onAspectRatioChange = (event) => {
        setAspectRatio(event.target.value);
    }

    return (
        <>
        {
            disable &&
        <div style={{
            position: "absolute",
            width: "50%",
            height: "55%",
            backgroundColor: "#fff",
            zIndex: "100",
            opacity: "1",
            top: "150px",
            left: "28%",
            padding: "15px",
            border: "solid black 1px",
            borderRadius: "15px"
        }}>
            <div>
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: {
                            width: "98%",
                            height: "70%",
                            backgroundColor: "#fff",
                            zIndex: "100",
                            margin: "5px 1% 3px 1%",
                        }
                    }}
                />
            </div>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "10%",
                    zIndex: "100",
                    opacity: "1",
                    top: "75%",
                    padding: "15px",

                }}>
                <input type="radio" value={1 / 1} name="ratio" onChange={onAspectRatioChange} /> 1:1
                <input className="ml-3" type="radio" value={5 / 4} name="ratio" onChange={onAspectRatioChange} /> 5:4
                <input className="ml-3" type="radio" value={4 / 3} name="ratio" onChange={onAspectRatioChange} /> 4:3
                <input className="ml-3" type="radio" value={3 / 2} name="ratio" onChange={onAspectRatioChange} /> 3:2
                <input className="ml-3" type="radio" value={5 / 3} name="ratio" onChange={onAspectRatioChange} /> 5:3
                <input className="ml-3" type="radio" value={16 / 9} name="ratio" onChange={onAspectRatioChange} /> 16:9
                <input className="ml-3" type="radio" value={3 / 1} name="ratio" onChange={onAspectRatioChange} /> 3:1
                <button onClick={() => { setDisable(false) }} className="bg-red-300 px-3 py-1 rounded">
                    Cancel
                </button>
                <button onClick={() => { onCropDone(croppedArea); }} className="bg-cyan-300 px-3 py-1 ml-3 rounded">
                    Crop & Apply
                </button>
            </div>

            <div style={{
                position: "realtive",
                width: "100%",
                height: "10%",
                zIndex: "100",
                opacity: "1",
                top: "88%",
            }}>

            </div>

        </div>
    }
</>
    );
};

export default ImageCropper;