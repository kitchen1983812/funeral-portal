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
          <Route path="/inquiry" element={<div className="container py-xl"><h2>お問い合わせ（準備中）</h2></div>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<CompaniesList />} />
          <Route path="/admin/companies/:id" element={<CompanyEdit />} />
          <Route path="/admin/homes" element={<HomesList />} />
          <Route path="/admin/homes/:id" element={<HomeEdit />} />

          <Route path="*" element={<div className="container py-xl"><h2>ページが見つかりません</h2></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
