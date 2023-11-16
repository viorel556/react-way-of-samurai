import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM, {createRoot} from "react-dom/client";
import SamuraiJSApp from "./App";

test('renders without crashing', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<SamuraiJSApp tab="home" />);
  root.unmount();
});


// OLD SHITTY CODE:
// // test('renders learn react link', () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });
// //
// test('renders without crashing', () => {
//     // creating a div by itself. DOM element:
//   const div = document.createElement('div');
//     // adding into the div the <App /> component for testing:
//   ReactDOM.render(<SamuraiJSApp />, div);
//     // unmounting; cleaning, after testing is done:
//   ReactDOM.unmountComponentAtNode(div);
// });
//

