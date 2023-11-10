import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
const AdminCategory = () => {
    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [isedit, setIsEdit] = useState("");
    const handleSubmit = () => {
        if (isedit) {
            axios.put(`http://localhost:8000/category/${isedit}`, {
                category: category
            })
                .then((res) => {
                    alert("Category successfully Update");
                    setCategory("");
                    setIsEdit("");
                    getUser();
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        } else {
            axios.post(`http://localhost:8000/category`, {
                category: category
            })
                .then((res) => {
                    alert("Category successfully add");
                    setCategory("");
                    getUser();
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        }
    }
    const getUser = () => {
        axios.get(`http://localhost:8000/category`)
            .then((res) => {
                setCategoryData(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/category/${id}`)
            .then((res) => {
                alert("Category delete");
                setCategory("");
                getUser();
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const editData = (id) => {
        axios.get(`http://localhost:8000/category/${id}`)
            .then((res) => {
                setCategory(res.data.category);
                setIsEdit(id)
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <center>
            <AdminNavbar/>
            <h2>Admin Category page</h2>
            <table border={1}>
                <tbody>
                    <tr>
                        <td>Category :-</td>
                        <td><input type="category" onChange={(e) => setCategory(e.target.value)} value={category} name="category" placeholder="Enter category" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {
                                isedit ? (<input type="button" onClick={() => handleSubmit()} value="Edit" />) : (<input type="button" onClick={() => handleSubmit()} value="submit" />)
                            }
                        </td>
                    </tr>
                </tbody>
            </table><br></br>
            <table border={1}>
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td>Category</td>
                        <td>Action</td>
                    </tr>
                    {
                        categoryData.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.category}</td>
                                    <td>


                                        <button onClick={() => deleteData(val.id)}>Delete</button>
                                        <button onClick={() => editData(val.id)}>Edit</button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </center>
    )
}
export default AdminCategory;