import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";
import { store } from './store';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppWrapper>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </AppWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
