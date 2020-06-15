import * as React from 'react';

import { useRouter } from '../src/index';

export const routes = {
  home: {
    id: 'home',
    path: '/',
  },
  about: {
    id: 'about',
    path: '/about',
  },
  gallery: {
    id: 'gallery',
    path: '/gallery/:imageId',
  },
  gallery2: {
    id: 'gallery2',
    path: '/gallery2',
  },
};

export const Gallery = () => {
  const { params } = useRouter();
  return <div>Browsing picture {params.imageId}</div>;
};

export const Gallery2 = () => {
  const { queryParams } = useRouter();
  return <div>Browsing picture {queryParams.imageId}</div>;
};

export const Root = () => {
  const { goTo, isRoute } = useRouter();

  return (
    <div>
      <div>
        <button onClick={() => goTo(routes.home)}>go home</button>
        <button onClick={() => goTo(routes.about)}>go to about</button>
        <button onClick={() => goTo(routes.gallery2, {}, { imageId: 1 })}>
          go to picture 1
        </button>
        <button onClick={() => goTo(routes.gallery, { imageId: 2 })}>
          go to picture 2
        </button>
      </div>

      <br />

      {isRoute(routes.home) && <div>Welcome home</div>}
      {isRoute(routes.about) && <div>About us</div>}
      {isRoute(routes.gallery) && <Gallery />}
      {isRoute(routes.gallery2) && <Gallery2 />}
      {}
    </div>
  );
};
