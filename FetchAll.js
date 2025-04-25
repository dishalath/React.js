import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// import { useHistory } from 'react-router-dom';
const apiURL = process.env.REACT_APP_API_URL;
export const FetchAll = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        userFound();
    }, [])
    const userFound = async () => {
        setLoading(true);
        const Response = await Axios.get(`${apiURL}/api/user/all-user`);
        const GetAll_Data = Response.data?.Users || [];
        console.log(GetAll_Data);
        const UserRole = GetAll_Data.filter(user => user.userRole === 0)
        console.log(UserRole);
        setUser(UserRole);
        setLoading(false);
    }
    const HandelDelete = async (_id) => {
        try {
            const Response = await Axios.post(`${apiURL}/api/user/delete-user`, { _id });
            if (Response.status >= 200 && Response.status < 300) {
                console.log("Deleted successfully!");
                // Refresh the page
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Button size="lg" className="" variant="success" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2 "
                    />
                    Loading...
                </Button>
            </div>
        );
    }
    return (
        <>
            <div className="text-sm fs-4 d-flex justify-content-center text-dark mb-3 mt-2">
                {user && user.length} User found
            </div>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
                <table className="table-auto border w-full my-2">
                    <thead>
                        <tr >
                            <th className="px-4 py-2  border">Name</th>
                            <th className="px-4 py-2  border">Email</th>
                            <th className="px-4 py-2  border" style={{ display: 'flex', justifyContent: 'center' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user && user.length > 0 ? (
                                user.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className="p-2  border px-4 py-2  text-left">{item.name}</td>
                                                <td className="p-2  border px-4 py-2  text-left">{item.email}</td>
                                                <td className="p-2  adminHov border px-4 py-2  text-left cursor-pointer" style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span onClick={(_id) => HandelDelete(item._id)}>

                                                        <MdDelete className="fs-3" />
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="text-xl text-center font-semibold py-8"
                                    >
                                        No User found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
