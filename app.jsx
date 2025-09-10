import React, { useState, useMemo } from 'react';

// --- Icon Components (Using inline SVGs for self-containment) ---
const IconBox = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconTruck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const IconLayoutDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const IconBell = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconPlusCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const IconActivity = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconAlertTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-yellow-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;


// --- Mock Data (Replace with API calls) ---
const MOCK_PRODUCTS = [
  { id: 1, name: 'Fiber Optic Cable - 100m', sku: 'FOC-100-SM', quantity: 25, lowStockThreshold: 20, supplier: 'CoreConnect' },
  { id: 2, name: 'Enterprise Router X2', sku: 'ER-X2-2024', quantity: 8, lowStockThreshold: 10, supplier: 'NetGear Pro' },
  { id: 3, name: '48-Port Switch', sku: 'SW-48P-G2', quantity: 15, lowStockThreshold: 15, supplier: 'SwitchMasters' },
  { id: 4, name: 'VoIP Phone System', sku: 'VOIP-SYS-B1', quantity: 30, lowStockThreshold: 25, supplier: 'VoiceLink' },
  { id: 5, name: 'Server Rack 42U', sku: 'RACK-42U-STL', quantity: 12, lowStockThreshold: 5, supplier: 'CoreConnect' },
];

const MOCK_SUPPLIERS = [
  { id: 1, name: 'CoreConnect', contact: 'sales@coreconnect.com' },
  { id: 2, name: 'NetGear Pro', contact: 'pro@netgear.com' },
  { id: 3, name: 'SwitchMasters', contact: 'orders@switchmasters.com' },
  { id: 4, name: 'VoiceLink', contact: 'contact@voicelink.net' },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Stock for Enterprise Router X2 is low.' },
  { id: 2, text: '48-Port Switch is at its stock threshold.' },
];

// --- Reusable Components ---

const Sidebar = ({ page, setPage }) => {
  const navItems = [
    { id: 'dashboard', icon: <IconLayoutDashboard />, label: 'Dashboard' },
    { id: 'products', icon: <IconBox />, label: 'Products' },
    { id: 'suppliers', icon: <IconTruck />, label: 'Suppliers' },
    { id: 'users', icon: <IconUsers />, label: 'Users' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-gray-300 flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-white tracking-wider border-b border-gray-800">
        TIMS
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            onClick={() => setPage(item.id)}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              page === item.id 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="ml-4 text-lg">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const Navbar = ({ setLoggedIn }) => (
  <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8">
    <div className="flex items-center">
      <div className="relative">
        <IconSearch />
        <input 
          type="text" 
          placeholder="Search inventory..." 
          className="bg-gray-800 text-white placeholder-gray-500 rounded-full py-2 pl-10 pr-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex items-center space-x-6">
      <div className="relative">
        <IconBell />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-xs text-white">
            {MOCK_NOTIFICATIONS.length}
          </span>
        </span>
      </div>
      <div className="flex items-center">
        <img src="https://placehold.co/40x40/6366f1/ffffff?text=A" alt="Admin" className="h-10 w-10 rounded-full" />
        <div className="ml-3">
          <p className="text-white font-semibold">Admin User</p>
          <p className="text-gray-400 text-sm">admin@lumen.com</p>
        </div>
      </div>
       <button 
          onClick={() => setLoggedIn(false)} 
          className="bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
    </div>
  </header>
);

const AppLayout = ({ page, setPage, setLoggedIn }) => (
  <div className="flex h-screen bg-gray-800">
    <Sidebar page={page} setPage={setPage} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar setLoggedIn={setLoggedIn} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-8">
        {page === 'dashboard' && <DashboardPage />}
        {page === 'products' && <ProductsPage />}
        {page === 'suppliers' && <SuppliersPage />}
        {page === 'users' && <UsersPage />}
      </main>
    </div>
  </div>
);

// --- Page Components ---

const DashboardPage = () => {
    const lowStockCount = MOCK_PRODUCTS.filter(p => p.quantity <= p.lowStockThreshold).length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-blue-500 p-3 rounded-full"><IconBox /></div>
                        <div className="ml-4">
                            <p className="text-gray-400">Total Products</p>
                            <p className="text-2xl font-bold text-white">{MOCK_PRODUCTS.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-yellow-500 p-3 rounded-full"><IconAlertTriangle /></div>
                        <div className="ml-4">
                            <p className="text-gray-400">Low Stock Items</p>
                            <p className="text-2xl font-bold text-white">{lowStockCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-green-500 p-3 rounded-full"><IconTruck /></div>
                        <div className="ml-4">
                            <p className="text-gray-400">Total Suppliers</p>
                            <p className="text-2xl font-bold text-white">{MOCK_SUPPLIERS.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-indigo-500 p-3 rounded-full"><IconActivity /></div>
                        <div className="ml-4">
                            <p className="text-gray-400">Recent Activity</p>
                            <p className="text-2xl font-bold text-white">2 New Items</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 bg-gray-900 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Inventory Overview</h2>
                {/* A placeholder for a chart */}
                <div className="h-64 bg-gray-800 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Chart will be displayed here</p>
                </div>
            </div>
        </div>
    );
};

const ProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-200">
                    <IconPlusCircle />
                    Add New Product
                </button>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full text-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">SKU</th>
                            <th className="py-3 px-6 text-left">Quantity</th>
                            <th className="py-3 px-6 text-left">Supplier</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {MOCK_PRODUCTS.map(product => {
                            const isLowStock = product.quantity <= product.lowStockThreshold;
                            return (
                                <tr key={product.id} className="hover:bg-gray-800">
                                    <td className="py-4 px-6 font-medium">{product.name}</td>
                                    <td className="py-4 px-6 text-gray-400">{product.sku}</td>
                                    <td className={`py-4 px-6 font-bold ${isLowStock ? 'text-yellow-400' : 'text-green-400'}`}>{product.quantity}</td>
                                    <td className="py-4 px-6">{product.supplier}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                            isLowStock ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'
                                        }`}>
                                            {isLowStock ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <AddProductModal closeModal={() => setIsModalOpen(false)} />}
        </div>
    );
};

const AddProductModal = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-lg p-8 m-4">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                <form>
                    <div className="space-y-4">
                         <input className="w-full bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Product Name"/>
                         <input className="w-full bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="SKU"/>
                         <input className="w-full bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Quantity"/>
                         <input className="w-full bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Low Stock Threshold"/>
                         <select className="w-full bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select a Supplier</option>
                            {MOCK_SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                         </select>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                        <button type="button" onClick={closeModal} className="bg-gray-700 hover:bg-gray-600 font-bold py-2 px-6 rounded-lg transition-colors duration-200">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-6 rounded-lg transition-colors duration-200">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const SuppliersPage = () => <h1 className="text-3xl font-bold text-white">Suppliers</h1>;
const UsersPage = () => <h1 className="text-3xl font-bold text-white">User Management</h1>;

const LoginPage = ({ setLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Telecom Inventory Management</h1>
                    <p className="text-gray-400 mt-2">Sign in to your account</p>
                </div>
                <form className="bg-gray-800 shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="bg-gray-700 shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            id="username"
                            type="text"
                            placeholder="admin@lumen.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="bg-gray-700 shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                            type="button"
                            onClick={() => setLoggedIn(true)}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard'); // Default page after login

  if (!loggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn} />;
  }
  
  return <AppLayout page={page} setPage={setPage} setLoggedIn={setLoggedIn} />;
}
