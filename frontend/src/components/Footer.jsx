import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glass">
        <div className="footer-brand">
          <h2>SafeRent</h2>
          <p>Find safe, verified and trusted rental properties.</p>
        </div>

        <div className="footer-socials">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            📸
          </a>

          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            🎵
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            📘
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            ▶️
          </a>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SafeRent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
