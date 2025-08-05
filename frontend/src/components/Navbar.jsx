import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const { user, setUser, setShowUserLogin, navigate, getCartCount, axios, products } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fuzzy search using Fuse.js
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const fuse = new Fuse(products, {
      keys: ['name', 'category'],
      threshold: 0.4,
    });

    const results = fuse.search(query);
    setFilteredProducts(results.map((result) => result.item));
  };

  const handleSelect = (product) => {
    setSearchQuery('');
    setFilteredProducts([]);
    navigate(`/shop/${product.category.toLowerCase()}/${product._id}`);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="w-50" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/' className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}>
          Home
        </NavLink>
        <NavLink to='/shop' className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}>
          Shop
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}>
          Contact
        </NavLink>

        {/* Search Input with fuzzy search */}
        <div className="relative hidden lg:flex flex-col items-start text-sm gap-2">
          <div className="flex items-center border border-gray-300 px-3 py-1.5 rounded-full w-64">
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          {/* Search Results */}
          {filteredProducts.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white shadow-lg border w-full max-h-64 overflow-y-auto z-50 rounded-md">
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm text-gray-700"
                  onClick={() => handleSelect(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className='relative group'>
            <img src={assets.profile_icon} className='w-10' alt="" />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
              <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
              <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
            </ul>
          </div>
        )}
      </div>

      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <img src={assets.menu_icon} alt="menu" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden">
          <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to='/shop' onClick={() => setOpen(false)}>Shop</NavLink>
          {user && <NavLink to='/shop' onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to='/contact' onClick={() => setOpen(false)}>Contact</NavLink>
          {!user ? (
            <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Login
            </button>
          ) : (
            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
