import React, { useState, useRef, useEffect } from 'react';

interface LofiTrack {
  id: string;
  title: string;
  artist: string;
  embedUrl: string;
  thumbnail: string;
}

const LOFI_TRACKS: LofiTrack[] = [
  {
    id: 'lofi-hip-hop-radio',
    title: 'Lofi Hip Hop Radio',
    artist: 'ChilledCow',
    embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0&controls=0&loop=1',
    thumbnail: '🎵'
  },
  {
    id: 'chill-lofi-beats',
    title: 'Chill Lofi Beats',
    artist: 'Lofi Girl',
    embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0&controls=0&loop=1',
    thumbnail: '🌙'
  },
  {
    id: 'study-session',
    title: 'Study Session',
    artist: 'Peaceful Vibes',
    embedUrl: 'https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&mute=0&controls=0&loop=1',
    thumbnail: '📚'
  },
  {
    id: 'coffee-shop-jazz',
    title: 'Coffee Shop Jazz',
    artist: 'Jazz Café',
    embedUrl: 'https://www.youtube.com/embed/Dx5qFachd3A?autoplay=1&mute=0&controls=0&loop=1',
    thumbnail: '☕'
  },
  {
    id: 'midnight-city',
    title: 'Midnight City',
    artist: 'Synthwave Dreams',
    embedUrl: 'https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1&mute=0&controls=0&loop=1',
    thumbnail: '🌆'
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<LofiTrack>(LOFI_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-play próxima faixa após 45 minutos (tempo médio de uma sessão de foco)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = LOFI_TRACKS.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % LOFI_TRACKS.length;
      setCurrentTrack(LOFI_TRACKS[nextIndex]);
    }, 45 * 60 * 1000); // 45 minutos

    return () => clearInterval(interval);
  }, [currentTrack]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Como estamos usando iframe do YouTube, vamos recriar com/sem autoplay
    if (iframeRef.current) {
      const newUrl = isPlaying 
        ? currentTrack.embedUrl.replace('autoplay=1', 'autoplay=0')
        : currentTrack.embedUrl.replace('autoplay=0', 'autoplay=1');
      iframeRef.current.src = newUrl;
    }
  };

  const skipTrack = () => {
    const currentIndex = LOFI_TRACKS.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % LOFI_TRACKS.length;
    setCurrentTrack(LOFI_TRACKS[nextIndex]);
  };

  const previousTrack = () => {
    const currentIndex = LOFI_TRACKS.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? LOFI_TRACKS.length - 1 : currentIndex - 1;
    setCurrentTrack(LOFI_TRACKS[prevIndex]);
  };

  const selectTrack = (track: LofiTrack) => {
    setCurrentTrack(track);
    setShowPlaylist(false);
    setIsPlaying(true);
  };

  return (
    <div className="glass-card lofi-player h-full flex flex-col overflow-hidden">
      {/* Header Minimalista */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center now-playing">
              <span className="text-sm">🎵</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Lofi Player</h3>
              <p className="text-xs text-white/60">Focus & Relax</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="player-control p-2 hover:bg-white/10 rounded-lg transition-colors btn-animate"
            title="Playlist"
          >
            <span className="text-lg">{showPlaylist ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Informações da faixa atual */}
        <div className="text-center">
          <div className="text-2xl mb-2">{currentTrack.thumbnail}</div>
          <h4 className="text-sm font-medium text-white mb-1">{currentTrack.title}</h4>
          <p className="text-xs text-white/60">{currentTrack.artist}</p>
        </div>

        {/* Controles principais */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={previousTrack}
            className="player-control p-2 hover:bg-white/10 rounded-full transition-all btn-animate"
            title="Anterior"
          >
            <span className="text-lg">⏮️</span>
          </button>
          
          <button
            onClick={togglePlayPause}
            className="player-control play-button p-3 rounded-full transition-all btn-animate"
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          
          <button
            onClick={skipTrack}
            className="player-control p-2 hover:bg-white/10 rounded-full transition-all btn-animate"
            title="Próxima"
          >
            <span className="text-lg">⏭️</span>
          </button>
        </div>

        {/* Controle de volume */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 slider"
          />
          <span className="text-xs text-white/60 w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* Playlist */}
      {showPlaylist && (
        <div className="p-4 border-b border-white/10 max-h-48 overflow-y-auto">
          <h4 className="text-xs font-medium text-white/80 mb-3 uppercase tracking-wider">Playlist</h4>
          <div className="space-y-2">
            {LOFI_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => selectTrack(track)}
                className={`playlist-track w-full text-left p-2 rounded-lg flex items-center gap-3 ${
                  currentTrack.id === track.id ? 'active' : ''
                }`}
              >
                <span className="text-lg">{track.thumbnail}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{track.title}</p>
                  <p className="text-xs text-white/60 truncate">{track.artist}</p>
                </div>
                {currentTrack.id === track.id && (
                  <div className="audio-visualizer">
                    <div className="visualizer-bar" style={{ height: '12px' }}></div>
                    <div className="visualizer-bar" style={{ height: '8px' }}></div>
                    <div className="visualizer-bar" style={{ height: '16px' }}></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Player invisível (apenas para áudio) */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={currentTrack.embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={currentTrack.title}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{ transform: 'scale(0.1)', transformOrigin: 'top left' }}
        />
        
        {/* Visualizador decorativo principal */}
        <div className="flex items-center justify-center h-full">
          <div className="audio-visualizer">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="visualizer-bar"
                style={{
                  height: `${Math.random() * 40 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status minimalista */}
      <div className="player-status px-4 py-2 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{isPlaying ? '🎵 Tocando agora' : '⏸️ Pausado'}</span>
          <span>Auto-switch em 45min</span>
        </div>
      </div>
    </div>
  );
}; 