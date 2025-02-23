"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BotIcon, Loader2Icon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import Markdown from "react-markdown";
import { useState } from "react";
import { generateAiReport } from "../(home)/_actions/generate-ia-report";
interface AiReportButtonPorops {
  hasProPlan: boolean;
  month: string;
}
const AiReportButton = ({ month, hasProPlan }: AiReportButtonPorops) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.log("Error while generating IA report:", error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full font-bold">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            {hasProPlan
              ? "Use inteligência artificial para gerar um relatório com insights sobre suas finanças."
              : "Assine o plano Pro para conseguir gerar relatórios por IA"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleGenerateReportClick}
            disabled={reportIsLoading || !hasProPlan}
          >
            {reportIsLoading && <Loader2Icon className="animated-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
