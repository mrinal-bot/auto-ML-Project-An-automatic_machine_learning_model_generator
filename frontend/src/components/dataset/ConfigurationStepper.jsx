import React from 'react';
import { Check } from 'lucide-react';
import { datasetConfig } from '../../config/datasetConfig';

export default function ConfigurationStepper({ currentStep, onStepClick, maxStepReached }) {
  return (
    <div className="stepper-container">
      <div className="stepper-track">
        {datasetConfig.steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isAccessible = step.number <= maxStepReached;

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isAccessible && onStepClick(step.number)}
                disabled={!isAccessible}
                title={`Go to step ${step.number}: ${step.title}`}
              >
                <div className="step-circle">
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.number}
                </div>
                <div className="step-label-group">
                  <div className="step-num-text">Step 0{step.number}</div>
                  <div className="step-title-text">{step.short}</div>
                </div>
              </button>

              {idx < datasetConfig.steps.length - 1 && (
                <div className={`stepper-line ${step.number < currentStep ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

