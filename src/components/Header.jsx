import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Search, Menu } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-inner">
                <Link to="/" className="logo">
                    葬儀コンシェル
                </Link>

                <nav className="nav-links">
                    <Link to="/" className="nav-item">ホーム</Link>
                    <Link to="/search" className="nav-item">葬儀場を探す</Link>
                    <Link to="/about" className="nav-item">初めての方へ</Link>
                    <Link to="/faq" className="nav-item">よくある質問</Link>
                </nav>

                <div className="header-right">
                    <a href="tel:0120-000-000" className="tel-link">
                        <span className="tel-label">24時間365日受付</span>
                        <span className="tel-number"><Phone size={18} fill="currentColor" /> 0120-000-000</span>
                    </a>
                    <Link to="/inquiry" className="btn btn-accent">
                        資料請求・相談
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
