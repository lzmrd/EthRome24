// global.d.ts

declare global {
    interface Window {
      onYouTubeIframeAPIReady: () => void;
      YT: {
        Player: {
          new (elementId: string, options: any): {
            playVideo: () => void;
            pauseVideo: () => void;
            getDuration: () => number;
            getCurrentTime: () => number;
            seekTo: (time: number, stop: boolean) => void;
            setVolume: (volume: number) => void;
            addEventListener: (event: string, callback: (event: any) => void) => void; // Aggiunta di addEventListener
          };
        };
        PlayerState: {
          UNSTARTED: number;
          ENDED: number;
          PLAYING: number;
          PAUSED: number;
          BUFFERING: number;
          CUED: number;
        };
        // Altri membri dell'API che potresti voler definire
      };
    }
  }
  
  export {};
  