"use client";

import { useState, useCallback, useEffect } from "react";
import * as yaml from "js-yaml";
import { toast } from "sonner";
import { Copy, RotateCcw, ArrowLeftRight, FileCode, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SAMPLE_YAML = `# Sample YAML
name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: Springfield
  zip: "12345"
hobbies:
  - reading
  - coding
  - hiking
settings:
  notifications: true
  theme: dark
  language: en
`;

type DetectedFormat = "yaml" | "json" | "unknown";

function detectFormat(input: string): DetectedFormat {
  const trimmed = input.trim();
  if (!trimmed) return "unknown";
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  return "yaml";
}

function convertYamlToJson(input: string, pretty: boolean): string {
  const docs: unknown[] = [];
  yaml.loadAll(input, (doc) => {
    docs.push(doc);
  });
  const result = docs.length === 1 ? docs[0] : docs;
  return pretty
    ? JSON.stringify(result, null, 2)
    : JSON.stringify(result);
}

function convertJsonToYaml(input: string): string {
  const parsed = JSON.parse(input);
  return yaml.dump(parsed, { indent: 2, lineWidth: -1 });
}

interface ConversionState {
  output: string;
  error: string | null;
  inputFormat: DetectedFormat;
  outputFormat: DetectedFormat;
}

function convert(input: string, pretty: boolean): ConversionState {
  const trimmed = input.trim();
  if (!trimmed) {
    return { output: "", error: null, inputFormat: "unknown", outputFormat: "unknown" };
  }

  const inputFormat = detectFormat(trimmed);

  try {
    if (inputFormat === "json") {
      const output = convertJsonToYaml(trimmed);
      return { output, error: null, inputFormat: "json", outputFormat: "yaml" };
    } else {
      const output = convertYamlToJson(trimmed, pretty);
      return { output, error: null, inputFormat: "yaml", outputFormat: "json" };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      output: "",
      error: message,
      inputFormat,
      outputFormat: inputFormat === "json" ? "yaml" : "json",
    };
  }
}

const formatLabel: Record<DetectedFormat, string> = {
  yaml: "YAML",
  json: "JSON",
  unknown: "Auto",
};

const formatColor: Record<DetectedFormat, string> = {
  yaml: "bg-brand/10 text-brand border-brand/20",
  json: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
  unknown: "bg-muted text-muted-foreground border-border",
};

export function YamlJsonConverter() {
  const [input, setInput] = useState("");
  const [pretty, setPretty] = useState(true);
  const [state, setState] = useState<ConversionState>({
    output: "",
    error: null,
    inputFormat: "unknown",
    outputFormat: "unknown",
  });

  useEffect(() => {
    setState(convert(input, pretty));
  }, [input, pretty]);

  const handleSwap = useCallback(() => {
    if (state.output) {
      setInput(state.output);
    }
  }, [state.output]);

  const handleCopy = useCallback(() => {
    if (!state.output) return;
    navigator.clipboard.writeText(state.output).then(() => {
      toast.success("Copied to clipboard!");
    });
  }, [state.output]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_YAML);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleSample}>
            <FileCode className="h-4 w-4 mr-1.5" />
            Load Sample
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={pretty ? "default" : "outline"}
            size="sm"
            onClick={() => setPretty((p) => !p)}
            title="Toggle pretty-print for JSON output"
          >
            <AlignJustify className="h-4 w-4 mr-1.5" />
            {pretty ? "Pretty" : "Compact"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSwap} disabled={!state.output}>
            <ArrowLeftRight className="h-4 w-4 mr-1.5" />
            Swap
          </Button>
          <Button
            size="sm"
            onClick={handleCopy}
            disabled={!state.output}
            className="bg-gradient-to-r from-brand to-brand-accent text-white"
          >
            <Copy className="h-4 w-4 mr-1.5" />
            Copy Output
          </Button>
        </div>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Panel */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Input</span>
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${formatColor[state.inputFormat]}`}
              >
                {formatLabel[state.inputFormat]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste YAML or JSON here..."
              spellCheck={false}
              className="w-full h-96 min-h-64 resize-y rounded-b-lg bg-transparent px-4 pb-4 font-mono text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Output</span>
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${formatColor[state.outputFormat]}`}
              >
                {formatLabel[state.outputFormat]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {state.error ? (
              <div className="px-4 pb-4">
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">Syntax Error</p>
                  <pre className="text-xs text-destructive/80 whitespace-pre-wrap break-all font-mono">
                    {state.error}
                  </pre>
                </div>
              </div>
            ) : (
              <textarea
                value={state.output}
                readOnly
                placeholder="Converted output will appear here..."
                spellCheck={false}
                className="w-full h-96 min-h-64 resize-y rounded-b-lg bg-transparent px-4 pb-4 font-mono text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Bar */}
      {input.trim() && !state.error && state.output && (
        <p className="text-xs text-center text-muted-foreground">
          Converted{" "}
          <span className="font-medium text-foreground">
            {formatLabel[state.inputFormat]}
          </span>{" "}
          →{" "}
          <span className="font-medium text-foreground">
            {formatLabel[state.outputFormat]}
          </span>{" "}
          &middot; {state.output.length.toLocaleString()} chars &middot; 100% client-side
        </p>
      )}
    </div>
  );
}
