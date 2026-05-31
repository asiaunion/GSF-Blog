import React, { useState, useEffect, useCallback, useRef } from "react";

/**
 * EditorToolbar — Milkdown Crepe용 커스텀 React 툴바
 * Milkdown의 commandsCtx + callCommand 패턴으로 포맷팅 명령 실행
 */

interface ToolbarProps {
  crepeRef: React.MutableRefObject<any>;
}

// 버튼 레이블 스타일 타입
type ButtonStyle = "normal" | "bold" | "italic" | "strike" | "mono";

type ToolButton = {
  type: "button";
  id: string;
  label: string;
  title: string;
  commandKey: string; // Milkdown command key 이름
  markName?: string; // 활성 상태 체크용 mark 이름
  style?: ButtonStyle;
};

type ToolSeparator = { type: "separator" };
type ToolItem = ToolButton | ToolSeparator;

const TOOLS: ToolItem[] = [
  { type: "button", id: "bold",        label: "B",    title: "굵게 (Cmd+B)",   commandKey: "toggleStrongCommand",        markName: "strong",        style: "bold" },
  { type: "button", id: "italic",      label: "I",    title: "기울임 (Cmd+I)", commandKey: "toggleEmphasisCommand",      markName: "emphasis",      style: "italic" },
  { type: "button", id: "strike",      label: "S",    title: "취소선",          commandKey: "toggleStrikethroughCommand", markName: "strikethrough", style: "strike" },
  { type: "button", id: "code-inline", label: "</>",  title: "인라인 코드",     commandKey: "toggleInlineCodeCommand",    markName: "code_inline",   style: "mono" },
  { type: "separator" },
  { type: "button", id: "h1",          label: "H1",   title: "제목 1",          commandKey: "wrapInHeadingCommand_1" },
  { type: "button", id: "h2",          label: "H2",   title: "제목 2",          commandKey: "wrapInHeadingCommand_2" },
  { type: "button", id: "h3",          label: "H3",   title: "제목 3",          commandKey: "wrapInHeadingCommand_3" },
  { type: "separator" },
  { type: "button", id: "bullet",      label: "• ≡",  title: "글머리 기호",     commandKey: "wrapInBulletListCommand" },
  { type: "button", id: "ordered",     label: "1. ≡", title: "번호 목록",       commandKey: "wrapInOrderedListCommand" },
  { type: "button", id: "blockquote",  label: "❝",    title: "인용구",          commandKey: "wrapInBlockquoteCommand" },
  { type: "separator" },
  { type: "button", id: "code-block",  label: "{ }",  title: "코드 블록",       commandKey: "createCodeBlockCommand",   style: "mono" },
  { type: "button", id: "hr",          label: "─",    title: "구분선",          commandKey: "insertHrCommand" },
];

