import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";


const initialState = {
  title: "Mornitor 144hr",
  description: "Expensive",
  price: 12009,
  quantity: 6,
  categoryId: 5,
  images: [],
};

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form)
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
        const res = await readProduct(token, id, form)
        console.log(`res from backend - ${res}`)
        setForm(res.data)
    }catch(err){
        console.log(err)
    }
  }

  console.log(form)

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
      const res = await updateProduct(token, id, form);
      console.log(res);
      toast.success(`Add Product ${res.data.title} Successfully.`);
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };

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
        <button className="bg-blue-500 mt-2">เพิ่มสินค้า</button>
        <hr />

        
      </form>
    </div>
  );
};

export default FormEditProduct;
