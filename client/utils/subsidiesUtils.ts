// Subsidies and government incentives utilities

export interface Subsidy {
  id: string;
  name: string;
  description: string;
  applicableFor: string[]; // "solar" or "rtrwh"
  eligibleStates: string[];
  subsidyPercentage: number;
  maxSubsidyAmount: number;
  officialLink: string;
  contactEmail: string;
  deadline?: string;
  documents: string[];
  applicationProcess: string[];
}

export interface StateSubsidies {
  state: string;
  subsidies: Subsidy[];
  totalPotentialSubsidy: number;
}

// Mock GovtSubsidyAPI - simulates government subsidy data
export const getSubsidiesForState = async (
  state: string,
  assessmentType?: "solar" | "rtrwh" | "both",
): Promise<StateSubsidies> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const stateSubsidies: Record<string, Subsidy[]> = {
    Rajasthan: [
      {
        id: "s1",
        name: "Mukhyamantri Solar Pumps Yojana",
        description:
          "Subsidized solar pump installation for farmers with up to 90% subsidy for weaker sections",
        applicableFor: ["solar"],
        eligibleStates: ["Rajasthan"],
        subsidyPercentage: 60,
        maxSubsidyAmount: 500000,
        officialLink: "https://agriculture.rajasthan.gov.in",
        contactEmail: "solar@rajasthan.gov.in",
        documents: [
          "Land documents",
          "Identity proof",
          "Recent electricity bill",
        ],
        applicationProcess: [
          "Visit AECL office",
          "Submit application with documents",
          "Site inspection by AECL",
          "Approval and subsidy disbursement",
        ],
      },
      {
        id: "s2",
        name: "Rajasthan Solar Energy Policy 2019",
        description:
          "Net metering and power purchase agreement for grid-connected systems",
        applicableFor: ["solar"],
        eligibleStates: ["Rajasthan"],
        subsidyPercentage: 0,
        maxSubsidyAmount: 0,
        officialLink: "https://mnre.gov.in",
        contactEmail: "renewable@rajasthan.gov.in",
        documents: ["Property documents", "Electrical drawings"],
        applicationProcess: [
          "Apply to DISCOM",
          "Technical approval",
          "Grid connection",
        ],
      },
      {
        id: "s3",
        name: "PM-KUSUM Yojana (Central Scheme)",
        description:
          "Central government subsidy for solar and other renewable installations - Up to 40% for residential",
        applicableFor: ["solar", "rtrwh"],
        eligibleStates: ["Rajasthan"],
        subsidyPercentage: 40,
        maxSubsidyAmount: 500000,
        officialLink: "https://mnre.gov.in/pm-kusum-yojana",
        contactEmail: "pmkusum@mnre.gov.in",
        documents: [
          "Aadhar card",
          "Land ownership proof",
          "Bank account details",
        ],
        applicationProcess: [
          "Register on MNRE portal",
          "Submit proposal",
          "Technical evaluation",
          "Approval and implementation",
        ],
      },
      {
        id: "s4",
        name: "Rajasthan Water Conservation Subsidy",
        description:
          "Government subsidy for rainwater harvesting structures - Up to 50% subsidy available",
        applicableFor: ["rtrwh"],
        eligibleStates: ["Rajasthan"],
        subsidyPercentage: 50,
        maxSubsidyAmount: 100000,
        officialLink: "https://water.rajasthan.gov.in",
        contactEmail: "rtwh@water.rajasthan.gov.in",
        documents: ["Building plan", "Land survey report", "Bank details"],
        applicationProcess: [
          "Contact Water Resource Department",
          "Site survey",
          "Proposal submission",
          "Approval and fund disbursement",
        ],
      },
    ],
    Gujarat: [
      {
        id: "g1",
        name: "Solar Rooftop Subsidy Scheme",
        description:
          "50% subsidy on solar rooftop systems for residential consumers in Gujarat",
        applicableFor: ["solar"],
        eligibleStates: ["Gujarat"],
        subsidyPercentage: 50,
        maxSubsidyAmount: 450000,
        officialLink: "https://gsecl.in",
        contactEmail: "solarrooftop@gsecl.in",
        documents: ["Consumer number", "Property tax receipt", "ID proof"],
        applicationProcess: [
          "Apply through GSECL portal",
          "Get quote from approved installer",
          "Submit application with documents",
          "Inspection and approval",
        ],
      },
      {
        id: "g2",
        name: "Jal Bhagirathi Scheme - RTRWH Component",
        description:
          "Subsidy for water harvesting structures as part of Jal Bhagirathi",
        applicableFor: ["rtrwh"],
        eligibleStates: ["Gujarat"],
        subsidyPercentage: 60,
        maxSubsidyAmount: 120000,
        officialLink: "https://water.gujaratindia.gov.in",
        contactEmail: "jalbhagirathi@wrd.gov.in",
        documents: [
          "Revenue papers",
          "Project feasibility report",
          "Design drawings",
        ],
        applicationProcess: [
          "Registration with Water Resources Department",
          "Design approval",
          "Construction & inspection",
          "Completion certificate & subsidy disbursement",
        ],
      },
    ],
    Maharashtra: [
      {
        id: "m1",
        name: "Pradhan Mantri Kisan Urja Suraksha Evam Utthaan Mahabhiyan",
        description: "Subsidized solar for agricultural and residential use",
        applicableFor: ["solar"],
        eligibleStates: ["Maharashtra"],
        subsidyPercentage: 40,
        maxSubsidyAmount: 500000,
        officialLink: "https://pmkusum.mnre.gov.in",
        contactEmail: "pmkusum@maharashtra.gov.in",
        documents: ["Aadhaar", "Land certificate", "Encumbrance certificate"],
        applicationProcess: [
          "Online registration",
          "Technical scrutiny",
          "Approval",
          "Subsidy disbursement",
        ],
      },
      {
        id: "m2",
        name: "Water Security, Harvesting, Awareness, Conservation and Training (WHACT)",
        description: "RTRWH and water conservation subsidy in Maharashtra",
        applicableFor: ["rtrwh"],
        eligibleStates: ["Maharashtra"],
        subsidyPercentage: 50,
        maxSubsidyAmount: 150000,
        officialLink: "https://water.maharashtra.gov.in",
        contactEmail: "whact@water.maharashtra.gov.in",
        documents: ["Survey report", "Cost estimate", "Design plan"],
        applicationProcess: [
          "Approach district water authority",
          "Submit proposal",
          "Site inspection",
          "Approval & implementation",
        ],
      },
    ],
    Karnataka: [
      {
        id: "k1",
        name: "Karnataka Solar Policy 2014-2024",
        description:
          "Accelerated depreciation and tax benefits for solar installations",
        applicableFor: ["solar"],
        eligibleStates: ["Karnataka"],
        subsidyPercentage: 0,
        maxSubsidyAmount: 0,
        officialLink: "https://kredl.karnataka.gov.in",
        contactEmail: "info@kredl.karnataka.gov.in",
        documents: [
          "Factory registration",
          "Land documents",
          "Technical design",
        ],
        applicationProcess: [
          "Register with KREDL",
          "Technical approval",
          "Investment monitoring",
        ],
      },
      {
        id: "k2",
        name: "RTRWH Subsidy - Karnataka",
        description:
          "Government of Karnataka provides subsidy for rainwater harvesting systems",
        applicableFor: ["rtrwh"],
        eligibleStates: ["Karnataka"],
        subsidyPercentage: 40,
        maxSubsidyAmount: 100000,
        officialLink: "https://groundwater.karnataka.gov.in",
        contactEmail: "rtrwh@karnataka.gov.in",
        documents: ["Patta extract", "Sketch plan", "Cost estimate"],
        applicationProcess: [
          "District office application",
          "Technical review",
          "On-site inspection",
          "Subsidy approval",
        ],
      },
    ],
    "Tamil Nadu": [
      {
        id: "tn1",
        name: "Gross National Happiness (GNH) Solar Programme",
        description:
          "Subsidized solar installations for households in Tamil Nadu",
        applicableFor: ["solar"],
        eligibleStates: ["Tamil Nadu"],
        subsidyPercentage: 50,
        maxSubsidyAmount: 400000,
        officialLink: "https://tangedco.gov.in",
        contactEmail: "solar@tangedco.gov.in",
        documents: ["Consumer ID", "Electricity bill", "Identity proof"],
        applicationProcess: [
          "TANGEDCO portal registration",
          "Installer selection",
          "Subsidy processing",
          "Installation & inspection",
        ],
      },
      {
        id: "tn2",
        name: "Tamil Nadu Water Resources Subsidy",
        description: "Subsidy for rainwater harvesting and water conservation",
        applicableFor: ["rtrwh"],
        eligibleStates: ["Tamil Nadu"],
        subsidyPercentage: 50,
        maxSubsidyAmount: 100000,
        officialLink: "https://www.tn.gov.in/wrd",
        contactEmail: "wrd@tn.gov.in",
        documents: ["Land title", "Design details", "Cost quote"],
        applicationProcess: [
          "WRD office application",
          "Design approval",
          "Implementation",
          "Completion inspection",
        ],
      },
    ],
  };

  // Fallback for other states
  const defaultSubsidies: Subsidy[] = [
    {
      id: "default1",
      name: "PM-KUSUM Yojana (Central Scheme)",
      description:
        "Central government subsidy for solar and renewable installations - Up to 40% for residential",
      applicableFor: ["solar", "rtrwh"],
      eligibleStates: [], // Available across India
      subsidyPercentage: 40,
      maxSubsidyAmount: 500000,
      officialLink: "https://pmkusum.mnre.gov.in",
      contactEmail: "pmkusum@mnre.gov.in",
      documents: ["Aadhar", "Land documents", "Bank details"],
      applicationProcess: [
        "Register on MNRE portal",
        "Submit proposal",
        "Evaluation",
        "Approval & implementation",
      ],
    },
    {
      id: "default2",
      name: "MNREGA Water Harvesting",
      description:
        "Employment-linked subsidy for water harvesting structures under MNREGA",
      applicableFor: ["rtrwh"],
      eligibleStates: [],
      subsidyPercentage: 100,
      maxSubsidyAmount: 200000,
      officialLink: "https://nrega.nic.in",
      contactEmail: "nrega@nic.in",
      documents: ["Job card", "Land proof", "Project proposal"],
      applicationProcess: [
        "Village council application",
        "Project approval",
        "Implementation",
        "Wage disbursement",
      ],
    },
  ];

  const subsidies = stateSubsidies[state] || defaultSubsidies;

  // Filter by assessment type if specified
  let filtered = subsidies;
  if (assessmentType && assessmentType !== "both") {
    filtered = subsidies.filter((s) =>
      s.applicableFor.includes(assessmentType),
    );
  }

  // Calculate total potential subsidy
  const totalSubsidy = filtered.reduce((sum, s) => sum + s.maxSubsidyAmount, 0);

  return {
    state: state || "Pan-India",
    subsidies: filtered,
    totalPotentialSubsidy: totalSubsidy,
  };
};
