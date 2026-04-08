import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GuideProps {
  systemSize: string;
  rechargeStructures: { type: string; dimensions: string }[];
}

export function InstallationGuide({
  systemSize,
  rechargeStructures,
}: GuideProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>RTRWH Installation Guide</span>
          <Badge variant="secondary">{systemSize}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="pre">
            <AccordionTrigger>1. Pre‑installation checks</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Verify roof integrity, slope, and outlet locations</li>
                <li>Confirm inlet filtration and first‑flush provisions</li>
                <li>
                  Mark safe routing for downpipes and recharge connections
                </li>
                <li>Obtain required permits/NOC if applicable</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="design">
            <AccordionTrigger>2. System design parameters</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  Storage tank sizing: 25–35% of annual harvest potential spread
                  across seasons
                </li>
                <li>
                  Filter media: graded gravel (20–40 mm), coarse sand (0.6–1 mm)
                </li>
                <li>
                  First‑flush diverter capacity: 0.5–1 mm rainfall equivalent
                </li>
                <li>Overflow routing to recharge structure(s)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="recharge">
            <AccordionTrigger>3. Recharge structures</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {rechargeStructures.map((s, i) => (
                  <div key={i} className="text-sm">
                    <div className="font-medium">{s.type}</div>
                    <div className="text-gray-600">
                      Dimensions: {s.dimensions}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="construction">
            <AccordionTrigger>4. Construction sequence</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>Install gutters/downpipes and leaf guards</li>
                <li>Fit first‑flush and inline filter unit</li>
                <li>Construct storage tank with vent and inspection hatch</li>
                <li>
                  Excavate and build recharge pit/trench/shaft as designed
                </li>
                <li>Connect overflow to recharge; provide silt trap</li>
                <li>Commission and test for leaks and flow</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="om">
            <AccordionTrigger>5. O&M schedule</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  Pre‑monsoon: clean roof, gutters, filters; test diverter
                </li>
                <li>During monsoon: inspect fortnightly; clear debris</li>
                <li>
                  Post‑monsoon: desludge silt trap; inspect recharge structure
                </li>
                <li>
                  Annual: check tank coating, valves, and pipeline integrity
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
export default InstallationGuide;
