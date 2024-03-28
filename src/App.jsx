import Home from "./pages/home";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./pages/signup";

import { AnimatePresence } from "framer-motion";
import Post from "./pages/post";
import Header from "./pages/components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header key="header" />
        <AnimatePresence mode="wait">
          <Routes>
            <Route key="home" exact path="/" element={<Home />} />
            <Route key="signup" path="/signup" element={<Signup />} />
            <Route key="post" path="/:id" element={<Post />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
