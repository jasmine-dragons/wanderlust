import axios from 'axios';
import { useState } from 'react';

const CohereTestPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const postPrompt = async () => {
    setLoading(true);
    const res = await axios.post('/api/cohere', {
      prompt,
    });
    setLoading(false);
    setResponse(res.data[0]);
  };

  return (
    <div
      onKeyPress={e => {
        if (e.key === 'Enter') {
          postPrompt();
        }
      }}
    >
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />

      <button onClick={() => postPrompt()}>Generate</button>
      <h1>Status: {loading ? 'Loading' : 'Done'}</h1>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {response}
      </pre>
    </div>
  );
};

export default CohereTestPage;
