import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Star, Truck, PhoneCall, Clock, FileText, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="container py-xl">
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="section-title">お葬式がはじめての方へ</h1>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                    突然のお別れに、何をどうすれば良いかわからない。<br />
                    「葬儀コンシェル」は、そんな不安を抱える方に寄り添い、<br />
                    安心・納得のお葬式選びをサポートするポータルサイトです。
                </p>
            </div>

            {/* Concern 1: Cost */}
            <section style={{ marginBottom: '5rem' }}>
                <div className="card" style={{ padding: '3rem', backgroundColor: '#f8fafc', border: 'none' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'inline-block', borderBottom: '3px solid var(--color-accent)' }}>
                            結局いくら必要になるの？
                        </h2>
                        <p style={{ marginBottom: '2rem', textAlign: 'left' }}>
                            「見積もりより高くなった」「不透明な追加費用が怖い」...<br />
                            そんな葬儀業界の常識を変えるため、葬儀コンシェルでは<strong>「総額費用の明示」</strong>を徹底しています。
                            お布施や飲食費など、変動する可能性のある費用についても事前に目安をご案内します。
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>定額プラン</div>
                                <p>必要な物品・サービスが全て含まれたセットプランをご提示します。</p>
                            </div>
                            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>追加費用の説明</div>
                                <p>ドライアイスの日数追加など、条件によって発生する費用も事前に説明します。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Concern 2: Choosing a Funeral Home */}
            <section style={{ marginBottom: '5rem', maxWidth: '1000px', margin: '0 auto 5rem' }}>
                <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
                    失敗しない「葬儀場選び」のポイント
                </h2>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Point 1 */}
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={28} /> Point 1. 交通アクセスの良さ
                            </h3>
                            <p style={{ lineHeight: '1.7' }}>
                                ご高齢の参列者が多い場合、駅からの距離や駐車場の有無は非常に重要です。
                                また、ご自宅や安置場所（病院など）からの移動距離が短いと、体力的・金銭的負担（搬送費用）も軽減できます。
                            </p>
                        </div>
                        <div style={{ flex: 1, height: '200px', background: '#eaeaea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            交通アクセスのイメージ
                        </div>
                    </div>

                    {/* Point 2 */}
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={28} /> Point 2. 利用者の口コミ・評価
                            </h3>
                            <p style={{ lineHeight: '1.7' }}>
                                「スタッフの対応が丁寧だったか」「設備は清潔だったか」など、実際に利用した方の声は最大の判断材料です。
                                葬儀コンシェルでは、忖度のないリアルな口コミを掲載しています。
                            </p>
                        </div>
                        <div style={{ flex: 1, height: '200px', background: '#eaeaea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            口コミ・評価のイメージ
                        </div>
                    </div>

                    {/* Point 3 */}
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={28} /> Point 3. 設備の充実度
                            </h3>
                            <p style={{ lineHeight: '1.7' }}>
                                「遠方の親族が泊まれる宿泊設備はあるか」「バリアフリー対応か」「安置室での面会は可能か」など、
                                具体的な要望に対応できるか確認しましょう。
                            </p>
                        </div>
                        <div style={{ flex: 1, height: '200px', background: '#eaeaea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            設備・バリアフリーのイメージ
                        </div>
                    </div>
                </div>
            </section>

            {/* Concern 3: Flow */}
            <section style={{ backgroundColor: 'var(--color-bg-primary)', padding: '4rem 2rem', borderRadius: '16px', color: '#fff', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>万が一の時のご利用の流れ</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <PhoneCall size={32} color="var(--color-primary)" />
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>1. お電話</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>24時間365日対応。まずはご連絡ください。</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Truck size={32} color="var(--color-primary)" />
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>2. お迎え</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>最短1時間でお迎えにあがります。</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Heart size={32} color="var(--color-primary)" />
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>3. ご安置</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>ご自宅または専用施設にて安置します。</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <FileText size={32} color="var(--color-primary)" />
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>4. 打ち合わせ</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>プランや日程の詳細を決定します。</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Clock size={32} color="var(--color-primary)" />
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>5. お葬式</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>あたたかなお別れの時を過ごします。</p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                        ご相談・お見積りは無料です。<br />
                        まずは近くの葬儀場を探してみましょう。
                    </p>
                    <Link to="/search" className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '1rem 3rem', background: '#fff', color: 'var(--color-primary)' }}>
                        葬儀場を探す
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
