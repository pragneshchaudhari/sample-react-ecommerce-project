import { Link } from "react-router-dom";

const Footer = () => {
  const currYear = new Date();
  return (
    <>
      {/* Footer */}
      <div id="footer" className="bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-base/[20px] text-gray-300 my-mx py-6">
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-3 md:space-y-0 items-center mb-2 md:mb-0">
              <span><Link to='/tnc'>T&Cs and Cancellation Policy</Link></span>
              <span className="hidden md:flex">|</span>
              <span><Link to='/privacy-policy'>Privacy Policy</Link></span>
            </div>

            <span>© { currYear.getFullYear() } Silkhaus | All Rights Reserved</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
