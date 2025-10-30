import React, { useState } from 'react';

const RuleEditor: React.FC = () => {
    const [rule, setRule] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRule(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic to handle rule submission goes here
        console.log('Submitted rule:', rule);
    };

    return (
        <div>
            <h2>Rule Editor</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={rule}
                    onChange={handleChange}
                    placeholder="Define your segment rules here..."
                    rows={10}
                    cols={50}
                />
                <br />
                <button type="submit">Submit Rule</button>
            </form>
        </div>
    );
};

export default RuleEditor;