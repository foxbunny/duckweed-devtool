/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./graph.styl");

import * as duckweed from "duckweed";

import {HistoryItem} from ".";

interface Segment {
  duration: number;
  created: number;
  relSize: number;
}

interface ColorizedSegment extends Segment {
  color: string;
}

const CHART_COLORS = [
  "#4f9c05",
  "#b5329b",
  "#dd8400",
  "#00a180",
  "#c30000",
  "#eeb600",
];

const colorizeData = (data: Segment[]): ColorizedSegment[] =>
  data.map((item, index) => ({
    ...item,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

// View

interface Props {
  history: HistoryItem[];
  jumpTo: (index: number) => void;
}

const segmentView = (jumpTo: (index: number) => void) => (segment: ColorizedSegment, index: number) => {
  return (
    <div
      key={segment.created}
      class={css.segment}
      style={{
        background: segment.color,
        width: segment.relSize < 0.05 ? "4px" : `${segment.relSize * 100}%`,
      }}
      on-click={jumpTo(index)}
    >
      <div class={css.segmentTip}>
        {segment.duration} ms
      </div>
    </div>
  );
};

const view = ({history, jumpTo}: Props) => {
  const totalTime = history.reduce((t, h) => t + h.duration, 0);

  if (totalTime === 0) {
    // We're just beginning, so there is nothing to show
    return (
      <div class={css.note}>
        There is not enough data for a chart
      </div>
    );
  }

  const segmentDurations: ColorizedSegment[] = colorizeData(history.map((h) => ({
    created: h.start,
    duration: h.duration,
    relSize: h.duration / totalTime,
  })));
  return (
    <div class={css.graph}>
      {segmentDurations.map(segmentView(jumpTo))}
    </div>
  );
};

export {
  Props,
  view,
};
