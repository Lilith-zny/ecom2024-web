import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, X } from 'lucide-react';
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: '',
  images: [],
}

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  // console.log(products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      console.log(res);
      setForm(initialState)
      getProduct()
      toast.success(`Add Product ${res.data.title} Successfully.`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id, title) => {
    // console.log(id, title)
    if(window.confirm("Do you want to Delete?")){
      try{
        const res = await deleteProduct(token, id)
        console.log(res)
        getProduct()
        toast.success(`Deleted Product ${title} Successfully.`)
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          onChange={handleOnChange}
          className="border"
          type="text"
          value={form.title}
          placeholder="Title"
          name="title"
          required
        />
        <input
          onChange={handleOnChange}
          className="border"
          type="text"
          value={form.description}
          placeholder="Description"
          name="description"
          required
        />
        <input
          onChange={handleOnChange}
          className="border"
          type="number"
          value={form.price}
          placeholder="Price"
          name="price"
          required
        />
        <input
          onChange={handleOnChange}
          className="border"
          type="number"
          value={form.quantity}
          placeholder="Quantity"
          name="quantity"
          required
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          value={form.categoryId}
          required
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, i) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        {/* Upload file */}
        <Uploadfile form={form} setForm={setForm} />
        <button className="bg-blue-500 mt-2 p-2 shadow-lg text-white hover:scale-105 hover:translate-y-1 hover:duration-200">เพิ่มสินค้า</button>

        <table className="table w-full border mt-2">
          <thead>
            <tr className="bg-gray-100 border">
              <th scope="col">No.</th>
              <th scope="col">Img</th>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sold</th>
              <th scope="col">Date</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {
                products.map((item, i) => {
                    // console.log(item)
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {
                                item.images.length > 0 ? <img className="w-24 h-24 rounded-md shadow-lg hover:scale-105" src={item.images[0].url} />
                                : <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center shadow-lg justify-center hover:scale-105">No Image</div>
                              }
                            </td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{ numberFormat(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>{item.sold}</td>
                            <td>{dateFormat(item.updatedAt)}</td>
                            <td className="flex gap-2">
                                <p className="bg-yellow-300 p-1 shadow-md rounded-md hover:scale-105 hover:translate-y-1 hover:duration-200"><Link to={`/admin/product/${item.id}`}><Pencil /></Link></p>
                                <p className="bg-red-300 p-1 shadow-md rounded-md hover:scale-105 hover:translate-y-1 hover:duration-200" onClick={() => handleDelete(item.id, item.title)}><X /></p>
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
