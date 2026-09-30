'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { designs } from '@/shared/config';
import { specs } from '@/entities/product';
import s from './Shell.module.css';

type Line = { kind: 'in' | 'out' | 'info' | 'err'; text: string };

const PROMPT = 'goslide@sc-01:~$';

const help = [
  'available commands:',
  '  help            this list',
  '  specs           key numbers',
  '  order           reserve a Slide Control',
  '  designs         other ways to see this page',
  '  open <design>   switch design, e.g. open arcade',
  '  whoami · clear · echo <text>',
].join('\n');

function run(raw: string): Line[] | 'clear' {
  const [cmd = '', ...args] = raw.trim().split(/\s+/);
  switch (cmd.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return [{ kind: 'out', text: help }];
    case 'specs':
      return [
        {
          kind: 'out',
          text: [
            'mass ............ 55 g',
            `sensor .......... ${specs.sensor.value}, 100–20 000 dpi, >888 ips`,
            'report rate ..... 5000 Hz',
            'battery ......... 95 h',
            'size ............ 40 × 63 × 125 mm',
          ].join('\n'),
        },
      ];
    case 'order':
      return [
        { kind: 'out', text: 'SC-01 · black · wireless → added to queue' },
        { kind: 'info', text: 'checkout is not connected in this preview yet.' },
      ];
    case 'designs':
      return [{ kind: 'out', text: designs.map((d) => `  ${d.id.padEnd(10)} ${d.tagline}`).join('\n') }];
    case 'open': {
      const target = designs.find((d) => d.id === args[0]?.toLowerCase());
      if (!target) return [{ kind: 'err', text: `open: unknown design "${args[0] ?? ''}" — try: designs` }];
      window.location.href = target.href;
      return [{ kind: 'info', text: `opening ${target.name}…` }];
    }
    case 'whoami':
      return [{ kind: 'out', text: 'player one' }];
    case 'echo':
      return [{ kind: 'out', text: args.join(' ') }];
    case 'clear':
      return 'clear';
    case 'sudo':
      return [{ kind: 'err', text: 'nice try.' }];
    default:
      return [{ kind: 'err', text: `command not found: ${cmd} — try: help` }];
  }
}

export function Shell() {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'info', text: 'GoSlide shell 2.6 — type help and press enter.' },
  ]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  const exec = (cmd: string) => {
    const result = run(cmd);
    if (result === 'clear') setLines([]);
    else setLines((prev) => [...prev, { kind: 'in', text: `${PROMPT} ${cmd}` }, ...result]);
    setValue('');
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    exec(value);
  };

  return (
    <section className={s.shell} id="shell">
      <div>
        <div className={s.window} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
          <div className={s.titlebar}>
            <span>goslide — interactive shell</span>
            <span>try: help</span>
          </div>
          <pre ref={outRef} className={s.out} aria-live="polite">
            {lines.map((l, i) => (
              <span key={i} className={clsx(s[l.kind])}>
                {l.text}
                {'\n'}
              </span>
            ))}
          </pre>
          <form className={s.form} onSubmit={submit}>
            <label htmlFor="goslide-shell">{PROMPT}</label>
            <input
              ref={inputRef}
              id="goslide-shell"
              className={s.input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        </div>
        <div className={s.chips}>
          {['help', 'specs', 'order', 'designs', 'open arcade'].map((c) => (
            <button key={c} type="button" className={s.chip} onClick={() => exec(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
