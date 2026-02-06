import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';

import AdminDashboard from './pages/admin/AdminDashboard';
import CompaniesList from './pages/admin/CompaniesList';
import CompanyEdit from './pages/admin/CompanyEdit';
import HomesList from './pages/admin/HomesList';
import HomeEdit from './pages/admin/HomeEdit';
import CsvImport from './pages/admin/CsvImport';
import FAQ from './pages/FAQ';
import About from './pages/About';
import About from './pages/About';
import Company from './pages/Company';
import Inquiry from './pages/Inquiry';

import SearchArea from './pages/search/SearchArea';
import SearchResult from './pages/search/SearchResult';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<div className="container py-xl"><h2>検索結果ページ（準備中）</h2></div>} />
          <Route path="/search/area/:pref_slug" element={<SearchArea />} />
          <Route path="/search/result" element={<SearchResult />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/company" element={<Company />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/inquiry" element={<Inquiry />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<CompaniesList />} />
          <Route path="/admin/companies/:id" element={<CompanyEdit />} />
          <Route path="/admin/homes" element={<HomesList />} />
          <Route path="/admin/homes/:id" element={<HomeEdit />} />
          <Route path="/admin/import" element={<CsvImport />} />

          <Route path="*" element={<div className="container py-xl"><h2>ページが見つかりません</h2></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
