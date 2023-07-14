import ProductCard from './ProductCart/ProductCart';
import useProductCatagories from '../../Hooks/useProductCatagories';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../Shared/Components/BreadCrumbs';
import useCart from '../../Hooks/useCart';
import ProductModal from './ProductCart/ProductModal';

const Products = () => {
  const [categories] = useProductCatagories();
  const [selectedCategory, setSelectedCategory] = useState('ALL-CATEGORY');
  const [products, setProducts] = useState([]);
  const [refetch] = useCart();
  const [markedProduct, setMarkedProduct] = useState(null);

  // load product according to the selected category //
  const handleProductLoading = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    fetch(
      `https://electrix-server.vercel.app/products?category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory]);

  return (
    <div className='bg-[#002632]'>
      <BreadCrumbs
        breadcrumb={{
          page: 'Products',
          bread: [{ name: 'Home', address: '/' }],
        }}
      ></BreadCrumbs>
      <div className='flex px-5 min-[376px]:px-10 sm:px-10 md:pr-1'>
        <div className='w-[350px]  pr-5 hidden sm:block'>
          <div className='form-control my-8'>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Search…'
                className='input input-bordered flex-grow'
              />
              <button className='btn btn-neutral btn-square'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='bg-white p-5 rounded-lg'>
            <h2 className='text-xl font-bold text-center'>
              Products Categories :
            </h2>
            <div>
              <label className='flex items-center my-2 border-2 p-2 cursor-pointer'>
                <input
                  type='radio'
                  name='category'
                  className='radio radio-secondary radio-sm'
                  onChange={() => handleProductLoading('ALL-CATEGORY')}
                />
                <span className='text-sm font-medium ml-3'>All Category</span>
              </label>
              {categories.map((category) => (
                <label
                  key={category._id}
                  className='flex items-center my-2 border-2 p-2 cursor-pointer'
                >
                  <input
                    type='radio'
                    name='category'
                    className='radio radio-secondary radio-sm'
                    onChange={() => handleProductLoading(category.name)}
                  />
                  <span className='text-sm font-medium ml-3'>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
            <div className='mt-5'>
              <h1 className='text-xl font-bold text-center'>
                Popular Products :
              </h1>
            </div>
          </div>
        </div>
        <div className='mx-auto px-3 w-full'>
          <div className='my-8'>
            <h1 className='text-primary text-center font-bold text-2xl lg:text-3xl '>
              Grab What You Need Today !
            </h1>
          </div>
          <div className='grid grid-cols-1 min-[890px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-8'>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                setMarkedProduct={setMarkedProduct}
              ></ProductCard>
            ))}
          </div>
        </div>
      </div>
      {markedProduct && (
        <ProductModal
          markedProduct={markedProduct}
          setMarkedProduct={setMarkedProduct}
          refetch={refetch}
        ></ProductModal>
      )}
      <div className='w-full h-[1px] bg-[gray] mt-12'></div>
    </div>
  );
};

export default Products;
