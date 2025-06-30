import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';

interface PokemonCryPlayerProps {
  url: string | null;
  playOnMount?: boolean; // Si debe reproducir automáticamente una vez al montar
}

const PokemonCryPlayer: React.FC<PokemonCryPlayerProps> = ({ url, playOnMount = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volumen bajo por defecto
    }
  }, [url]);

  useEffect(() => {
    if (!url || !playOnMount) return;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setError(true));
    }
    // Solo una vez al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, playOnMount]);

  const handleManualPlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setError(true));
    }
  };

  if (!url) return null;
  if (error) return <span style={{ color: 'red' }}>No se pudo cargar el sonido</span>;

  return (
    <Tooltip title="Reproducir grito de Pokémon">
      <span>
        <IconButton onClick={handleManualPlay} aria-label="Reproducir sonido" size="large">
          <VolumeUpIcon />
        </IconButton>
        <audio ref={audioRef} src={url} preload="auto" />
      </span>
    </Tooltip>
  );
};

export default PokemonCryPlayer;
