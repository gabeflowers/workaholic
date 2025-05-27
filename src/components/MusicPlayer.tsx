import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { extractSpotifyEmbedUrl } from '../utils/helpers';

type PlayerType = 'spotify' | 'youtube';

interface LofiPlaylist {
  id: string;
  title: string;
  embedUrl: string;
  thumbnail: string;
}

const LOFI_PLAYLISTS: LofiPlaylist[] = [
  {
    id: 'lofi-hip-hop-radio',
    title: 'Lofi Hip Hop Radio 24/7 - Beats to Study/Relax',
    embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0',
    thumbnail: '🎵'
  },
  {
    id: 'chill-lofi-mix',
    title: 'Chill Lofi Mix - Deep Focus',
    embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0',
    thumbnail: '🌙'
  },
  {
    id: 'study-with-me',
    title: 'Study With Me - Lofi Beats',
    embedUrl: 'https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&mute=0',
    thumbnail: '📚'
  },
  {
    id: 'coffee-shop-jazz',
    title: 'Coffee Shop Jazz - Relaxing Background Music',
    embedUrl: 'https://www.youtube.com/embed/Dx5qFachd3A?autoplay=1&mute=0',
    thumbnail: '☕'
  },
  {
    id: 'rain-and-jazz',
    title: 'Rain & Jazz - Cozy Coffee Shop Ambience',
    embedUrl: 'https://www.youtube.com/embed/HMnrl0tmd3k?autoplay=1&mute=0',
    thumbnail: '🌧️'
  },
  {
    id: 'synthwave-chill',
    title: 'Synthwave Chillout - Retro Vibes',
    embedUrl: 'https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1&mute=0',
    thumbnail: '🌆'
  },
  {
    id: 'nature-sounds',
    title: 'Forest Sounds - Nature Ambience',
    embedUrl: 'https://www.youtube.com/embed/xNN7iTA57jM?autoplay=1&mute=0',
    thumbnail: '🌲'
  }
];

