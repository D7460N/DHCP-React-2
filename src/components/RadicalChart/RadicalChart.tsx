import { useEffect, useState } from "react";
import axios from 'axios';
import { Cell, Label, Pie, PieChart,} from "recharts";

type LabelProps = {
  viewBox?: {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    clockWise: boolean;
  };
};

interface ComplianceScore {
  teamId: string;
  totalResources: number;
  compliantResources: number;
  nonCompliantResources: number;
  complianceScore?: number;
}

export default function RadialChart() {
  const [complianceData, setComplianceData] = useState<ComplianceScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const SCORE_COLOR = "#12678B";
  useEffect(() => {
    const fetchComplianceScore = async () => {
      try {
        const response = await axios.get<ComplianceScore>('http://localhost:5110/api/Compliance/score?teamId=1');
        setComplianceData(response.data);
      } catch (err) {
        setError('Failed to fetch compliance score');
        console.error('Error fetching compliance score', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplianceScore();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!complianceData) return <div className="p-6">No data available</div>;

  const score = Math.round(complianceData.complianceScore);
  const data = [
    { name: 'score', value: score },
    { name: 'remaining', value: 100 - score }
  ];

  return (
    <div className="p-6">
      <h3 className="font-bold mb-2">Compliance Scan</h3>
      <p className="mb-6">Analyze your infrastructure's adherence to defined policies across cloud resources.</p>
      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={150}
            cy={150}
            innerRadius={100}
            outerRadius={120}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            >
            <Cell key="score" fill={SCORE_COLOR} />
            <Cell key="remaining" fill="#E5E7EB" />
            <Label
              content={() => {
                return (
                  <text
                    x={150}
                    y={150}
                    fill={SCORE_COLOR}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={48}
                    >
                    {score}
                  </text>
                );
              }}
              />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
