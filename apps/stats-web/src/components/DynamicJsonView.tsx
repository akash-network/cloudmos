import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import Spinner from "./Spinner";

const _DynamicReactJson = dynamic(() => import("@textea/json-viewer").then(module => module.JsonViewer), {
  ssr: false,
  loading: () => (
    <div className="text-muted-foreground flex items-center text-sm">
      Loading... <Spinner size="small" className="ml-2" />
    </div>
  )
});

type Props = {
  src: object;
  collapsed?: number;
};

export const DynamicReactJson: React.FunctionComponent<Props> = ({ src, collapsed = 5 }) => {
  const { resolvedTheme } = useTheme();
  return <_DynamicReactJson value={src} theme={resolvedTheme === "dark" ? "dark" : "light"} defaultInspectDepth={collapsed} />;
};
