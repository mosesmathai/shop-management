import Spinner from "@/components/Spinner";
import axios from "axios";
import { subHours } from "date-fns";
import { useEffect, useState } from "react";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach(order => {
      const {line_items} = order;
      line_items.forEach(li => {
        const lineSum = li.quantity * li.price_data.unit_amount;
        sum += lineSum
      });
    });
    return new Intl.NumberFormat('en-US').format(sum);
  }

  if (isLoading) {
    return (
      <div className="my-4 flex justify-center">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24));
  const ordersWeek = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*7));
  const ordersMonth = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*30));
  return (
    <div>
      <div className="tile-title">
        <div>Orders</div>
      </div>
      <div className="grid  md:grid-cols-3 grid-cols-2 md:gap-10 gap-3">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersToday.length}</div>
          <div className="tile-desc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>
          <div className="tile-number">{ordersWeek.length}</div>
          <div className="tile-desc">{ordersWeek.length} orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>
          <div className="tile-number">{ordersMonth.length}</div>
          <div className="tile-desc">{ordersMonth.length} orders this month</div>
        </div>
      </div>
      <div className="tile-title">
        <div>Revenue</div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-3">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersTotal(ordersToday)} Ksh</div>
          <div className="tile-desc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>
          <div className="tile-number">{ordersTotal(ordersWeek)} Ksh</div>
          <div className="tile-desc">{ordersWeek.length} orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>
          <div className="tile-number">{ordersTotal(ordersMonth)} Ksh</div>
          <div className="tile-desc">{ordersMonth.length} orders this month</div>
        </div>
      </div>
    </div>
  )
}
