import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from 'react-toastify'

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data)
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus)
    const value = {
        id: userId,
        enabled: !userStatus
    }
    changeUserStatus(token, value)
    .then((res) => {
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Status Successfully.')
    })
    .catch((err) => console.log(err))
  }

  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus)
    const value = {
        id: userId,
        role: userRole
    }
    changeUserRole(token, value)
    .then((res) => {
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Role Successfully.')
    })
    .catch((err) => console.log(err))
  }

  

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            {/* <th>Updated</th> */}
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users?.map((el, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el.email}</td>



              <td>
                <select onChange={(e) => handleChangeUserRole(el.id, e.target.value)} value={el.role}>
                    <option>user</option>
                    <option>admin</option>
                </select>
              </td>



              <td>
                    {el.enabled ? 'Active' : 'Inactive'}  
              </td>
              <td>
                <button className="bg-yellow-200 px-4 p-0.5 rounded-full shadow-md" onClick={() => handleChangeUserStatus(el.id, el.enabled)}>
                    {el.enabled ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
