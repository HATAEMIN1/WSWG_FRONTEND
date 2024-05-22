import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../../utils/axios";

function FileUpload({ images, onImageChange }) {
    async function handleDrop(files) {
        console.log(files);
        let formData = new FormData();
        formData.append("image", files[0]);

        const config = {
            header: { "content-type": "multipart/form-data" },
        };

        try {
            const res = await axiosInstance.post(
                "/review-posts/image",
                formData,
                config
            );
            console.log(res.data);
            onImageChange([...images, res.data]);
        } catch (error) {
            console.log(error);
        }
    }
    function handleDelete(image) {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        onImageChange(newImages);
    }
    return (
        <div className="w-full flex justify-between items-center">
            {/* {images} */}

            <div className="flex items-center gap-4 ">
                {images.map((image) => {
                    console.log(image);
                    return (
                        <div key={image} className="w-[90px] relative ">
                            <div
                                onClick={() => {
                                    handleDelete(image);
                                }}
                                className="w-[20px] h-[20px] flex justify-center items-center bg-red-300 absolute rounded-[50%] right-[-10px] top-[-10px]"
                            >
                                X
                            </div>

                            <img
                                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
            <div className="overflow-hidden">
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className={"btnFileUpload"}>
                                    파일업로드
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
            {/* <div className="flex items-center gap-4">
                {images.map((image) => {
                    console.log(image);
                    return (
                        <div key={image} className="w-[90px] relative ">
                            <div
                                onClick={() => {
                                    handleDelete(image);
                                }}
                                className="w-[20px] h-[20px] flex justify-center items-center bg-red-300 absolute rounded-[50%] right-[-10px] top-[-10px]"
                            >
                                X
                            </div>

                            <img
                                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
}

export default FileUpload;
