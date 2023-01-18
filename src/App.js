import { ApolloProvider } from "@apollo/client";
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { apolloClient } from "./lensQueries/apollo-client";
import { publicRoutes } from './routes/routes';




function App() {
  return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Suspense fallback={<p>loading..........</p>}>
            <Routes>
              {
                publicRoutes.map(({Component,path}) => (Component && <Route path={path} element={<Component />} key={path} />))
              }
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
