import React from 'react';

const Company = () => {
    return (
        <div className="container py-xl">
            <h1 className="section-title">運営会社</h1>

            <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left', width: '30%', backgroundColor: '#f9fafb' }}>会社名</th>
                            <td style={{ padding: '1.5rem' }}>株式会社NET FACTORY (ネットファクトリー)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left', width: '30%', backgroundColor: '#f9fafb' }}>所在地</th>
                            <td style={{ padding: '1.5rem' }}>
                                〒130-0012<br />
                                東京都墨田区太平4丁目1-3 オリナスタワー17階
                            </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left', width: '30%', backgroundColor: '#f9fafb' }}>連絡先</th>
                            <td style={{ padding: '1.5rem' }}>03-6820-5613 (受付時間 10:00〜17:00)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left', width: '30%', backgroundColor: '#f9fafb' }}>事業内容</th>
                            <td style={{ padding: '1.5rem' }}>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                    <li>インターネットによる葬儀サービスの提供</li>
                                    <li>システム開発</li>
                                    <li>サーチエンジンマーケティング</li>
                                    <li>Eコマースの企画・運営</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ padding: '1.5rem', textAlign: 'left', width: '30%', backgroundColor: '#f9fafb' }}>URL</th>
                            <td style={{ padding: '1.5rem' }}>
                                <a href="https://netfactory.jp/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                                    https://netfactory.jp/
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Company;
