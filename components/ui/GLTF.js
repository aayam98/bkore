import { useState } from 'react';
import ThreeD from './ThreeD';

export const Gltf = ({ image }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        width: '100%',
        'justify-content': 'center',
        position: 'relative',
        // marginTop: '2rem',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%)',
            zIndex: 9999,
          }}
        >

        </div>
      )}

      <ThreeD
        file3d={image}
      />
    </div>
  );
};
