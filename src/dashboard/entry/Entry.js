import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import "./Entry.css";

const Entry = () => {
  const [entry, setEntry] = useState({
    confluences_used: []
  });

  const confluenceOptions = [
    { name: 'FVG', code: 'FVG' },
    { name: 'CHoCH', code: 'CHoCH' },
    { name: 'Liquidity Sweep', code: 'Liquidity Sweep' },
    { name: 'MSS', code: 'MSS' },
    { name: 'Inverse FVG', code: 'Inverse FVG' },
    { name: 'BOS', code: 'BOS' },
    { name: 'Equilibrium', code: 'Equilibrium' },
    { name: 'Order Block', code: 'Order Block' },
  ];

  return (
    <div className="entry-container">
      <div className="entry-wrapper">
        
        <label className="font-var-2">Confluences Used</label>
        <MultiSelect
          value={entry.confluences_used}
          onChange={(e) => setEntry({ ...entry, confluences_used: e.value })}
          options={confluenceOptions}
          optionLabel="name"
          placeholder="Select Confluences"
          maxSelectedLabels={3}
          className="input-box font-var-2"
        />
      </div>
    </div>
  );
};

export default Entry;
