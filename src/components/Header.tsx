import { Shield } from "./Icons";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="container mx-auto sticky top-0 z-[100]">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Logo />
        </div>
        <div className="navbar-end">
          <div className="hidden items-center gap-2 md:flex">
            <button className="btn btn-outline btn-sm">
                <div>
                  Connect Wallet
                </div>
              </button>
              <button className="btn btn-primary btn-sm">
                <div>
                  Connect Wallet
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;