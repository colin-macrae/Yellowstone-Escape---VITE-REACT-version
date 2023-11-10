
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
            <i className="fab fa-facebook"></i>Facebook
          </p>
          <p>
            <i className="fab fa-instagram"></i>Instagram
          </p>
          <p>
            <i className="fab fa-twitter"></i>Twitter
          </p>
          <p>
            <i className="fab fa-youtube"></i>YouTube
          </p>
        </div>
      </div>
    </footer>
  );
}
