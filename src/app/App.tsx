import { RouterProvider } from 'react-router';
import router from '../main.routes';
import '../i18n';
import { useDirection } from '../i18n/useDirection';

function App() {

  return (
    <>
      {/* Apply direction on language changes */}
      {useDirection()}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
