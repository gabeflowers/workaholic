import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/helpers';

interface AlarmData {
  time: string;
  label: string;
  isActive: boolean;
}

export const Alarm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alarms, setAlarms] = useState<AlarmData[]>(() => {
    // Carregar alarmes do localStorage
    const savedAlarms = localStorage.getItem('workaholic-alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : [];
  });
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [isRinging, setIsRinging] = useState(false);
  const [currentRingingAlarm, setCurrentRingingAlarm] = useState<AlarmData | null>(null);
  const [lastTriggeredAlarm, setLastTriggeredAlarm] = useState<string | null>(null);
  const soundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Salvar alarmes no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('workaholic-alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Cleanup timeouts quando componente for desmontado
  useEffect(() => {
    return () => {
      if (soundTimeoutRef.current) {
        clearTimeout(soundTimeoutRef.current);
      }
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
      }
    };
  }, []);

  // Verificar alarmes a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentTime = formatTime(now).slice(0, 5); // HH:MM format

      alarms.forEach((alarm, index) => {
        const alarmKey = `${alarm.time}-${now.getDate()}-${now.getMonth()}-${now.getFullYear()}-${index}`;
        
        if (alarm.isActive && 
            alarm.time === currentTime && 
            !isRinging && 
            lastTriggeredAlarm !== alarmKey) {
          setLastTriggeredAlarm(alarmKey);
          triggerAlarm(alarm);
        }
      });

      // Reset do último alarme disparado quando muda o minuto
      if (lastTriggeredAlarm && !lastTriggeredAlarm.startsWith(currentTime)) {
        setLastTriggeredAlarm(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms, isRinging, lastTriggeredAlarm]);

  const triggerAlarm = (alarm: AlarmData) => {
    setIsRinging(true);
    setCurrentRingingAlarm(alarm);
    
    // Notificação do navegador
    if (Notification.permission === 'granted') {
      new Notification('🚨 Despertador!', {
        body: alarm.label || 'Hora do alarme!',
        icon: '/favicon.ico'
      });
    }

    // Som do alarme (usando Web Audio API)
    playAlarmSound();

    // Auto-desligar após 30 segundos
    autoStopTimeoutRef.current = setTimeout(() => {
      stopRinging();
    }, 30000);
  };

  const playAlarmSound = () => {
    if (!isRinging) return;

    try {
      // Criar som de alarme usando Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);

      // Programar próximo som apenas se ainda estiver tocando
      soundTimeoutRef.current = setTimeout(() => {
        if (isRinging) {
          playAlarmSound();
        }
      }, 500);
    } catch (error) {
      console.log('Erro ao reproduzir som do alarme:', error);
    }
  };

  const addAlarm = () => {
    if (newAlarmTime) {
      const newAlarm: AlarmData = {
        time: newAlarmTime,
        label: newAlarmLabel.trim() || 'Alarme',
        isActive: true
      };
      setAlarms(prev => [...prev, newAlarm]);
      setNewAlarmTime('');
      setNewAlarmLabel('');
      setIsOpen(false);

      // Solicitar permissão para notificações
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  };

  const toggleAlarm = (index: number) => {
    setAlarms(prev => prev.map((alarm, i) => 
      i === index ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  const removeAlarm = (index: number) => {
    setAlarms(prev => prev.filter((_, i) => i !== index));
  };

  const stopRinging = () => {
    setIsRinging(false);
    setLastTriggeredAlarm(null); // Reset para permitir alarmes futuros
    setCurrentRingingAlarm(null);
    
    // Cancelar timeouts ativos
    if (soundTimeoutRef.current) {
      clearTimeout(soundTimeoutRef.current);
      soundTimeoutRef.current = null;
    }
    
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
  };

  const activeAlarms = alarms.filter(alarm => alarm.isActive);

  if (isRinging) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center alarm-ringing max-w-md mx-4">
          <div className="text-6xl mb-4 animate-bounce">🚨</div>
          <h2 className="text-3xl font-bold text-white mb-2">DESPERTADOR!</h2>
          
          {currentRingingAlarm && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {currentRingingAlarm.time}
              </div>
              <div className="text-white/80 text-lg">
                {currentRingingAlarm.label}
              </div>
            </div>
          )}
          
          <p className="text-white/80 mb-6 text-lg">Hora de acordar!</p>
          <div className="mb-6">
            <div className="text-white/60 text-sm mb-2">Clique para parar o alarme</div>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
          <button
            onClick={stopRinging}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold transition-all text-lg hover:scale-105 active:scale-95"
          >
            🛑 PARAR ALARME
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`alarm-button glass-card p-3 hover:scale-105 transition-all duration-200 group relative ${
          activeAlarms.length > 0 ? 'ring-2 ring-yellow-500/50' : ''
        }`}
        title={activeAlarms.length > 0 ? `${activeAlarms.length} alarme(s) ativo(s)` : 'Adicionar despertador'}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl group-hover:scale-110 transition-transform">⏰</span>
          {activeAlarms.length > 0 && (
            <span className="alarm-badge absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {activeAlarms.length}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div className="alarm-dropdown glass-card p-5 w-80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏰</span>
            <h3 className="text-lg font-semibold text-white">Despertador</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Adicionar novo alarme */}
        <div className="space-y-3 mb-4">
          <input
            type="time"
            value={newAlarmTime}
            onChange={(e) => setNewAlarmTime(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <input
            type="text"
            value={newAlarmLabel}
            onChange={(e) => setNewAlarmLabel(e.target.value)}
            placeholder="Nome do alarme (opcional)"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <button
            onClick={addAlarm}
            disabled={!newAlarmTime}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg py-2 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Adicionar Alarme
          </button>
        </div>

        {/* Lista de alarmes */}
        {alarms.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h4 className="text-sm font-medium text-white/80 mb-3">Alarmes Configurados</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alarms.map((alarm, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg border ${
                    alarm.isActive 
                      ? 'bg-green-500/20 border-green-500/40' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAlarm(index)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                        alarm.isActive 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-white/40'
                      }`}
                    >
                      {alarm.isActive && '✓'}
                    </button>
                    <div>
                      <div className="text-white font-medium">{alarm.time}</div>
                      <div className="text-white/60 text-xs">{alarm.label}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAlarm(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Remover alarme"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {alarms.length === 0 && (
          <div className="text-center text-white/60 py-4">
            <div className="text-3xl mb-2">😴</div>
            <p className="text-sm">Nenhum alarme configurado</p>
          </div>
        )}
      </div>
    </div>
  );
}; 