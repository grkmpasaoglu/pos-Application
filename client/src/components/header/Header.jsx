import React from 'react'
import {
  SearchOutlined,
  BarChartOutlined,
  LogoutOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Input, message } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz ?")) {
      localStorage.removeItem("posUser")
      navigate("/login")
      message.success("Çıkış başarılı")
    }
  }

  return (
    <div className="border-b">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo text-center">
          <Link to="/" >
            {/* <h2 className='text-2xl font-bold md:text-4xl '>GP</h2>
            <span>Get Premium</span> */}
            <img src="images/logo.jpeg" className="lg:h-20 lg:w-32 h-10 w-16" alt="" />
          </Link>
        </div>
        <div className="header-search flex-1 " onClick={() => pathname !== "/" && navigate("/")}
        >
          <Input
            className="gap-3 rounded-xl max-w-[800px]"
            size="large"
            placeholder="Ürün Ara"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-2">
          <Link
            to="/"
            className={`menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all ${pathname === "/" && "active"
              }`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} className="md:flex hidden">
            <Link
              to="/cart"
              className={`menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all ${pathname === "/cart" && "active"
                }`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>

          </Badge>
          <Link
            to="/bills"
            className={`menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all ${pathname === "/bills" && "active"
              }`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>

          <Link
            to="/customer"
            className={`menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all ${pathname === "/customer" && "active"
              }`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>

          <Link
            to="/statistics"
            className={`menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all ${pathname === "/statistics" && "active"
              }`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>

          <div onClick={logOut}
          >
            <Link
              className="menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all"
            >
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge count={cart.cartItems.length} className="md:hidden flex">
          <Link
            to="/"
            className="menu-link items-center flex flex-col gap-y-1 hover:text-[#40a9ff] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  )
}

export default Header
