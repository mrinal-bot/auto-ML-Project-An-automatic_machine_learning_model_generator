import React from 'react';
import { 
  BarChart3, 
  Binary, 
  Cpu, 
  TerminalSquare, 
  Gauge, 
  FileSpreadsheet,
  ArrowRight,
  Sparkles 
} from 'lucide-react';

const featureList = [
  {
    id: 1,
    title: 'Intelligent Dataset Analysis',
    icon: BarChart3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    tag: 'Profiling Agent'
  },
  {
    id: 2,
    title: 'Automated Data Preprocessing',
    icon: Binary,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna.',
    tag: 'Transformation Engine'
  },
  {
    id: 3,
    title: 'AI-Powered Model Generation',
    icon: Cpu,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada.',
    tag: 'Synthesizer Agent'
  },
  {
    id: 4,
    title: 'Autonomous Code Debugging',
    icon: TerminalSquare,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus scelerisque eleifend donec pretium vulputate sapien nec.',
    tag: 'Self-Healing Engine'
  },
  {
    id: 5,
    title: 'Model Evaluation and Optimization',
    icon: Gauge,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra adipiscing at in tellus integer feugiat scelerisque varius.',
    tag: 'Optimizer Agent'
  },
  {
    id: 6,
    title: 'Automated Report Generation',
    icon: FileSpreadsheet,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi tristique.',
    tag: 'Executive Reporter'
  }
];

export default function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Autonomous Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="text-gradient">End-to-End</span> Precision
          </h2>
          <p className="section-subtitle">
            Explore the specialized modules orchestrated by MLForge AI to turn raw tabular data into validated production-grade machine learning models.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="glass-card feature-card">
                <div className="feature-icon-box">
                  <Icon size={26} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-footer-tag">
                  <span>{feature.tag}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

