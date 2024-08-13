import Image from "next/image";
import Logo from "./dojo-logo.png";
import Link from "next/link";

function Navbar({ product }) {
    return (
        <div>
            <nav>
                <Image src={Logo} alt="Dojo Logo" width={70} height={36} />
                <h1>Dojo Helpdesk</h1>
                <Link href="/">Dashboard</Link>
                {product ? (
                    <Link href={`/tickets/${product.id}`}>Tickets</Link>
                ) : (
                    <Link href="/tickets">Tickets</Link>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
