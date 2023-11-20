import Layout from "@/components/Layout";
import axios from "axios";
import Spinner from '@/components/Spinner';
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, [])


  if (matches) {
    return (
      <Layout>
        <div className="flex justify-center">
          <h1 className="text-2xl m-0">Orders Received</h1>
        </div>
        <h1 className="text-lg text-gray-400 m-0">M.O.P: Mode of Payment</h1>   
        <table className="basic text-sm">
          <thead>
            <tr>
              <th>Date & Time</th>        
              <th>Items Ordered</th> 
              <th>Total Bill</th>
              <th>M.O.P</th>     
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7}>
                  <div className='py-2 flex justify-center'>
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {orders.length > 0 && orders.map(order => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td>
                  {order.line_items.map(l => (
                    <>
                      &#8226;&nbsp;{l.price_data.product_data.name}
                      &nbsp;&#40;x<b>{l.quantity}</b>&#41; <br />

                    </>
                  ))}
                </td>
                <td>{order.amount}</td>
                <td>{order.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div className="flex justify-center">
          <h1 className="text-2xl m-0">Orders Received</h1>
        </div>
        <h1 className="text-sm text-gray-400 m-0">M.O.P&#58; Mode of Payment</h1>      
        <div>
          <div>
            {isLoading && (
              <div>
                <div>
                  <div className='py-2 flex justify-center'>
                    <Spinner />
                  </div>
                </div>
              </div>
            )}
            {orders.length > 0 && orders.map(order => (
              <div className="border-2 font-mono pl-2" key={order._id}>
                <div>
                  <div>{(new Date(order.createdAt)).toLocaleString()}</div> 
                </div>
                <div>
                  <div>
                    <b>Items&#58;</b>
                  </div>
                  <div>
                    {order.line_items.map(l => (
                      <>
                        &#8226;&nbsp;{l.price_data.product_data.name}
                        &nbsp;&#40;x<b>{l.quantity}</b>&#41; <br />
                        
                      </>
                    ))}
                  </div>
                  <div>
                    <div><b>Total Bill&#58;</b>{order.amount}</div>
                  </div>
                  <div>
                    <div><b>M.O.P&#58;</b>{order.paymentMode}</div>
                  </div>
                </div>             
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}
