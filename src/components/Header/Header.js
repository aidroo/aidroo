import DesktopMenu from "../DesktopMenu";
import MobileMenu from "../MobileMenu";
export default function Header() {
  return (
    <div className="w-full sticky top-0 z-20 bg-[#002A64] ">
      <div className="max-w-7xl mx-auto px-4  ">
        <DesktopMenu />
        <MobileMenu />
      </div>
    </div>
  );
}
