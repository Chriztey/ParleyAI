// types/webgazer.d.ts
declare module 'webgazer' {
  interface GazeData {
    x: number;
    y: number;
  }

  interface WebGazer {
    setGazeListener(callback: (data: GazeData | null, timestamp: number) => void): WebGazer;
    begin(): Promise<void>;
    end(): void;
    pause(): WebGazer;
    resume(): WebGazer;
    isReady(): boolean;
    showPredictionPoints(show: boolean): WebGazer;
    showFaceOverlay(show: boolean): WebGazer;
    showFaceFeedbackBox(show: boolean): WebGazer;
    saveDataAcrossSessions(save: boolean): WebGazer;
    setRegression(regression: string): WebGazer;
    setTracker(tracker: string): WebGazer;
    setGazeRegression(regression: string): WebGazer;
    getCurrentPrediction(): GazeData | null;
    addMouseEventListeners(): void;
    removeMouseEventListeners(): void;
  }

  const webgazer: WebGazer;
  export default webgazer;
}