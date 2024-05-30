import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../../utils/axios";

function FileUpload({ images, onImageChange }) {
    const [error, setError] = useState(""); //에러상태정의

    async function handleDrop(files) {
        console.log(files);
        let formData = new FormData();
        formData.append("image", files[0]);

        // 이미지가 5개 이상이면 에러 메시지 설정하고 업로드 중지
        if (images.length >= 5) {
            setError("*이미지는 최대 5개까지 업로드할 수 있습니다");
            return;
        } else {
            setError(""); // 이미지가 5개를 넘지 않으면 에러 메시지 지우기
        }

        const config = {
            header: { "content-type": "multipart/form-data" },
        };

        try {
            const res = await axiosInstance.post(
                "/review-posts/image",
                formData,
                config
            );
            // console.log(res.data);
            onImageChange([...images, res.data]);
            setError(""); // 업로드 성공 시 에러 메시지 지우기
        } catch (error) {
            console.log(error);
            setError("*이미지 업로드에 실패했습니다."); // 업로드 실패 시 에러 메시지 설정
        }
    }
    function handleDelete(image) {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        onImageChange(newImages);
    }
    //     return (
    //         <div className="w-full flex justify-between items-center">
    //             {/* {images} */}

    //             <div className="flex items-center gap-4 ">
    //                 {images.map((image) => {
    //                     console.log(image);
    //                     return (
    //                         <div key={image} className="w-[100px] relative ">
    //                             <div
    //                                 onClick={() => {
    //                                     handleDelete(image);
    //                                 }}
    //                                 className="w-full h-[20px] flex justify-center items-center bg-gray-100 absolute rounded-sm left-[0px] bottom-[0px] cursor-pointer"
    //                             >
    //                                 &#10005;
    //                             </div>
    //                             <div className="w-[100px] h-[100px] overflow-hidden ">
    //                                 <img
    //                                     src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
    //                                     className="w-full h-full object-cover"
    //                                     alt=""
    //                                 />
    //                             </div>
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //             <div className="overflow-hidden">
    //                 <Dropzone onDrop={handleDrop}>
    //                     {({ getRootProps, getInputProps }) => (
    //                         <section>
    //                             <div {...getRootProps()}>
    //                                 <input {...getInputProps()} />
    //                                 <div className={"btnFileUpload"}>
    //                                     파일업로드
    //                                 </div>
    //                             </div>
    //                         </section>
    //                     )}
    //                 </Dropzone>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="p-5 ">
            <div className="w-full h-[100px] flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {images.map((image) => {
                        return (
                            <div key={image} className="w-[100px] relative ">
                                <div
                                    onClick={() => handleDelete(image)}
                                    className="w-full h-[20px] flex justify-center items-center bg-gray-100 absolute rounded-sm left-0 bottom-0 cursor-pointer"
                                >
                                    &#10005;
                                </div>
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img
                                        src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="overflow-hidden ">
                    <Dropzone onDrop={handleDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="btnFileUpload">
                                        파일업로드
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;