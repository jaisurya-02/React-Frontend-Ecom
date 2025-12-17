import { useMemo, useState } from 'react';

const orders = [
  {
    id: 'ORD-1001',
    date: '2024-12-01',
    total: 430,
    items: 3,
    status: 'Delivered',
    address: 'Chennai, Tamil Nadu',
    payment: 'UPI • Paid',
    courier: 'BlueDart',
    eta: 'Dec 04',
    trackingId: 'BDX0193921',
    note: 'Left at the front desk',
    products: [
      { name: 'Wireless Earbuds', qty: 1, price: 220 },
      { name: 'Laptop Sleeve', qty: 1, price: 950 },
      { name: 'Type-C Cable', qty: 1, price: 260 },
    ],
    timeline: [
      { label: 'Order placed', time: 'Dec 01, 9:18 AM', done: true },
      { label: 'Packed', time: 'Dec 01, 2:10 PM', done: true },
      { label: 'Shipped', time: 'Dec 02, 11:42 AM', done: true },
      { label: 'Delivered', time: 'Dec 03, 5:20 PM', done: true },
    ],
  },
  {
    id: 'ORD-1002',
    date: '2024-12-04',
    total: 180,
    items: 1,
    status: 'Shipped',
    address: 'Coimbatore, Tamil Nadu',
    payment: 'Card • Paid',
    courier: 'Delhivery',
    eta: 'Dec 07',
    trackingId: 'DLV220193',
    note: 'Out for delivery tomorrow',
    products: [{ name: 'Desk Lamp', qty: 1, price: 180 }],
    timeline: [
      { label: 'Order placed', time: 'Dec 04, 10:40 AM', done: true },
      { label: 'Packed', time: 'Dec 04, 3:25 PM', done: true },
      { label: 'Shipped', time: 'Dec 05, 8:00 AM', done: true },
      { label: 'Out for delivery', time: 'Dec 06, 8:10 AM', done: false },
    ],
  },
  {
    id: 'ORD-1003',
    date: '2024-12-07',
    total: 260,
    items: 2,
    status: 'Processing',
    address: 'Bengaluru, Karnataka',
    payment: 'COD • Pay on delivery',
    courier: 'Ekart',
    eta: 'Dec 10',
    trackingId: 'EKT773110',
    note: 'Payment on delivery',
    products: [
      { name: 'Notebook Pack', qty: 2, price: 120 },
      { name: 'Sticky Notes', qty: 1, price: 140 },
    ],
    timeline: [
      { label: 'Order placed', time: 'Dec 07, 9:30 AM', done: true },
      { label: 'Packed', time: 'Dec 07, 4:05 PM', done: false },
      { label: 'Shipped', time: 'Pending', done: false },
      { label: 'Out for delivery', time: 'Pending', done: false },
    ],
  },
];

const statusStyles = {
  Delivered: 'bg-green-50 text-green-700 border border-green-200',
  Shipped: 'bg-blue-50 text-blue-700 border border-blue-200',
  Processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  Cancelled: 'bg-red-50 text-red-700 border border-red-200',
};

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const stats = useMemo(() => ({
    total: orders.length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
    inTransit: orders.filter((o) => o.status === 'Shipped').length,
    processing: orders.filter((o) => o.status === 'Processing').length,
  }), []);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    const visible = orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' ? true : order.status === statusFilter;
      const matchesQuery = normalizedQuery.length === 0
        ? true
        : [
            order.id,
            order.address,
            order.trackingId,
            order.products.map((p) => `${p.name} ${p.qty}`).join(' '),
          ]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });

    const sorted = [...visible].sort((a, b) => {
      if (sortBy === 'value') return b.total - a.total;
      return new Date(b.date) - new Date(a.date);
    });

    return sorted;
  }, [statusFilter, query, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your orders</h1>
          <p className="text-sm text-slate-500">Track deliveries, view invoices, and reorder quickly.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Delivered', 'Shipped', 'Processing'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                statusFilter === status ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total orders</p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-green-700">Delivered</p>
          <p className="text-2xl font-semibold text-green-900">{stats.delivered}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-blue-700">In transit</p>
          <p className="text-2xl font-semibold text-blue-900">{stats.inTransit}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-amber-700">Processing</p>
          <p className="text-2xl font-semibold text-amber-900">{stats.processing}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID, product, city"
            className="w-full sm:max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-2 focus:border-slate-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option value="recent">Most recent</option>
            <option value="value">Highest value</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const completedSteps = order.timeline.filter((step) => step.done).length;
          const progress = Math.round((completedSteps / order.timeline.length) * 100);

          return (
            <div key={order.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-lg font-semibold text-slate-900">{order.id}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-slate-500">Placed on {order.date} • {order.payment}</p>
                  <p className="text-sm text-slate-500">Ship to {order.address}</p>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-lg border border-slate-200 px-3 py-2">Items: {order.items}</span>
                  <span className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-900">Total: Rs.{order.total}</span>
                  <span className="rounded-lg border border-slate-200 px-3 py-2">Courier: {order.courier}</span>
                  <span className="rounded-lg border border-slate-200 px-3 py-2">ETA: {order.eta}</span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">Items</p>
                    <p className="text-xs text-slate-500">Tracking ID: {order.trackingId}</p>
                  </div>
                  <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                    {order.products.map((item) => (
                      <div key={item.name} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">Rs.{item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400">Download invoice</button>
                    <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Track package</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-slate-800">Delivery status</p>
                      <p className="text-xs text-slate-500">{progress}% complete</p>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-slate-900" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg divide-y divide-slate-200">
                    {order.timeline.map((step) => (
                      <div key={step.label} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                          <p className="text-xs text-slate-500">{step.time}</p>
                        </div>
                        <span className={`text-xs font-medium ${step.done ? 'text-green-700' : 'text-slate-400'}`}>
                          {step.done ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">Note: {order.note}</p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-slate-900">No orders match that filter</p>
            <p className="text-sm text-slate-500">Try changing the status or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
