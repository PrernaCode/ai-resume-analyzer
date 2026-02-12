import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const colorClass = score > 69 ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    : score > 39 ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
      : "text-rose-400 bg-rose-500/10 border-rose-500/20";

  return (
    <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider shadow-sm", colorClass)}>
      <div className={`w-1.5 h-1.5 rounded-full ${score > 69 ? 'bg-emerald-400' : score > 39 ? 'bg-amber-400' : 'bg-rose-400'} shadow-[0_0_8px_currentColor]`}></div>
      {score}/100
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-1 group">
      <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="bg-white/5 backdrop-blur-sm w-full rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-white/5">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-3 items-center group/tip" key={index}>
            <div className={`p-1 rounded-md ${tip.type === "good" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={tip.type === 'good' ? "M5 13l4 4L19 7" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}></path>
              </svg>
            </div>
            <p className="text-sm font-bold text-slate-300 group-hover/tip:text-white transition-colors capitalize">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-3 rounded-2xl p-6 border transition-all duration-300 hover:translate-x-1",
              tip.type === "good"
                ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-50"
                : "bg-amber-500/5 border-amber-500/10 text-amber-50"
            )}
          >
            <div className="flex flex-row gap-3 items-center">
              <div className={`p-1.5 rounded-lg ${tip.type === "good" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={tip.type === 'good' ? "M5 13l4 4L19 7" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}></path>
                </svg>
              </div>
              <p className="text-lg font-black tracking-tight">{tip.tip}</p>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed pl-10 border-l border-white/5 ml-3.5">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;