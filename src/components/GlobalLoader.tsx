import useUserQuery from "hooks/queries/useUserQuery";
import * as React from "react";

interface IGlobalLoaderProps {
  children: React.ReactNode;
}

// component that wait for some global fundamental data to load
const GlobalLoader: React.FunctionComponent<IGlobalLoaderProps> = ({
  children,
}) => {
  const userQuery = useUserQuery();

  if (userQuery.isLoading) {
    return <div>loading...</div>;
  }

  return <>{children}</>;
};

export default GlobalLoader;
