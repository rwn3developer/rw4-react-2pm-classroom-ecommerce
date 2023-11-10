import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {

  const [usercnt,setUserCnt] = useState(0);
  const [categorycnt,setCategory] = useState(0);
  const [productcnt,setProduct] = useState(0);



  useEffect(()=>{
      axios.get(`http://localhost:8000/users`).then((res)=>{
          setUserCnt(res.data.length)
      }).catch((err)=>{
        console.log(err);
        return false
      })

      axios.get(`http://localhost:8000/category`).then((res)=>{
        setCategory(res.data.length)
    }).catch((err)=>{
      console.log(err);
      return false
    })

    axios.get(`http://localhost:8000/products`).then((res)=>{
      setProduct(res.data.length)
    }).catch((err)=>{
      console.log(err);
      return false
    })
  },[])

  return (
    <div className='p-5'>
      <div className='row justify-content-between'>
        <div style={{ height: '100px', backgroundColor: 'orange',boxShadow : '5px 5px 5px gray' }} className='col-lg-2 p-3'>
          <h4 className='text-center text-white'>User</h4>
          <h3 className='text-center text-white'>{usercnt}</h3>
        </div>
        <div style={{ height: '100px', backgroundColor: 'orange',boxShadow : '5px 5px 5px gray' }} className='col-lg-2 p-3'>
          <h4 className='text-center text-white'>Category</h4>
          <h3 className='text-center text-white'>{categorycnt}</h3>
        </div>
        <div style={{ height: '100px', backgroundColor: 'orange',boxShadow : '5px 5px 5px gray' }} className='col-lg-2 p-3'>
          <h4 className='text-center text-white'>Product</h4>
          <h3 className='text-center text-white'>{productcnt}</h3>
        </div>
        <div style={{ height: '100px', backgroundColor: 'orange',boxShadow : '5px 5px 5px gray' }} className='col-lg-2 p-3'>
          <h4 className='text-center text-white'>User</h4>
        </div>


      </div>
    </div>
  )
}

export default AdminDashboard