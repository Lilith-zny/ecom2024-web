import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = () => {
    listProductBy('updatedAt', 'desc', 5)
    .then((res) => {
      console.log(res.data)
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }

  
  return (
    <SwiperShowProduct>
      {
        data?.map((item, i) =>
          <SwiperSlide key={i}>
            <ProductCard item={item} key={i} />
          </SwiperSlide>
        )
      }
    </SwiperShowProduct>
  )
}

export default NewProduct