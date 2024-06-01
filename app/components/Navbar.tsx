import Link from "next/link";
import { ModeToggle } from "./ModeToggler";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="py-4 bg-primary">
      <div className="container mx-auto flex i-items-center justify-between">
        <div className="logo">
          <Link href="/" className="text-3xl font-bold">
            Ashadul <span className="text-primary bg-secondary">Topu</span>
          </Link>
        </div>

        <div className="menu"></div>

        <div className="settings">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
