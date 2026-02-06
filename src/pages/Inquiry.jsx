import React, { useState } from 'react';
import { Lock, Phone, Mail, FileText } from 'lucide-react';
import { supabase } from '../supabaseClient'; // Ensure supabase client is imported if we decide to save to DB later

const Inquiry = () => {
    const [formData, setFormData] = useState({
        type: '資料請求', // 資料請求 or お問い合わせ
        name: '',
        tel: '',
        email: '',
        address: '',
        zip: '',
        content: '',
        privacy_agreed: false
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacy_agreed) {
            alert('個人情報の取り扱いに同意してください。');
            return;
        }

        setSubmitting(true);

        // For now, we'll mimic a successful submission. 
        // In a real app, we would insert into a 'inquiries' table or send an email via Edge Function.
        console.log('Submitting inquiry:', formData);

        // Simulate network delay
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="container py-xl" style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', backgroundColor: '#f0fdf4', borderRadius: '12px' }}>
                    <h1 style={{ color: '#166534', marginBottom: '1.5rem' }}>送信が完了しました</h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        お問い合わせ・資料請求ありがとうございます。<br />
                        ご入力いただいた内容を確認の上、担当者よりご連絡させていただきます。<br />
                        資料は約3日以内にお届けいたします。
                    </p>
                    <a href="/" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>トップページへ戻る</a>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-xl">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="section-title">資料請求・お問い合わせ</h1>
                <p>
                    1分で簡単入力。365日24時間受付中です。<br />
                    資料は無料でお届けします。
                </p>
            </div>

            <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
                {/* Urgent Notice */}
                <div style={{ backgroundColor: '#fff7ed', padding: '1.5rem', borderBottom: '1px solid #fed7aa' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#c2410c', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        お急ぎの方へ
                    </h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#431407' }}>
                        ご危篤などで資料をお急ぎの方は、郵送では間に合わない場合がございます。<br />
                        お近くの式場情報やお見積りなどすぐにお答えできますので、下記サポートダイヤルまでお電話でお問合せいただくことをお勧めします。
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                        <Phone size={24} color="#ea580c" />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>0120-000-000</span>
                        <span style={{ fontSize: '0.8rem', backgroundColor: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>24時間通話無料</span>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        {/* Inquiry Type */}
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>お問い合わせ種別 <span className="tag tag-position" style={{ background: '#ef4444' }}>必須</span></label>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="資料請求"
                                        checked={formData.type === '資料請求'}
                                        onChange={handleChange}
                                    />
                                    資料請求
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="その他のお問い合わせ"
                                        checked={formData.type === 'その他のお問い合わせ'}
                                        onChange={handleChange}
                                    />
                                    その他のお問い合わせ
                                </label>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>お名前 <span className="tag tag-position" style={{ background: '#ef4444' }}>必須</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="例：葬儀 太郎"
                                required
                                className="input-field"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Tel */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>電話番号 <span className="tag tag-position" style={{ background: '#ef4444' }}>必須</span></label>
                            <input
                                type="tel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                placeholder="例：090-1234-5678"
                                required
                                className="input-field"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>メールアドレス</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="例：mail@example.com"
                                className="input-field"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Address (Zip + Address) */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>ご住所 <span className="tag tag-position" style={{ background: '#ef4444' }}>必須</span></label>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ padding: '0.5rem', background: '#f3f4f6', borderRadius: '4px' }}>〒</span>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="000-0000"
                                    className="input-field"
                                    style={{ width: '120px' }}
                                />
                                <a href="https://www.post.japanpost.jp/zipcode/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>郵便番号検索</a>
                            </div>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="例：東京都..."
                                required
                                className="input-field"
                                style={{ width: '100%' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>※資料送付のため正確にご入力ください。</p>
                        </div>

                        {/* Content */}
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>ご質問・ご要望</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="ご自由にご記入ください"
                                rows={4}
                                className="input-field"
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        {/* Privacy Policy */}
                        <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Lock size={16} /> 個人情報の取り扱い
                            </h4>
                            <div style={{ fontSize: '0.85rem', color: '#4b5563', maxHeight: '100px', overflowY: 'auto', padding: '0.5rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', marginBottom: '1rem' }}>
                                ご入力いただいた個人情報は、資料の送付およびお問い合わせへの回答のために利用いたします。
                                法令に基づく場合を除き、第三者に提供することはございません。
                                当サイトはSSL暗号化通信に対応しており、情報漏洩の防止に努めています。
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                                <input
                                    type="checkbox"
                                    name="privacy_agreed"
                                    checked={formData.privacy_agreed}
                                    onChange={handleChange}
                                    required
                                />
                                個人情報の取り扱いに同意する
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={submitting}
                        >
                            {submitting ? '送信中...' : (
                                <>
                                    <Mail size={20} /> 入力内容を送信する
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Lock size={14} />
                    <span>当サイトはSSL暗号化通信により、お客様の個人情報を保護しています。</span>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;
