import React, { useRef } from "react";

const FileInput = ({onImageSelected})=>{

    const inputRef = useRef();

    const handleOnChange = (event)=>{
        if(event.target.files && event.target.files.length > 0){
            const fileName = event.target.files[0].name;
            console.log(fileName);
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            
            reader.onload = function (e){
                onImageSelected(reader.result,fileName);
            }
        }
    }

    const onChooseImg = ()=>{
        inputRef.current.click();
    }

    return (
        <div className="w-[30%] py-1 px-1 rounded bg-cyan-300 ">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleOnChange}
                style={{display:"none"}}
            />

            <button type="button" classname="w-full bg-green-300 px-2 py-1 text-left" onClick={onChooseImg}>
                Choose Image
            </button>
       
        </div>
    );
};

export default FileInput;