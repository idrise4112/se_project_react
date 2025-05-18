import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Idris Ellams</p>
      <h1 className="footer__year">{new Date().getFullYear()}</h1>
    </footer>
  );
}

export default Footer;
