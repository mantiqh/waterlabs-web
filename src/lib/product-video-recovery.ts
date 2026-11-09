export interface VideoRecoveryState {
  source: string;
  attempted: boolean;
  resumeTime?: number;
}

type RecoveryVideo = Pick<
  HTMLVideoElement,
  | 'addEventListener'
  | 'removeEventListener'
  | 'getAttribute'
  | 'buffered'
  | 'currentTime'
  | 'duration'
  | 'readyState'
  | 'error'
  | 'load'
>;

/** Watch only pending playback, retaining one retry budget across effect changes. */
export function watchVideoRecovery(
  video: RecoveryVideo,
  {
    state,
    canRecover,
    onRecover,
  }: {
    state: VideoRecoveryState;
    canRecover: () => boolean;
    onRecover: () => void;
  },
) {
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let waiting = false;
  let lastTime = video.currentTime;
  let lastBuffer = 0;
  let lastProgress = 0;
  let watchedSource = '';

  const bufferedSeconds = () => {
    let seconds = 0;
    for (let i = 0; i < video.buffered.length; i += 1) {
      seconds += video.buffered.end(i) - video.buffered.start(i);
    }
    return seconds;
  };
  const cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  const eligible = () =>
    !disposed &&
    !state.attempted &&
    !!state.source &&
    state.source === video.getAttribute('src') &&
    canRecover();
  const restorePosition = () => {
    if (
      disposed ||
      !canRecover() ||
      state.source !== video.getAttribute('src') ||
      state.resumeTime === undefined ||
      video.readyState < 1
    )
      return;
    video.currentTime = Math.max(
      0,
      Math.min(
        state.resumeTime,
        Number.isFinite(video.duration) ? video.duration : state.resumeTime,
      ),
    );
    state.resumeTime = undefined;
  };
  const captureProgress = () => {
    const seconds = bufferedSeconds();
    if (Math.abs(video.currentTime - lastTime) > 0.01 || seconds > lastBuffer + 0.01) {
      lastProgress = performance.now();
    }
    lastTime = video.currentTime;
    lastBuffer = seconds;
  };
  const tick = () => {
    timer = undefined;
    if (!eligible()) return;
    if (watchedSource !== state.source) {
      sync();
      return;
    }
    captureProgress();
    const delay = video.error ? 1000 : 8000;
    if (performance.now() - lastProgress >= delay) {
      state.attempted = true;
      state.resumeTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
      onRecover();
      video.load();
      return;
    }
    timer = setTimeout(tick, 250);
  };
  const sync = () => {
    restorePosition();
    if (!eligible() || (!waiting && video.readyState >= 3 && !video.error)) {
      cancel();
      return;
    }
    if (timer !== undefined) return;
    watchedSource = state.source;
    lastTime = video.currentTime;
    lastBuffer = bufferedSeconds();
    lastProgress = performance.now();
    timer = setTimeout(tick, 250);
  };
  const onWaiting = () => {
    waiting = true;
    sync();
  };
  const onPlaying = () => {
    waiting = false;
    cancel();
  };
  const onEmptied = () => {
    waiting = false;
    cancel();
  };
  const onProgress = () => {
    if (timer !== undefined) captureProgress();
  };

  video.addEventListener('waiting', onWaiting);
  video.addEventListener('stalled', sync);
  video.addEventListener('error', sync);
  video.addEventListener('playing', onPlaying);
  video.addEventListener('emptied', onEmptied);
  video.addEventListener('loadedmetadata', restorePosition);
  video.addEventListener('progress', onProgress);
  video.addEventListener('timeupdate', onProgress);
  sync();

  return {
    sync,
    dispose() {
      disposed = true;
      cancel();
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('stalled', sync);
      video.removeEventListener('error', sync);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('emptied', onEmptied);
      video.removeEventListener('loadedmetadata', restorePosition);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('timeupdate', onProgress);
    },
  };
}