export default function EditorToolbar({ crepeRef }: ToolbarProps) {
  const [activeMarks, setActiveMarks] = useState<Set<string>>(new Set());
  // command key → actual key 매핑 (런타임에 동적 수집)
  const commandKeysRef = useRef<Record<string, any>>({});

  // Milkdown 커맨드 키 레퍼런스 수집 (모듈 로드 후 한 번)
  useEffect(() => {
    let cancelled = false;
    async function collectKeys() {
      try {
        const [commonmark, gfm] = await Promise.all([
          import("@milkdown/kit/preset/commonmark"),
          import("@milkdown/kit/preset/gfm").catch(() => ({})),
        ]);

        if (cancelled) return;

        commandKeysRef.current = {
          toggleStrongCommand:        (commonmark as any).toggleStrongCommand,
          toggleEmphasisCommand:      (commonmark as any).toggleEmphasisCommand,
          toggleInlineCodeCommand:    (commonmark as any).toggleInlineCodeCommand,
          wrapInBulletListCommand:    (commonmark as any).wrapInBulletListCommand,
          wrapInOrderedListCommand:   (commonmark as any).wrapInOrderedListCommand,
          wrapInBlockquoteCommand:    (commonmark as any).wrapInBlockquoteCommand,
          createCodeBlockCommand:     (commonmark as any).createCodeBlockCommand,
          insertHrCommand:            (commonmark as any).insertHrCommand,
          // heading은 payload가 필요한 setBlockTypeCommand 계열
          wrapInHeadingCommand_1:     { key: "TurnIntoHeading", payload: 1 },
          wrapInHeadingCommand_2:     { key: "TurnIntoHeading", payload: 2 },
          wrapInHeadingCommand_3:     { key: "TurnIntoHeading", payload: 3 },
          toggleStrikethroughCommand: (gfm as any).toggleStrikethroughCommand,
        };
      } catch {
        // silent fail
      }
    }
    collectKeys();
    return () => { cancelled = true; };
  }, []);

  // 선택 영역의 활성 마크 주기적 감지 (200ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const crepe = crepeRef.current;
      if (!crepe?.editor) return;
      try {
        crepe.editor.action((ctx: any) => {
          const { commandsCtx, editorViewCtx } = {
            commandsCtx: null,
            editorViewCtx: null,
          };
          try {
            const view = ctx.get("editorView");
            if (!view) return;
            const { state } = view;
            const { from, to, empty } = state.selection;
            const marks = new Set<string>();
            if (!empty) {
              state.doc.nodesBetween(from, to, (node: any) => {
                node.marks?.forEach((m: any) => marks.add(m.type.name));
              });
            } else {
              // 커서 위치의 stored marks
              state.storedMarks?.forEach((m: any) => marks.add(m.type.name));
            }
            setActiveMarks(marks);
          } catch {/* ignore */}
        });
      } catch {/* ignore */}
    }, 200);
    return () => clearInterval(interval);
  }, [crepeRef]);

  const runCommand = useCallback((commandKey: string) => {
    const crepe = crepeRef.current;
    if (!crepe?.editor) return;

    const cmdRef = commandKeysRef.current[commandKey];
    if (!cmdRef) return;

    try {
      crepe.editor.action((ctx: any) => {
        try {
          const commands = ctx.get("commands");
          if (!commands) return;

          if (cmdRef.key && cmdRef.payload !== undefined) {
            // heading: payload가 있는 커맨드
            commands.call(cmdRef.key, cmdRef.payload);
          } else if (cmdRef.key) {
            commands.call(cmdRef.key);
          }
        } catch {/* ignore */}
      });
    } catch {/* ignore */}
  }, [crepeRef]);

  return (
    <div
      className="flex items-center gap-0.5 px-2 py-1 bg-muted/60 border border-border rounded-xl mb-1.5 flex-wrap"
      role="toolbar"
      aria-label="텍스트 서식"
      // 툴바 클릭 시 에디터 포커스 유지 (mousedown의 기본 포커스 이동 방지)
      onMouseDown={(e) => e.preventDefault()}
    >
      {TOOLS.map((tool, idx) => {
        if (tool.type === "separator") {
          return (
            <div
              key={`sep-${idx}`}
              className="w-px h-4 bg-border/70 mx-1 shrink-0"
              aria-hidden
            />
          );
        }

        const isActive = tool.markName ? activeMarks.has(tool.markName) : false;

        return (
          <button
            key={tool.id}
            type="button"
            title={tool.title}
            aria-label={tool.title}
            aria-pressed={isActive}
            onMouseDown={(e) => {
              e.preventDefault(); // 에디터 포커스 빼앗기지 않음
              runCommand(tool.commandKey);
            }}
            className={[
              "px-2 py-0.5 min-w-[28px] text-center rounded-md text-[11px] transition-all duration-100 cursor-pointer select-none",
              isActive
                ? "bg-accent/90 text-background font-bold"
                : "text-foreground/60 hover:bg-card-bg hover:text-foreground",
              tool.style === "bold"   ? "font-black" : "",
              tool.style === "italic" ? "italic" : "",
              tool.style === "strike" ? "line-through" : "",
              tool.style === "mono"   ? "font-mono text-[10px]" : "",
            ].filter(Boolean).join(" ")}
          >
            {tool.label}
          </button>
        );
      })}
    </div>
  );
}
