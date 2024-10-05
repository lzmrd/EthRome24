import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface YouTubeStyleVideoPlayerProps {
    videoUrl: string;
}

export default function YouTubeStyleVideoPlayer({ videoUrl }: YouTubeStyleVideoPlayerProps) {
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [player, setPlayer] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isApiReady, setIsApiReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                setIsApiReady(true);
            };
        }
    }, []);

    useEffect(() => {
        if (isApiReady) {
            const videoId = new URL(videoUrl).searchParams.get("v");
            const newPlayer = new window.YT.Player("youtube-player", {
                height: "100%",
                width: "100%",
                videoId: videoId || "",
                playerVars: {
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    enablejsapi: 1,
                    fs: 0,
                },
                events: {
                    onReady: (event: any) => {
                        setPlayer(event.target);
                        const videoDuration = event.target.getDuration();
                        setDuration(videoDuration);
                        setIsLoading(false);
                        const intervalId = setInterval(() => {
                            const currentTime = event.target.getCurrentTime();
                            setCurrentTime(currentTime);
                            setProgress((currentTime / videoDuration) * 100);
                        }, 1000);
                        setUpdateProgressInterval(intervalId);
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                            if (updateProgressInterval) clearInterval(updateProgressInterval);
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            setShowModal(true);
                            setIsPlaying(false);
                            if (updateProgressInterval) clearInterval(updateProgressInterval);
                        } else {
                            setIsPlaying(false);
                            if (updateProgressInterval) clearInterval(updateProgressInterval);
                        }
                    },
                },
            });
        }

        return () => {
            if (updateProgressInterval) clearInterval(updateProgressInterval);
        };
    }, [isApiReady, videoUrl]);

    const handlePlayPause = () => {
        if (player) {
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (showModal) return;
        const { clientWidth } = e.currentTarget;
        const offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
        const newProgress = Math.round((offsetX / clientWidth) * 100);
        const newTime = (newProgress / 100) * duration;
        setProgress(newProgress);
        if (player) {
            player.seekTo(newTime, true);
        }
    };

    const handleVolumeToggle = () => {
        setVolume((prev) => (prev === 0 ? 1 : 0));
        if (player) {
            player.setVolume(volume === 0 ? 100 : 0);
        }
    };

    const handleRestartVideo = () => {
        if (player) {
            player.seekTo(0, true);
            player.playVideo();
            setShowModal(false);
            setProgress(0);
            setCurrentTime(0);
            setIsPlaying(true);
        }
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    };

    return (
        <div className="w-full bg-gray-200 border rounded-lg shadow-lg relative">
            {isLoading && (
                <div className="h-[400px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
            )}
            <div
                id="youtube-player"
                className={`h-[400px] w-full relative ${isLoading ? "hidden" : "block"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            ></div>

            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                        onClick={handlePlayPause}
                        className="btn btn-primary p-4 rounded-full shadow-lg bg-white opacity-75 hover:opacity-100 transition pointer-events-auto"
                    >
                        {isPlaying ? <FaPause className="text-black" /> : <FaPlay className="text-black" />}
                    </button>
                </div>
            )}

            <div
                className={`h-4 bg-gray-300 rounded-full mt-2 cursor-pointer ${showModal ? 'opacity-50' : ''}`}
                onClick={handleProgressClick}
            >
                <div
                    className="h-full bg-blue-500 transition-all duration-150 ease-in-out"
                    style={{ width: `${progress}%`, opacity: showModal ? 0.5 : 1 }}
                ></div>
            </div>

            <div className="mt-2 flex items-center justify-between px-4">
                <div className="text-gray-600">
                    {isLoading ? "Loading..." : `${formatTime(currentTime)} / ${formatTime(duration)}`}
                </div>

                <button
                    onClick={handleVolumeToggle}
                    className="p-2 rounded-full shadow-lg"
                >
                    {volume === 0 ? <FaVolumeMute className="text-gray-600" /> : <FaVolumeUp className="text-gray-600" />}
                </button>
            </div>

            {showModal && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold">Congratulations</h2>
                        <button
                            onClick={handleRestartVideo}
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                        >
                            Restart Video
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
