import React from 'react';
import { Network, Zap, ShieldCheck } from 'lucide-react';

const infoCards = [
  {
    id: 1,
    title: 'Why Agentic AI?',
    icon: Network,
    variant: 'standard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
    highlights: [
      'Decomposed task complexity',
      'Collaborative verification loops',
      'Context-aware self-correction'
    ]
  },
  {
    id: 2,
    title: 'Autonomous Machine Learning',
    icon: Zap,
    variant: 'highlight',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia.',
    highlights: [
      'Zero manual boilerplate',
      'Intelligent model selection',
      'Hyperparameter space optimization'
    ]
  },
  {
    id: 3,
    title: 'Intelligent Automation',
    icon: ShieldCheck,
    variant: 'accent',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.',
    highlights: [
      'Reproducible Python artifacts',
      'Comprehensive audit trails',
      'Production-ready deployments'
    ]
  }
];

export default function InfoCards() {
  return (
    <section className="section-padding" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="infocards-grid">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`glass-card info-card ${card.variant === 'highlight' ? 'highlight' : ''} ${card.variant === 'accent' ? 'accent' : ''}`}
              >
                <div className="info-icon">
                  <Icon size={24} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul className="info-card-list">
                  {card.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="info-bullet"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

