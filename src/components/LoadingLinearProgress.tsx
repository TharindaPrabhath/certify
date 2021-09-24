import { LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ReducerType } from "../redux/store";

const LoadingLinearProgress = () => {
  const loading = useSelector(
    (state: ReducerType) => state.loadingReducer.loading
  );

  return <LinearProgress variant="indeterminate" hidden={!loading} />;
};

export default LoadingLinearProgress;
