import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import '../styles/Detail.css'; // Reusing some styles

const FAQ = () => {
    const faqData = [
        {
            category: '全般的な質問',
            items: [
                {
                    q: '葬儀コンシェルとは何ですか？',
                    a: '「葬儀コンシェル」は、現代のニーズに合わせた葬儀サービスを検索・比較できるポータルサイトです。全国の葬儀場情報や、家族葬・一日葬などのプランを掲載しており、お客様に最適な葬儀社をご案内します。'
                },
                {
                    q: 'いくらから葬儀が行えますか？',
                    a: '掲載プランの中には、99,000円（税込）〜ご利用いただける直葬・火葬式プランなどもございます。ご希望のエリアや形式に合わせて検索いただけます。'
                },
                {
                    q: '亡くなった後、まずは何をすべきですか？',
                    a: 'まずは、掲載されている葬儀社または、当サイトの相談窓口（0120-000-000）へお電話ください。葬儀専門スタッフがその後必要な手配（寝台車の手配、安置場所の確保など）をサポートいたします。'
                },
                {
                    q: '自宅で安置できないのですが、どうしたらいいですか？',
                    a: '多くの葬儀社で「お預かり安置」が可能です。ご自宅での安置が難しい場合は、専用の安置施設を持つ葬儀場をご案内いたしますので、その旨をお伝えください。'
                }
            ]
        },
        {
            category: 'お布施・宗教者について',
            items: [
                {
                    q: 'お寺（菩提寺）がないのですが、紹介してもらえますか？',
                    a: 'はい、可能です。主要な宗派（浄土宗、浄土真宗、曹洞宗、日蓮宗、天台宗、真言宗、臨済宗など）の僧侶をご紹介できる葬儀社が多数登録されています。また、檀家になる必要はなく、葬儀・法要ごとの依頼が可能です。'
                },
                {
                    q: 'お布施の金額はどれくらいですか？',
                    a: '紹介寺院の場合、定額のお布施プラン（例：読経＋戒名で〇〇円など）を用意している葬儀社も多いです。菩提寺がある場合は、お寺様と直接ご相談いただく形になりますが、相場のご相談などはサポート窓口でも承ります。'
                }
            ]
        },
        {
            category: 'その他の質問',
            items: [
                {
                    q: '資料請求したことを家族に知られたくないのですが。',
                    a: 'ご安心ください。多くの葬儀社では、社名が入っていない無地の封筒などで資料をお送りする配慮を行っています。資料請求フォームの備考欄などでその旨をご指定いただけます。'
                },
                {
                    q: '急ぎで資料が欲しいのですが。',
                    a: 'お急ぎの場合は、各葬儀社へ直接お電話いただくか、当サイトのサポートデスクへお電話ください。Web上でもデジタルパンフレットを閲覧できる場合がございます。'
                }
            ]
        }
    ];

    const [openIndex, setOpenIndex] = useState({});

    const toggleAccordion = (catIndex, itemIndex) => {
        const key = `${catIndex}-${itemIndex}`;
        setOpenIndex(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="container py-xl">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>FAQ</span>
                    <h1 className="section-title">よくある質問</h1>
                    <p>お客様から多く寄せられるご質問をまとめました。</p>
                </div>

                {faqData.map((category, catIndex) => (
                    <div key={catIndex} style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            borderBottom: '2px solid var(--color-accent)',
                            paddingBottom: '0.5rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <HelpCircle size={24} color="var(--color-accent)" />
                            {category.category}
                        </h2>

                        <div className="faq-list">
                            {category.items.map((item, itemIndex) => {
                                const key = `${catIndex}-${itemIndex}`;
                                const isOpen = openIndex[key];

                                return (
                                    <div key={itemIndex} style={{
                                        marginBottom: '1rem',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        backgroundColor: '#fff'
                                    }}>
                                        <button
                                            onClick={() => toggleAccordion(catIndex, itemIndex)}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '1.25rem',
                                                background: 'none',
                                                border: 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                color: 'var(--color-text)'
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ color: 'var(--color-accent)' }}>Q.</span>
                                                {item.q}
                                            </span>
                                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>

                                        {isOpen && (
                                            <div style={{
                                                padding: '0 1.25rem 1.25rem 1.25rem',
                                                color: '#4a5568',
                                                lineHeight: '1.7',
                                                backgroundColor: '#f8fafc',
                                                borderTop: '1px solid #eee'
                                            }}>
                                                <div style={{ paddingTop: '1rem', display: 'flex', gap: '1rem' }}>
                                                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>A.</span>
                                                    <div>{item.a}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="card" style={{ padding: '2rem', textAlign: 'center', marginTop: '4rem', backgroundColor: 'var(--color-bg-primary)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>解決しない場合はこちら</h3>
                    <p style={{ marginBottom: '2rem' }}>
                        葬儀専門の相談員が、24時間365日いつでも無料でお答えします。<br />
                        どんな些細なことでもお気軽にご相談ください。
                    </p>
                    <a href="tel:0120-000-000" className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        0120-000-000
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
