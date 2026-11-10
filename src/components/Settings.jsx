import { Lightbulb, Timer, Users, Volume2, VolumeX } from 'lucide-react';
import Header from './Header.jsx';
import { Segmented, Toggle } from './ui.jsx';
import { playSound } from '../utils/sound.js';

function Row({ icon: Icon, title, hint, children }) {
  return (
    <section className="glass">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold"><Icon size={20} /> {title}</p>
          {hint && <p className="mt-0.5 text-sm font-semibold text-white/60">{hint}</p>}
        </div>
        {children.toggle}
      </div>
      {children.body && <div className="mt-3">{children.body}</div>}
    </section>
  );
}

export default function Settings({ settings, onChange, onBack }) {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Settings" onBack={onBack} />
      <div className="space-y-4 py-2">
        <Row icon={Users} title="Imposters" hint="2 imposters only works with 5+ players.">
          {{
            body: (
              <Segmented
                label="Number of imposters"
                value={settings.imposters}
                onChange={(v) => onChange({ imposters: v })}
                options={[{ value: 1, label: '1' }, { value: 2, label: '2' }]}
              />
            ),
          }}
        </Row>

        <Row icon={Timer} title="Discussion timer" hint="How long players get to talk.">
          {{
            body: (
              <Segmented
                label="Discussion timer"
                value={settings.timer}
                onChange={(v) => onChange({ timer: v })}
                options={[
                  { value: 0, label: 'Off' },
                  { value: 30, label: '30s' },
                  { value: 60, label: '60s' },
                  { value: 90, label: '90s' },
                  { value: 120, label: '2m' },
                ]}
              />
            ),
          }}
        </Row>

        <Row icon={settings.sound ? Volume2 : VolumeX} title="Sound" hint="Little beeps and fanfares.">
          {{
            toggle: (
              <Toggle
                label="Sound"
                checked={settings.sound}
                onChange={(v) => { onChange({ sound: v }); playSound('tap', v); }}
              />
            ),
          }}
        </Row>

        <Row icon={Lightbulb} title="Category hints" hint="Show the word's category with your secret word.">
          {{ toggle: <Toggle label="Category hints" checked={settings.hints} onChange={(v) => onChange({ hints: v })} /> }}
        </Row>
      </div>
    </div>
  );
}
