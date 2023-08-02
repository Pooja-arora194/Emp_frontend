import React, { useState, useEffect } from "react";
import axios from "axios";
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Edit = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [record, setRecord] = useState({ title: '', description: '' });


    const values = (e) => {

        setRecord({ ...record, [e.target.name]: e.target.value });

    }





      useEffect(() => {


        let display = {
            headers: {

                "Content-Type": "application/json",
            }
        }


        axios.get(`http://localhost:8000/singlerecord/${id}`, display)
            .then((res) => {

                setRecord(res.data)

            })
            .catch((err) => {
                console.log(err);

            });

          
    }, [])


     

      
    const Edit = () => {

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
      
      
        axios
            .put(`http://localhost:8000/update/${id}`, { title: record.title, content: record.content }, config)
            .then((res) => {
                toast.success("Record Update Successfully")
              
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
                                        value={record.title}
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
                                        value={record.content}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="submit-btn mt-4" align="center">
                            <input
                                type="submit"
                                name="submit"
                                className="btn btn-info"
                                value="Submit" onClick={Edit}

                            />
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
};

export default Edit;