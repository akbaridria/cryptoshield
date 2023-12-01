import { Shield } from "./Icons"

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Shield customClass="w-6 h-6 fill-primary stroke-base-100" />
      <div className="font-bold text">CRYPTOSHIELD</div>
    </div>
  )
}