import "./Footer.css"
export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="contact-info">
          <h3>CONTACT INFO</h3>
          <p className="address">Mailing Address:</p>
          <p>PO Box 168</p>
          <p>Yellowstone National Park, WY 82910-0168</p>
          <p className="phone">Phone:</p>
          <p>307-344-7381</p>
        </div>
        <div className="stay-connected">
          <h3>STAY CONNECTED</h3>
          <p>
            <a href="https://www.facebook.com/YellowstoneNPS" target="_blank">
              <i className="fab fa-facebook"></i>
            </a>
            Facebook
          </p>
          <p>
            <a href="https://www.instagram.com/yellowstonenps/" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            Instagram
          </p>
          <p>
            <a href="https://twitter.com/YellowstoneNPS" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            Twitter
          </p>
          <p>
            <a
              href="https://www.youtube.com/user/YellowstoneNPS"
              target="_blank"
            >
              <i className="fab fa-youtube"></i>
            </a>
            YouTube
          </p>
        </div>
      </div>
    </footer>
  );
}
