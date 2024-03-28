import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel, state }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        setDisable(true);
    }, [])

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
                            style={{ containerStyle: { width: "98%", height: "70%", backgroundColor: "#fff", zIndex: "100", margin: "5px 1% 3px 1%", border: "solid white 1px", borderRadius: "3px", } }} />
                    </div>
                    <div style={{position: "relative", width: "100%", height: "10%", zIndex: "100", opacity: "1", top: "75%", padding: "15px", }}>
                        <div className="flex">
                            <p className="text-gray-700 text-lg ml-3 mr-1 italic">Select Aspect Ratios : </p>
                            <input className="ml-3" type="radio" value={1 / 1} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">1:1</p>
                            <input className="ml-3" type="radio" value={5 / 4} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">5:4</p>
                            <input className="ml-3" type="radio" value={4 / 3} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">4:3</p>
                            <input className="ml-3" type="radio" value={3 / 2} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">3:2</p>
                            <input className="ml-3" type="radio" value={5 / 3} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">5:3</p>
                            <input className="ml-3" type="radio" value={16 / 9} name="ratio" onChange={onAspectRatioChange} /><p className="text-lg font-sans text-gray-500 ml-1">16:9</p>
                            <input className="ml-3" type="radio" value={3 / 1} name="ratio" onChange={onAspectRatioChange} /> <p className="text-lg font-sans text-gray-500 ml-1">3:1</p>
                     </div>
                        <div style={{ position: "realtive", width: "100%", height: "10%", zIndex: "100", opacity: "1", padding: "15px", top: "75%",  }}>
                            <button type="button" onClick={() => { onCropDone(croppedArea); }} className="ml-[65%]  italic bg-cyan-300 px-3 py-1  rounded">
                                Crop & Apply
                            </button>
                            <button type="button" onClick={() => { setDisable(false) }} className="ml-3 italic bg-red-300 px-3 py-1 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ImageCropper;