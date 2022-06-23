import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import mapInternalNameToOuternal from "./mapInternalNameToOuternal";

function Body() {
  const location = useLocation();
  let data = location.state.data[0];
  console.log(data);

  const Info = (para) => {
    return (
      <Typography variant="h6" align="left" color="text.secondary" paragraph>
        {para}
      </Typography>
    );
  };
  return (
    <>
      {Object.keys(data).map((u) => {
        const res = `${mapInternalNameToOuternal[u]}: ${data[u]}`;
        return Info(res);
      })}
      {/* <h1>{JSON.stringify(data, null, 10)}</h1> */}
    </>
  );
}
export default Body;
