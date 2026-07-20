import { useState } from 'react';

const SKILL_CATEGORIES = [
  { name: 'Frontend',  color: '#E85D26', skills: ['HTML5','CSS3','JavaScript','React','Tailwind CSS'] },
  { name: 'Backend',   color: '#4A9EFF', skills: ['Node.js','Express','MySQL','Supabase'] },
  { name: 'Systems',   color: '#A8E063', skills: ['C Programming','IoT','Embedded Systems'] },
  { name: 'DevOps',    color: '#C9A96E', skills: ['Git','GitHub','Vercel','CI/CD'] },
  { name: 'Security',  color: '#FF6B9D', skills: ['Kali Linux','OSINT','Network Security'] },
];

export default function SkillsSimpleFallback() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '800px', margin: '4rem auto 0', padding: '0 20px' }}>
      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '0.5rem',
        marginBottom: '2rem'
      }}>
        {SKILL_CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(i)}
            style={{
              background: activeTab === i ? 'var(--gold)' : 'rgba(61,43,31,0.5)',
              color: activeTab === i ? 'var(--espresso)' : 'var(--cream)',
              border: `1px solid ${activeTab === i ? 'var(--gold)' : 'rgba(201,169,110,0.2)'}`,
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: activeTab === i ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: activeTab === i ? 'var(--espresso)' : cat.color
            }} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{
        background: 'rgba(20, 15, 10, 0.65)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,169,110,0.15)',
        borderRadius: '24px',
        padding: '2.5rem',
        minHeight: '200px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: 14, height: 14, borderRadius: '50%', 
            background: SKILL_CATEGORIES[activeTab].color,
            boxShadow: `0 0 12px ${SKILL_CATEGORIES[activeTab].color}`
          }} />
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', margin: 0 }}>
            {SKILL_CATEGORIES[activeTab].name}
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {SKILL_CATEGORIES[activeTab].skills.map(skill => (
            <span key={skill} style={{
              background: 'rgba(250,247,242,0.05)',
              border: '1px solid rgba(250,247,242,0.1)',
              color: 'var(--cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
