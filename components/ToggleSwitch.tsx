interface ToggleSwitchProps {
  value: boolean
  onChange: (val: boolean) => void
}

export default function ToggleSwitch({ value, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative shrink-0 transition-all duration-300"
      style={{
        width: '64px',
        height: '28px',
        borderRadius: '999px',
        background: value ? '#22c55e' : '#374151',
        border: `2px solid ${value ? '#16a34a' : '#4b5563'}`,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'white',
          left: value ? '8px' : 'auto',
          right: value ? 'auto' : '8px',
        }}
      >
        {value ? 'Si' : 'No'}
      </span>
      <span
        className="absolute top-0.5"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '999px',
          background: 'white',
          left: value ? '40px' : '4px',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      />
    </button>
  )
}