export const MusicPlayer: React.FC = () => {
  const { spotifyConfig, setSpotifyConfig, clearSpotifyConfig } = useAppStore();
  const [activePlayer, setActivePlayer] = useState<PlayerType>('youtube');
  const [selectedLofi, setSelectedLofi] = useState<LofiPlaylist>(LOFI_PLAYLISTS[0]);
  const [isConfiguringSpotify, setIsConfiguringSpotify] = useState(false);
  const [spotifyUrlInput, setSpotifyUrlInput] = useState('');
  const [spotifyError, setSpotifyError] = useState('');

  const handleSpotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpotifyError('');

    const embedUrl = extractSpotifyEmbedUrl(spotifyUrlInput.trim());
    if (embedUrl) {
      setSpotifyConfig(embedUrl);
      setSpotifyUrlInput('');
      setIsConfiguringSpotify(false);
      setActivePlayer('spotify');
    } else {
      setSpotifyError('URL do Spotify inválida. Cole um link de playlist, álbum ou música.');
    }
  };

  const handleSpotifyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsConfiguringSpotify(false);
      setSpotifyUrlInput('');
      setSpotifyError('');
    }
  };

  const selectLofiPlaylist = (playlist: LofiPlaylist) => {
    setSelectedLofi(playlist);
    setActivePlayer('youtube');
  };

  return (
    <div className="glass-card compact-card h-full flex flex-col">
      {/* Header compacto com abas */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <div>
            <h2 className="heading-secondary text-lg mb-0">Music Player</h2>
            <p className="text-xs opacity-70">Sua trilha sonora perfeita</p>
          </div>
        </div>
      </div>

      {/* Abas de navegação compactas */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setActivePlayer('youtube')}
          className={`music-tab flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
            activePlayer === 'youtube'
              ? 'active'
              : ''
          }`}
        >
          <span>📺</span>
          <span className="font-medium">YouTube Lofi</span>
        </button>
        <button
          onClick={() => setActivePlayer('spotify')}
          className={`music-tab flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
            activePlayer === 'spotify'
              ? 'active'
              : ''
          }`}
        >
          <span>🎧</span>
          <span className="font-medium">Spotify</span>
        </button>
      </div>

      {/* Conteúdo do player - altura otimizada */}
      <div className="flex-1 overflow-hidden min-h-0">
        {activePlayer === 'youtube' && (
          <div className="h-full flex flex-col fade-in">
            {/* Seletor de playlists lofi compacto */}
            <div className="mb-3">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 opacity-90">
                <span>🎶</span>
                <span>Playlists</span>
                <span className="text-xs opacity-60 ml-auto">{LOFI_PLAYLISTS.length} opções</span>
              </h3>
              <div className="grid grid-cols-1 gap-1 max-h-24 overflow-y-auto pr-1">
                {LOFI_PLAYLISTS.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => selectLofiPlaylist(playlist)}
                    className={`playlist-item flex items-center gap-2 p-1.5 rounded-lg text-left text-xs ${
                      selectedLofi.id === playlist.id
                        ? 'active'
                        : 'bg-white/5'
                    }`}
                  >
                    <span className="text-sm flex-shrink-0">{playlist.thumbnail}</span>
                    <span className="font-medium truncate leading-tight">{playlist.title}</span>
                    {selectedLofi.id === playlist.id && (
                      <span className="text-xs ml-auto">▶️</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Player do YouTube - altura otimizada */}
            <div className="flex-1 youtube-player bg-black">
              <iframe
                src={selectedLofi.embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={selectedLofi.title}
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>
        )}

        {activePlayer === 'spotify' && (
          <div className="h-full flex flex-col fade-in">
            {!spotifyConfig && !isConfiguringSpotify && (
              <div className="text-center py-6 flex-1 flex flex-col justify-center">
                <div className="text-4xl mb-3 opacity-60">🎧</div>
                <p className="text-sm opacity-80 mb-4 leading-relaxed">
                  Configure o Spotify para ouvir suas músicas favoritas<br />
                  <span className="text-xs opacity-75">Playlists, álbuns ou músicas individuais</span>
                </p>
                <button
                  onClick={() => setIsConfiguringSpotify(true)}
                  className="btn-primary flex items-center gap-2 mx-auto text-sm"
                >
                  <span>🎶</span>
                  <span>Configurar Spotify</span>
                </button>
              </div>
            )}

            {isConfiguringSpotify && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2 opacity-90">
                  <span>🔗</span>
                  <span>Configurar Spotify</span>
                </h3>
                <form onSubmit={handleSpotifySubmit} className="space-y-3">
                  <input
                    type="text"
                    value={spotifyUrlInput}
                    onChange={(e) => setSpotifyUrlInput(e.target.value)}
                    onKeyDown={handleSpotifyKeyDown}
                    className="input-field text-sm w-full"
                    placeholder="🔗 Cole aqui o link do Spotify"
                    autoFocus
                  />
                  {spotifyError && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-xs">
                      <span className="mr-2">⚠️</span>
                      {spotifyError}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsConfiguringSpotify(false);
                        setSpotifyUrlInput('');
                        setSpotifyError('');
                      }}
                      className="btn-secondary text-sm"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary flex items-center gap-2 text-sm"
                      disabled={!spotifyUrlInput.trim()}
                    >
                      <span>💾</span>
                      <span>Salvar</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {spotifyConfig && !isConfiguringSpotify && (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2 opacity-90">
                    <span>🎧</span>
                    <span>Spotify Player</span>
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setIsConfiguringSpotify(true)}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
                      title="Alterar música"
                    >
                      <span className="text-sm">🔄</span>
                    </button>
                    <button
                      onClick={() => {
                        clearSpotifyConfig();
                        setActivePlayer('youtube');
                      }}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Remover player"
                    >
                      <span className="text-sm text-red-600">🗑️</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 spotify-player">
                  <iframe
                    src={spotifyConfig.embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="bg-black"
                    style={{ minHeight: '200px' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 