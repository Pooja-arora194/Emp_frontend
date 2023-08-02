import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Add = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        content: "",
    })


    const values = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });

    }





    const add = () => {

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const { title, content } = data;

        if (!title || !content) {
            toast.error("All fields are required")
            return
        }

        axios
            .post(`http://localhost:8000/add`, { title: title, content: content }, config)
            .then((res) => {
                toast.success("Record Add Successfully")
                setData({
                    title: '', content: ''
                });
                navigate('/')

            })
            .catch((err) => {

                console.log(err)
            });
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
    };



    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="container mt-4">

                <h3 className="text-center pt-5">Machine Task </h3>


                <form onSubmit={handlesubmit}>
                    <div className="form-login-wrapper mt-4">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group" align="left">
                                    <label>Title*</label>
                                    <input
                                        type="text"
                                        className="form-control formtext"

                                        placeholder="Enter Title"
                                        name="title"
                                        onChange={values}
                                        value={data.title}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group" align="left">
                                    <label>Content*</label>
                                    <input
                                        type="text"
                                        className="form-control formtext"

                                        placeholder="Enter Content"
                                        name="content"
                                        onChange={values}
                                        value={data.content}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="submit-btn mt-4" align="center">
                            <input
                                type="submit"
                                name="submit"
                                className="btn btn-info"
                                value="Submit" onClick={add}

                            />
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
};

export default Add;