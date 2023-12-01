import { Github } from "./Icons";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="border-t-[1px] border-t-[#cdcdcd99]/5">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Github customClass="w-6 h-6 fill-primary" />
        </div>
      </div>
    </div>
  )
}

export default Footer;