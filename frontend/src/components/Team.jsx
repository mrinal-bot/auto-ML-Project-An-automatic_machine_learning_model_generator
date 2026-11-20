import React from 'react';
import { Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: 'Puskar Paul',
    initials: 'PP',
    role: 'Lead Architect & ML Lead',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.'
  },
  {
    name: 'Mrinal Chandra Dey',
    initials: 'MD',
    role: 'Agent Systems Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.'
  },
  {
    name: 'Rohit Kumar Mondal',
    initials: 'RM',
    role: 'AutoML & Pipelines Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.'
  },
  {
    name: 'Rohan Jana',
    initials: 'RJ',
    role: 'Backend & Systems Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.'
  },
  {
    name: 'Madhuparna Adhikary',
    initials: 'MA',
    role: 'Frontend & UI/UX Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.'
  }
];

export default function Team() {
  return (
    <section id="team" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Innovators & Builders</span>
          </div>
          <h2 className="section-title">
            Meet the Team Behind <span className="text-gradient">MLForge AI</span>
          </h2>
          <p className="section-subtitle">
            The engineering minds researching and developing our agentic autonomous AutoML architecture.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card team-card">
              <div className="avatar-wrapper">
                <div className="avatar-img-placeholder">
                  <span>{member.initials}</span>
                </div>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <div className="member-role">{member.role}</div>
              <p className="member-desc">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

