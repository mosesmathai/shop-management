import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Settings({swal}) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [featuredLoading, setFeaturedLoading] = useState(false);

  useEffect(() => {
    setProductsLoading(true);
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      setProductsLoading(false);
    });
    setFeaturedLoading(true);
    axios.get('/api/featured?name=featuredProductId').then(res => {
      setFeaturedProductId(res.data.value);
      setFeaturedLoading(false);
    })
  }, []);

  async function saveFeatured() {
    await axios.put('/api/featured', {
      name: 'featuredProductId',
      value: featuredProductId,
    }).then(() => {
      swal.fire({
        title: 'Featured product saved!',
        icon: 'success',
      })
    });
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {(productsLoading || featuredLoading) && (
        <Spinner />
      )}
      {(!productsLoading || !featuredLoading) && (
        <>
          <label className="basic">Featured Product</label>
          <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)}>
            {products.length > 0 && products.map(product => (
              <option key={product._id} value={product._id}>{product.title}</option>
            ))}
          </select>
          <div>
            <button onClick={saveFeatured} className="secondary-button-pages">Save</button>
          </div>
        </>
      )} 
    </Layout>
  )
}

export default withSwal(({swal}) => (
  <Settings swal={swal} />
))