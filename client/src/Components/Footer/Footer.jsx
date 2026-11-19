const Footer = () => {
    return (
      <footer className="mt-auto border-t border-gray-200 bg-white px-4 py-5 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BookShelf. All rights reserved.
        </p>
      </footer>
    );
  };

  export default Footer;