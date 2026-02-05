import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2>葬儀コンシェル</h2>
                        <p>
                            大切な人とのお別れを、<br />
                            心安らかに過ごせるように。<br />
                            信頼できる葬儀場探しをサポートします。
                        </p>
                    </div>

                    <div>
                        <h3 className="footer-title">サイトマップ</h3>
                        <ul className="footer-links">
                            <li><Link to="/">ホーム</Link></li>
                            <li><Link to="/search">葬儀場を探す</Link></li>
                            <li><Link to="/about">初めての方へ</Link></li>
                            <li><Link to="/faq">よくある質問</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-title">サポート</h3>
                        <ul className="footer-links">
                            <li><Link to="/inquiry">お問い合わせ</Link></li>
                            <li><Link to="/terms">利用規約</Link></li>
                            <li><Link to="/privacy">プライバシーポリシー</Link></li>
                            <li><Link to="/company">運営会社</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-title">お問い合わせ</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                            お電話でのご相談（24時間対応）<br />
                            <strong style={{ fontSize: '1.25rem', color: '#fff' }}>0120-000-000</strong>
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Funeral Concierge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
