import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (window) {
      if (id) {
        console.log(id);
        window.open(`https://cms.bodykore.com/uploads/${id}`, '_self');
      }
    }
  }, [id]);
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Index;
