const Footer = () => {
    return (
        <>
        <div className="p-4 bg-gray-700 text-white flex">
            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">About Us</h2>
                <p className="text-sm">Email: info@example.com</p>
                <p className="text-sm">Phone: +123 456 7890</p>
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Quick Links</h2>
                <ul className="space-y-1">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Services</a></li>
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Follow Us</h2>
                <div className="flex flex-col space-x-4">
                    <a href="#" className="hover:underline">Facebook</a>
                    <a href="#" className="hover:underline">Twitter</a>
                    <a href="#" className="hover:underline">Instagram</a>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer;