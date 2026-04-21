"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QUIZ_QUESTIONS, scoreMessage, type QuizQuestion } from "@/lib/quiz";
import { useWindowManager } from "@/components/xp/WindowManager";

type Phase = "welcome" | "playing" | "result";

interface SelectionState {
  questionIndex: number;
  selectedIdx: number | null;
  revealed: boolean;
}

const BITMAP_FONT =
  'var(--font-bitmap), "VT323", "Consolas", "Courier New", monospace';
const PIXEL_FONT = 'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif';

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function shuffleAnswers(qs: readonly QuizQuestion[]): QuizQuestion[] {
  return qs.map((q) => ({ ...q, answers: shuffle(q.answers) }));
}

function PixelButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const bg = variant === "primary" ? "#0a3a8e" : "#ece9d8";
  const fg = variant === "primary" ? "#fff" : "#000";
  const fontSize = size === "lg" ? 18 : 14;
  const pad = size === "lg" ? "12px 22px" : "8px 16px";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="xp-bevel-raised"
      style={{
        background: bg,
        color: fg,
        fontFamily: PIXEL_FONT,
        fontWeight: 700,
        fontSize,
        padding: pad,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value, total }: { value: number; total: number }) {
  const segments = Array.from({ length: total }, (_, i) => i < value);
  return (
    <div
      className="xp-bevel-sunken"
      style={{
        background: "#000",
        padding: 3,
        display: "grid",
        gridTemplateColumns: `repeat(${total}, 1fr)`,
        gap: 3,
      }}
    >
      {segments.map((filled, i) => (
        <div
          key={i}
          style={{
            height: 14,
            background: filled ? "#3ba419" : "#143d10",
            boxShadow: filled ? "inset 1px 1px 0 #7be063" : "none",
          }}
        />
      ))}
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        background: "#0a0f1d",
        color: "#fff",
        padding: "28px 24px 32px",
        display: "grid",
        gap: 18,
        justifyItems: "center",
        textAlign: "center",
        minHeight: 360,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
      }}
    >
      <div
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 32,
          color: "#ffd319",
          letterSpacing: "0.06em",
          textShadow: "2px 2px 0 #c62727",
        }}
      >
        WAT ZOU JIJ BIEDEN?
      </div>
      <div
        style={{
          fontFamily: BITMAP_FONT,
          fontSize: 20,
          color: "#9cff6f",
          letterSpacing: "0.05em",
        }}
      >
        ★ A GOOGLE ADS QUIZ ★
      </div>

      <div
        style={{
          fontFamily: "Tahoma, sans-serif",
          fontSize: 14,
          color: "#cfd6e4",
          lineHeight: 1.5,
          maxWidth: 460,
        }}
      >
        {QUIZ_QUESTIONS.length} real Google Ads scenarios — 10 advanced, 20
        really hard. Pick the move you&apos;d make in each account. I&apos;ll
        tell you why it was right — or why it wasn&apos;t. No penalty for
        losing, except your ego.
      </div>

      <div style={{ marginTop: 6 }}>
        <PixelButton size="lg" onClick={onStart}>
          ▶ Start Game
        </PixelButton>
      </div>

      <div
        style={{
          fontFamily: BITMAP_FONT,
          fontSize: 14,
          color: "#7a849c",
          marginTop: 6,
        }}
      >
        © 2026 JERMAYA-OS · PRESS ANY KEY TO CONTINUE
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  total,
  state,
  onSelect,
  onNext,
  isLast,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  state: SelectionState;
  onSelect: (idx: number) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const revealed = state.revealed && state.questionIndex === index;

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Progress */}
      <div style={{ display: "grid", gap: 6 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: PIXEL_FONT,
            fontSize: 13,
            color: "#002a7b",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>
            Level {index + 1} / {total}
          </span>
          <span style={{ color: "#3c3c3c" }}>Score &gt; keep going</span>
        </div>
        <ProgressBar value={index + (revealed ? 1 : 0)} total={total} />
      </div>

      {/* Scenario */}
      <div
        className="xp-bevel-raised"
        style={{
          background: "#fff",
          padding: 14,
          display: "grid",
          gap: 10,
        }}
      >
        <div
          style={{
            background: "#0a3a8e",
            color: "#fff",
            padding: "6px 10px",
            fontFamily: PIXEL_FONT,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.06em",
            marginTop: -14,
            marginLeft: -14,
            marginRight: -14,
          }}
        >
          SCENARIO
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "Tahoma, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: "#000",
          }}
        >
          {question.scenario}
        </p>
        {question.facts && question.facts.length > 0 ? (
          <ul
            style={{
              margin: 0,
              paddingLeft: 0,
              listStyle: "none",
              display: "grid",
              gap: 4,
              fontFamily: BITMAP_FONT,
              fontSize: 16,
              color: "#0a3a8e",
            }}
          >
            {question.facts.map((f) => (
              <li key={f}>▸ {f}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Answers */}
      <div style={{ display: "grid", gap: 8 }}>
        {question.answers.map((a, i) => {
          const isSelected = state.selectedIdx === i;
          const showCorrect = revealed && a.correct;
          const showWrong = revealed && isSelected && !a.correct;

          let bg = "#fff";
          let border = "#808080";
          const color = "#000";
          if (showCorrect) {
            bg = "#d5f0c8";
            border = "#3ba419";
          } else if (showWrong) {
            bg = "#ffd4d4";
            border = "#c62727";
          } else if (isSelected) {
            bg = "#d6e4fb";
            border = "#0a3a8e";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              disabled={revealed}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                background: bg,
                border: `2px solid ${border}`,
                fontFamily: "Tahoma, sans-serif",
                fontSize: 14,
                color,
                cursor: revealed ? "default" : "pointer",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: PIXEL_FONT,
                  fontWeight: 700,
                  color: showCorrect
                    ? "#1f7a14"
                    : showWrong
                    ? "#8a1111"
                    : "#0a3a8e",
                  minWidth: 22,
                }}
              >
                {String.fromCharCode(65 + i)}.
              </span>
              <span style={{ flex: 1, lineHeight: 1.45 }}>{a.text}</span>
              {showCorrect ? (
                <span
                  style={{
                    fontFamily: PIXEL_FONT,
                    color: "#1f7a14",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
              ) : null}
              {showWrong ? (
                <span
                  style={{
                    fontFamily: PIXEL_FONT,
                    color: "#8a1111",
                    fontWeight: 700,
                  }}
                >
                  ✗
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {revealed ? (
        <div
          className="xp-bevel-sunken"
          style={{
            background: "#fffbe6",
            borderLeft: "4px solid #ffb000",
            padding: "10px 12px",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 700, color: "#0a3a8e" }}>Why: </span>
          {question.explanation}
        </div>
      ) : null}

      {revealed ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <PixelButton onClick={onNext}>
            {isLast ? "See Score ▸" : "Next ▸"}
          </PixelButton>
        </div>
      ) : null}
    </div>
  );
}

function ResultScreen({
  score,
  total,
  onRestart,
  onContact,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  onContact: () => void;
}) {
  const msg = scoreMessage(score);
  const accent =
    msg.tone === "high" ? "#1f7a14" : msg.tone === "mid" ? "#0a3a8e" : "#8a1111";

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: "18px 8px",
        justifyItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 15,
          color: "#3c3c3c",
          letterSpacing: "0.12em",
        }}
      >
        ── GAME OVER ──
      </div>

      <div
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 64,
          fontWeight: 700,
          color: accent,
          lineHeight: 1,
          textShadow: "3px 3px 0 rgba(0,0,0,0.15)",
        }}
      >
        {score} / {total}
      </div>

      <div
        style={{
          fontFamily: PIXEL_FONT,
          fontSize: 22,
          color: "#000",
          letterSpacing: "0.04em",
        }}
      >
        {msg.title}
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "Tahoma, sans-serif",
          fontSize: 14,
          color: "#222",
          maxWidth: 460,
          lineHeight: 1.55,
        }}
      >
        {msg.body}
      </p>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 6,
        }}
      >
        <PixelButton onClick={onContact} size="lg">
          ✉ Book a call
        </PixelButton>
        <PixelButton variant="ghost" onClick={onRestart}>
          ↻ Play again
        </PixelButton>
      </div>
    </div>
  );
}

export function GameContent() {
  const { open } = useWindowManager();
  const total = QUIZ_QUESTIONS.length;

  const [phase, setPhase] = useState<Phase>("welcome");
  const [state, setState] = useState<SelectionState>({
    questionIndex: 0,
    selectedIdx: null,
    revealed: false,
  });
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => Array(total).fill(null),
  );
  // Questions with answers shuffled per game, so the correct option doesn't
  // always land in the same slot.
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    () => [...QUIZ_QUESTIONS],
  );

  const currentQ = questions[state.questionIndex];

  const start = useCallback(() => {
    setPhase("playing");
    setState({ questionIndex: 0, selectedIdx: null, revealed: false });
    setAnswers(Array(total).fill(null));
    setQuestions(shuffleAnswers(QUIZ_QUESTIONS));
  }, [total]);

  const select = useCallback(
    (idx: number) => {
      setState((s) =>
        s.revealed ? s : { ...s, selectedIdx: idx, revealed: true },
      );
      setAnswers((prev) => {
        const next = [...prev];
        next[state.questionIndex] = idx;
        return next;
      });
    },
    [state.questionIndex],
  );

  const next = useCallback(() => {
    if (state.questionIndex >= total - 1) {
      setPhase("result");
      return;
    }
    setState((s) => ({
      questionIndex: s.questionIndex + 1,
      selectedIdx: null,
      revealed: false,
    }));
  }, [state.questionIndex, total]);

  const score = useMemo(() => {
    return answers.reduce<number>((acc, pick, i) => {
      if (pick == null) return acc;
      return acc + (questions[i].answers[pick].correct ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  // Keyboard: 1-4 to pick, Enter to advance, R to restart from result
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "welcome") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          start();
        }
        return;
      }
      if (phase === "playing") {
        if (!state.revealed) {
          const n = parseInt(e.key, 10);
          if (!Number.isNaN(n) && n >= 1 && n <= currentQ.answers.length) {
            e.preventDefault();
            select(n - 1);
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          next();
        }
        return;
      }
      if (phase === "result" && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, state.revealed, currentQ, select, next, start]);

  if (phase === "welcome") {
    return <WelcomeScreen onStart={start} />;
  }
  if (phase === "result") {
    return (
      <ResultScreen
        score={score}
        total={total}
        onRestart={start}
        onContact={() => open("contact")}
      />
    );
  }

  return (
    <QuestionCard
      question={currentQ}
      index={state.questionIndex}
      total={total}
      state={state}
      onSelect={select}
      onNext={next}
      isLast={state.questionIndex === total - 1}
    />
  );
}
