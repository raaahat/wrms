import React from 'react';

const UpdatePage = async () => {
  const steps: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  } = {
    step1: true,
    step2: true,
    step3: false,
    step4: true,
  };

  return (
    <div>
      {steps.step1 && <div>Step 1</div>}
      {steps.step2 && <div>Step 2</div>}
      {steps.step3 && <div>Step 3</div>}
      {steps.step4 && <div>Step 4</div>}
    </div>
  );
};

export default UpdatePage;
