
import { useMemo } from "react";
import { BaseGrid } from "./BaseGrid";
import { useGridLayers } from "./hooks/useGridLayers";

export function LayerGrid({ classes, config, layers }: any) {
    const { RenderCellAtPoint } = useGridLayers({ config, layers });

    return useMemo(() => (
        <BaseGrid classes={classes} config={config} inflateCell={(key: string, cell: any) => {
            if (config) return RenderCellAtPoint(key, cell.point);
        }}></BaseGrid>
    ), [RenderCellAtPoint, classes, config]);
}