

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'antd';
const Dashboard = () => {


    const [data, setData] = useState([])

    const [view, setView] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (e, id) => {
        e.preventDefault();
        setIsModalOpen(true);


        axios.get(`http://localhost:8000/singlerecord/${id}`)
            .then((res) => {

                setView(res.data)

            })
            .catch((err) => {
                console.log(err);

            });


    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  

    const deleteRecord = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/delete/${id}`)
            .then((res) => {

                toast.success("Record Delete Successfully")
                setData((prevRecords) => prevRecords.filter((record) => record._id !== id));
            })
            .catch((err) => {
                console.log(err);

            });
    }
    useEffect(() => {
        
        fetchRecords();
      }, []);
    

    const fetchRecords = async () => {


        let display = {
            headers: {

                "Content-Type": "application/json",
            }
        }


        axios.get(`http://localhost:8000/all`, display)
            .then((res) => {

                setData(res.data)

            })
            .catch((err) => {
                console.log(err);

            });


        }



    return (
        <>
            <ToastContainer></ToastContainer>
            <div className='container'>
                <h5 className="p-5">All Data</h5>
                <table class="table">
                    <thead>
                        <tr>

                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Action</th>
                            <th scope="col">Action</th>
                            <th scope="col">Action<Link to='/add' className="btn btn-default">Add Note</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {
                            data.map((element) => {
                                return (
                                    <>
                                        <tr>

                                            <td>{element.title}</td>
                                            <td>{element.content}</td>
                                            <td> <Link to={`/edit/${element._id}`} className="btn btn-default">Edit</Link></td>
                                            <td><button className="btn btn-default" onClick={(e) => { deleteRecord(e, element._id) }}>Delete</button></td>
                                            {/* <td><button className="btn btn-default" onClick= {(e) => {view(e,element._id)}}>View</button></td> */}
                                            <td><button className="btn btn-default" onClick={(e) => { showModal(e, element._id) }}>
                                                View
                                            </button></td> 
                                            <Modal title="View Note" open={isModalOpen}    onOk={handleOk}
                                                onCancel={handleCancel}footer={[

                                            ]}>
                                                <p>{view.title}</p>
                                                <p>{view.content}</p>
                                            </Modal>
                                        </tr>
                                    </>

                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

        </>
    )
}
export default Dashboard;