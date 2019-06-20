import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useRouter, Router } from '../.';

const routes = {
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
};

const App = () => (
  <Router routes={routes}>
    <Root />
  </Router>
);

const Gallery = () => {
  const { params } = useRouter();
  return <div>Browsing picture {params.imageId}</div>;
};

const Root = () => {
  const {goTo, isRoute} = useRouter();

  return (
    <div>
      <div>
        <button onClick={() => goTo(routes.home)}>go home</button>
        <button onClick={() => goTo(routes.about)}>go to about</button>
        <button onClick={() => goTo(routes.gallery, { imageId: 1 })}>
          go to picture 1
        </button>
        <button onClick={() => goTo(routes.gallery, { imageId: 2 })}>
          go to picture 2
        </button>
        <button onClick={() => goTo(routes.gallery, { imageId: 3 })}>
          go to picture 3
        </button>
      </div>

      <br/>

      {isRoute(routes.home) && <div>Welcome home</div>}
      {isRoute(routes.about) && <div>About us</div>}
      {isRoute(routes.gallery) && <Gallery />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
