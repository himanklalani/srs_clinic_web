'use client';

import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { X, Volume2, VolumeX, FastForward } from 'lucide-react';
import LazyVideo from '@/components/ui/LazyVideo';

export interface ZoomMedia {
	type?: 'image' | 'video';
	src: string;
	alt?: string;
	objectPosition?: string;
}

interface ZoomParallaxProps {
	/** Array of images/videos to be displayed in the parallax effect max 7 items */
	images: ZoomMedia[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
	const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getLayoutClasses = (index: number) => {
    switch (index) {
      case 0: return '[&>div]:h-[18vh] [&>div]:w-[44vw] md:[&>div]:h-[25vh] md:[&>div]:w-[25vw]';
      case 1: return '[&>div]:-top-[18vh] [&>div]:left-[0vw] [&>div]:h-[14vh] [&>div]:w-[44vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]';
      case 2: return '[&>div]:-top-[10vh] [&>div]:-left-[35vw] [&>div]:h-[13vh] [&>div]:w-[22vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]';
      case 3: return '[&>div]:top-[18vh] [&>div]:-left-[13vw] [&>div]:h-[14vh] [&>div]:w-[24vw] md:[&>div]:!top-[2vh] md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]';
      case 4: return '[&>div]:top-[0vh] [&>div]:left-[35vw] [&>div]:h-[28vh] [&>div]:w-[22vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]';
      case 5: return '[&>div]:top-[5vh] [&>div]:-left-[35vw] [&>div]:h-[13vh] [&>div]:w-[22vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]';
      case 6: return '[&>div]:top-[18vh] [&>div]:left-[11vw] [&>div]:h-[14vh] [&>div]:w-[20vw] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]';
      default: return '';
    }
  };

	return (
		<div ref={container} className="relative h-[150vh] md:h-[300vh] bg-[#faf8f5]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ type = 'image', src, alt, objectPosition = 'object-center' }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none ${getLayoutClasses(index)}`}
						>
							<div 
                                className={`relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto ${type === 'video' ? 'cursor-pointer' : ''}`}
                                onClick={() => type === 'video' && setSelectedVideo(src)}
                            >
                                {type === 'video' ? (
                                    <>
                                        <LazyVideo
                                            src={src}
                                            objectPosition={objectPosition}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity hidden md:flex items-center justify-center z-10">
                                            <div className="bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg">
                                                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <ImageWithLQIP
                                        src={src}
                                        alt={alt || `Parallax media ${index + 1}`}
                                        objectPosition={objectPosition}
                                        eager={index === 0}
                                    />
                                )}
							</div>
						</motion.div>
					);
				})}
			</div>

            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal src={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
		</div>
	);
}

function VideoModal({ src, onClose }: { src: string, onClose: () => void }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [speed, setSpeed] = useState(1);
	const [isMuted, setIsMuted] = useState(false);

	const cycleSpeed = () => {
		const nextSpeed = speed === 1 ? 2 : speed === 2 ? 0.5 : 1;
		setSpeed(nextSpeed);
		if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted;
			setIsMuted(videoRef.current.muted);
		}
	};

	return (
		<motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8" 
            onClick={onClose}
        >
			<motion.div 
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10" 
               onClick={(e) => e.stopPropagation()}
            >
				<video
					ref={videoRef}
					src={src}
					autoPlay
					playsInline
					controls
					className="w-full h-auto max-h-[85vh] object-contain outline-none"
					onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? false)}
				/>
				<div className="absolute top-4 right-4 flex gap-2 z-10 transition-opacity">
					<button 
                        onClick={toggleMute} 
                        className="bg-black/60 hover:bg-black/80 text-white p-2 md:px-4 md:py-2 rounded-full md:rounded-lg backdrop-blur-md flex items-center gap-2 transition-colors border border-white/10"
                    >
						{isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
						<span className="hidden md:inline font-medium text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
					</button>
					<button 
                        onClick={cycleSpeed} 
                        className="bg-black/60 hover:bg-black/80 text-white p-2 md:px-4 md:py-2 rounded-full md:rounded-lg backdrop-blur-md flex items-center gap-2 transition-colors border border-white/10"
                    >
						<FastForward className="w-5 h-5" />
						<span className="font-medium text-sm">{speed}x</span>
					</button>
					<button 
                        onClick={onClose} 
                        className="bg-black/60 hover:bg-black/80 text-white p-2 md:px-4 md:py-2 rounded-full md:rounded-lg backdrop-blur-md flex items-center gap-2 transition-colors border border-white/10 text-red-400 hover:text-red-300"
                    >
						<X className="w-5 h-5" />
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

/**
 * ImageWithLQIP — Shows a tiny blurred Cloudinary thumbnail (LQIP) instantly,
 * then smoothly crossfades to the full-resolution image once loaded.
 */
function ImageWithLQIP({ src, alt, objectPosition, eager }: { src: string; alt: string; objectPosition: string; eager?: boolean }) {
	const [loaded, setLoaded] = useState(false);

	// Generate a tiny 20px-wide blurred placeholder from Cloudinary
	const lqipSrc = src.replace('/upload/', '/upload/w_20,q_10,e_blur:500/');

	return (
		<>
			{/* Blurred micro-placeholder — loads instantly (~0.5kb) */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={lqipSrc}
				alt=""
				aria-hidden="true"
				className={`absolute inset-0 w-full h-full object-cover ${objectPosition} transition-opacity duration-700 scale-110 ${loaded ? 'opacity-0' : 'opacity-100'}`}
				style={{ imageRendering: 'auto' }}
			/>
			{/* Full-resolution image — fades in on top */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={src}
				alt={alt}
				loading={eager ? "eager" : "lazy"}
				decoding="async"
				onLoad={() => setLoaded(true)}
				className={`absolute inset-0 w-full h-full object-cover ${objectPosition} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
				style={{ imageRendering: 'auto' }}
			/>
		</>
	);
}
