import "./App.css";
import Template from "./template";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailPage from "./detailPage";

function App() {
  // useEffect(() => {
  //   Test();
  // }, []);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Template />} />
          <Route exact path="/detail" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Template /> */}
    </>
  );
}

export default App;
