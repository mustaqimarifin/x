"use client";
import { useDrag } from "@use-gesture/react";
import { action, autorun, observable, values } from "mobx";
import { observer } from "mobx-react-lite";

import React, { useEffect, useRef, useState } from "react";
import { Pane, panesMobx } from "./AppState";
import { ControlsEyeCrossed } from "@heathmont/moon-icons-tw";

function PaneResizers({
  dimensionsMobx,
}: {
  dimensionsMobx: { width: number; height: number };
}) {
  const bindDrag: any = useDrag<any>(
    action(({ movement, first, args, memo }) => {
      const [direction] = args;
      if (first) {
        return { ...dimensionsMobx };
      }
      if (direction.includes("right")) {
        dimensionsMobx.width = Math.max(memo.width + movement[0], 320);
      }
      if (direction.includes("bottom")) {
        dimensionsMobx.height = Math.max(memo.height + movement[1], 256);
      }
    })
  );

  return (
    <>
      <div
        {...bindDrag("right")}
        className="group absolute bottom-0 right-0 top-0 w-2 cursor-ew-resize touch-none"
      >
        <div className="absolute bottom-0 right-0 top-0 w-px bg-neutral-800 opacity-0 transition group-hover:opacity-20" />
      </div>
      <div
        {...bindDrag("bottom")}
        className="group absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize touch-none"
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-800 opacity-0 transition group-hover:opacity-20" />
      </div>
      <div
        {...bindDrag("bottom-right")}
        className="group absolute bottom-0 right-0 h-3 w-3 cursor-nwse-resize touch-none"
      ></div>
    </>
  );
}

export const PaneComponent = observer(
  ({ pane, children }: { pane: Pane; children: React.ReactNode }) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [dimensionsMobx] = useState(() =>
      observable({
        width: Math.max(Math.min(512, window.innerWidth - 128), 320),
        height: Math.max(Math.min(448, window.innerHeight - 64), 256),
      })
    );
    const [positionMobx] = useState(() =>
      observable([window.innerWidth - dimensionsMobx.width - 32, 32])
    );
    const bindDrag = useDrag(
      action(({ movement, first, last, memo }) => {
        if (first) {
          headerRef.current!.style.cursor = "grabbing";
          return [...positionMobx];
        }
        positionMobx[0] = Math.floor(memo[0] + movement[0]);
        positionMobx[1] = Math.floor(memo[1] + movement[1]);
        if (last) {
          headerRef.current!.style.cursor = "";
        }
      })
    );
    useEffect(
      () =>
        autorun(() => {
          const rootElement = rootRef.current!;
          rootElement.style.transform = `translate(${Math.floor(
            positionMobx[0]
          )}px, ${Math.floor(positionMobx[1])}px)`;
        }),
      []
    );
    useEffect(
      () =>
        autorun(() => {
          const rootElement = rootRef.current!;
          rootElement.style.width = `${dimensionsMobx.width}px`;
          rootElement.style.height = `${dimensionsMobx.height}px`;
          rootElement.style.zIndex = `${pane.z}`;
        }),
      []
    );

    return (
      <div
        onMouseDown={action(() => {
          const existingPanes = values(panesMobx);
          pane.z =
            existingPanes.length > 0
              ? Math.max(...values(panesMobx).map((pane) => pane.z)) + 1
              : 1;
        })}
        className="absolute left-0 top-0 flex flex-col overflow-hidden rounded bg-white shadow-lg dark:bg-neutral-800"
        ref={rootRef}
      >
        <div
          //@ts-ignore

          {...bindDrag()}
          className="flex h-8 flex-shrink-0 cursor-grab touch-none items-center bg-neutral-800 px-2"
          ref={headerRef}
        >
          <button
            onClick={action(() => {
              panesMobx.delete(pane.id);
            })}
            className="text-white opacity-80 hover:opacity-100"
          >
            <ControlsEyeCrossed />
          </button>
        </div>
        <div className="grow overflow-auto text-sm">{children}</div>
        <PaneResizers dimensionsMobx={dimensionsMobx} />
      </div>
    );
  }
);
