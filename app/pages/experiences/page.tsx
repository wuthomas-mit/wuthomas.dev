'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import {
  DndContext,
  useDraggable,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import SpotifyPlayer from '../../components/SpotifyPlayer';

interface IconPosition {
  x: number;
  y: number;
}

interface DraggableIconProps {
  id: string;
  position: IconPosition;
  onDoubleClick: () => void;
  children: React.ReactNode;
  isDragging?: boolean;
}

function DraggableIcon({ id, position, onDoubleClick, children, isDragging = false }: DraggableIconProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const clickTimeRef = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - clickTimeRef.current < 300) {
      // Double click detected
      onDoubleClick();
    }
    clickTimeRef.current = now;
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${position.x}%`,
    top: `${position.y}%`,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="absolute z-20 cursor-pointer select-none"
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showSpotifyBox, setShowSpotifyBox] = useState(false);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [showFolderBox, setShowFolderBox] = useState(false);

  // Icon positions
  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({
    spotify: { x: 85, y: 10 },
    folder: { x: 78, y: 10 },
  });

  // File explorer icon positions
  const [explorerIconPositions, setExplorerIconPositions] = useState<Record<string, IconPosition>>({
    document1: { x: 20, y: 45 },
    document2: { x: 40, y: 60 },
    document3: { x: 55, y: 50 },
    wordDoc: { x: 75, y: 55 },
  });

  // File Explorer position and drag state
  const [explorerPosition, setExplorerPosition] = useState({ x: 0, y: 0 });
  const [isDraggingExplorer, setIsDraggingExplorer] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Drag state
  const [activeId, setActiveId] = useState<string | null>(null);

  // Set up sensors for drag detection
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8, // 8px movement required before drag starts
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    // Clear travel overlay once page is loaded
    const timer = setTimeout(() => {
      document.body.classList.remove('travel-overlay-active');
      sessionStorage.removeItem('travel-overlay-active');
    }, 500);

    // Set mounted to true after component mounts
    setMounted(true);

    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    if (delta.x !== 0 || delta.y !== 0) {
      const iconId = active.id as string;

      // Check if it's an explorer icon
      if (explorerIconPositions[iconId]) {
        const currentPosition = explorerIconPositions[iconId];

        // Convert delta to percentage (relative to the file explorer window)
        const deltaXPercent = (delta.x / (window.innerWidth * 0.9)) * 100;
        const deltaYPercent = (delta.y / (window.innerHeight * 0.8)) * 100;

        // Calculate new position within the explorer bounds
        const newX = Math.max(10, Math.min(80, currentPosition.x + deltaXPercent));
        const newY = Math.max(15, Math.min(85, currentPosition.y + deltaYPercent));

        setExplorerIconPositions(prev => ({
          ...prev,
          [iconId]: { x: newX, y: newY }
        }));
      } else {
        // Handle main background icons
        const currentPosition = iconPositions[iconId];

        // Convert delta to percentage
        const deltaXPercent = (delta.x / window.innerWidth) * 100;
        const deltaYPercent = (delta.y / window.innerHeight) * 100;

        // Calculate new position
        const newX = Math.max(5, Math.min(95, currentPosition.x + deltaXPercent));
        const newY = Math.max(5, Math.min(95, currentPosition.y + deltaYPercent));

        setIconPositions(prev => ({
          ...prev,
          [iconId]: { x: newX, y: newY }
        }));
      }
    }

    setActiveId(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSpotifyClick = () => {
    setShowSpotifyPlayer(true);
  };

  const handleFolderClick = () => {
    setShowFolderBox(true);
    // Reset explorer position when opening
    setExplorerPosition({ x: 0, y: 0 });
  };

  // Explorer icon click handlers
  const handleExplorerFolderClick = () => {
    console.log('Explorer folder clicked');
  };

  const handleDocument1Click = () => {
    window.open('https://drive.google.com/file/d/1uv_9fWU2aYcf_gguHJnPtENFtx9Y8aWA/view?usp=sharing', '_blank');
  };

  const handleDocument2Click = () => {
    window.open('https://drive.google.com/file/d/1GYTi5gz7iPJiYYXqgrr10MGWW0D0bBgU/view?usp=sharing', '_blank');
  };

  const handleDocument3Click = () => {
    window.open('https://drive.google.com/file/d/1NeNM-IObItFUEKro1cfFiKJE4jIMjXmk/view?usp=sharing', '_blank');
  };

  const handleWordDocClick = () => {
    window.open('https://www.overleaf.com/read/xhdnnczbhygb#f5d885', '_blank');
  };

  // File Explorer drag handlers
  const handleExplorerMouseDown = (e: React.MouseEvent) => {
    setIsDraggingExplorer(true);
    setDragOffset({
      x: e.clientX - explorerPosition.x,
      y: e.clientY - explorerPosition.y,
    });
  };

  const handleExplorerMouseMove = (e: React.MouseEvent) => {
    if (isDraggingExplorer) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep the explorer within reasonable bounds
      setExplorerPosition({
        x: Math.max(-400, Math.min(400, newX)),
        y: Math.max(-300, Math.min(300, newY)),
      });
    }
  };

  const handleExplorerMouseUp = () => {
    setIsDraggingExplorer(false);
  };

  // Don't render drag and drop until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className="fixed inset-0 text-white flex flex-col"
        style={{
          backgroundImage: `url('/experiences/desktop-background.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          {/* Back button positioned relative to background image */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url('/experiences/desktop-background.jpg')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="relative w-full h-full max-w-[100vh] max-h-[100vw]" style={{ aspectRatio: '16/9' }}>
              <Link
                href="/"
                className="absolute top-[8%] left-[12%] px-[1.5vw] py-[1vh] bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black shadow-lg z-40 text-[min(2.5vw,1.2rem)] sm:text-base md:text-lg lg:text-xl"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="fixed inset-0 text-white flex flex-col"
        style={{
          backgroundImage: `url('/experiences/desktop-background.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Spotify Icon */}
        <DraggableIcon
          id="spotify"
          position={iconPositions.spotify}
          onDoubleClick={handleSpotifyClick}
          isDragging={activeId === 'spotify'}
        >
          <div
            style={{ transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            className="flex flex-col items-center"
          >
            <img
              src="/experiences/spotify.png"
              alt="Spotify"
              className=""
              style={{
                width: '5vw',
                height: 'auto'
              }}
            />
            <span className="text-white text-xs mt-1 bg-black bg-opacity-50 px-1 rounded">
              Spotify
            </span>
          </div>
        </DraggableIcon>

        {/* Folder Icon */}
        <DraggableIcon
          id="folder"
          position={iconPositions.folder}
          onDoubleClick={handleFolderClick}
          isDragging={activeId === 'folder'}
        >
          <div
            style={{ transform: 'translate(-50%, -50%)' }}
            onMouseMove={handleMouseMove}
            className="flex flex-col items-center"
          >
            <img
              src="/experiences/regular-folder.png"
              alt="folder"
              className=""
              style={{
                width: '5vw',
                height: 'auto'
              }}
            />
            <span className="text-white text-xs mt-1 bg-black bg-opacity-50 px-1 rounded">
              CLASSIFIED
            </span>
          </div>
        </DraggableIcon>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          {/* Back button */}
          <Link
            href="/"
            className="absolute top-[3%] left-[10%] px-[1.5vw] py-[1vh] bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black shadow-lg z-40 text-[min(2.5vw,1.2rem)] sm:text-base md:text-lg lg:text-xl"
          >
            ← Back
          </Link>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div style={{ opacity: 0.8 }}>
              {activeId === 'spotify' ? (
                <img
                  src="/experiences/spotify.png"
                  alt="Spotify"
                  style={{
                    width: '5vw',
                    height: 'auto'
                  }}
                />
              ) : activeId === 'folder' ? (
                <img
                  src="/experiences/regular-folder.png"
                  alt="folder"
                  style={{
                    width: '5vw',
                    height: 'auto'
                  }}
                />
              ) : activeId === 'explorerFolder' ? (
                <img
                  src="/experiences/regular-folder.png"
                  alt="Explorer Folder"
                  style={{
                    width: '3vw',
                    height: 'auto'
                  }}
                />
              ) : activeId === 'document1' || activeId === 'document2' || activeId === 'document3' ? (
                <img
                  src="/experiences/document.png"
                  alt="Document"
                  style={{
                    width: '3vw',
                    height: 'auto'
                  }}
                />
              ) : activeId === 'wordDoc' ? (
                <img
                  src="/experiences/word-doc.png"
                  alt="Word Document"
                  style={{
                    width: '3vw',
                    height: 'auto'
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </DragOverlay>

        {/* File Explorer */}
        {showFolderBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* File Explorer Window */}
            <div className="relative pointer-events-auto">
              {/* Close button */}
              <button
                onClick={() => setShowFolderBox(false)}
                className="absolute top-[8.75%] right-[7.25%] z-10 bg-red-500 hover:bg-red-600 text-white px-[1.5vw] py-[0.75vh] flex items-center justify-center font-bold rounded text-[min(2vw,1rem)] sm:text-base md:text-lg lg:text-xl"
              >
                ×
              </button>

              {/* File Explorer Image */}
              <img
                src="/experiences/file-explorer.png"
                alt="File Explorer"
                className="max-w-[90vw] max-h-[80vh] object-contain"
              />

              {/* Explorer Icons */}
              <div className="absolute inset-0">
                {/* Document 1 Icon */}
                <DraggableIcon
                  id="document1"
                  position={explorerIconPositions.document1}
                  onDoubleClick={handleDocument1Click}
                  isDragging={activeId === 'document1'}
                >
                  <div
                    style={{ transform: 'translate(-50%, -50%)' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src="/experiences/document.png"
                      alt="Document 1"
                      className=""
                      style={{
                        width: '3vw',
                        height: 'auto'
                      }}
                    />
                    <span className="text-black text-[0.7rem] mt-1 bg-white bg-opacity-75 px-1 rounded">
                      MISSION_REPORT_DC
                    </span>
                  </div>
                </DraggableIcon>

                {/* Document 2 Icon */}
                <DraggableIcon
                  id="document2"
                  position={explorerIconPositions.document2}
                  onDoubleClick={handleDocument2Click}
                  isDragging={activeId === 'document2'}
                >
                  <div
                    style={{ transform: 'translate(-50%, -50%)' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src="/experiences/document.png"
                      alt="Document 2"
                      className=""
                      style={{
                        width: '3vw',
                        height: 'auto'
                      }}
                    />
                    <span className="text-black text-[0.7rem] mt-1 bg-white bg-opacity-75 px-1 rounded">
                      MISSION_REPORT_SEATTLE
                    </span>
                  </div>
                </DraggableIcon>

                {/* Document 3 Icon */}
                <DraggableIcon
                  id="document3"
                  position={explorerIconPositions.document3}
                  onDoubleClick={handleDocument3Click}
                  isDragging={activeId === 'document3'}
                >
                  <div
                    style={{ transform: 'translate(-50%, -50%)' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src="/experiences/document.png"
                      alt="Document 3"
                      className=""
                      style={{
                        width: '3vw',
                        height: 'auto'
                      }}
                    />
                    <span className="text-black text-[0.7rem] mt-1 bg-white bg-opacity-75 px-1 rounded">
                      MISSION_REPORT_NYC
                    </span>
                  </div>
                </DraggableIcon>

                {/* Word Document Icon */}
                <DraggableIcon
                  id="wordDoc"
                  position={explorerIconPositions.wordDoc}
                  onDoubleClick={handleWordDocClick}
                  isDragging={activeId === 'wordDoc'}
                >
                  <div
                    style={{ transform: 'translate(-50%, -50%)' }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src="/experiences/word-doc.png"
                      alt="Word Document"
                      className=""
                      style={{
                        width: '3vw',
                        height: 'auto'
                      }}
                    />
                    <span className="text-black text-[0.7rem] mt-1 bg-white bg-opacity-75 px-1 rounded">
                      Mission Portfolio (Resume)
                    </span>
                  </div>
                </DraggableIcon>
              </div>
            </div>
          </div>
        )}

        {/* Spotify Player */}
        {showSpotifyPlayer && (
          <SpotifyPlayer onClose={() => setShowSpotifyPlayer(false)} />
        )}
      </div>
    </DndContext>
  );
}
