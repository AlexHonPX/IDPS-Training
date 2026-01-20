import { CourseData } from '../types';

export const courseData: CourseData = {
  title: "Automotive IDPS: Intrusion Detection & Prevention",
  author: "PlaxidityX",
  modules: [
    {
      id: "m1",
      title: "1. Introduction to IDPS",
      shortTitle: "IDPS Fundamentals",
      duration: "5 min",
      sections: [
        {
          type: "text",
          content: "In the rapidly evolving landscape of automotive technology, cybersecurity is no longer optional—it is a safety requirement. An Intrusion Detection and Prevention System (IDPS) acts as the immune system of the vehicle, monitoring for threats and neutralizing them."
        },
        {
          type: "comparison",
          title: "IDS vs. IPS: What is the difference?",
          comparisonLeft: {
            title: "IDS (Detection)",
            points: [
              "Passive Monitoring: Listens to network traffic without interfering.",
              "Alerting: Logs events and flags anomalies to the backend (SOC).",
              "Low Latency Impact: Does not delay message processing.",
              "Use Case: Compliance reporting, fleet monitoring, post-incident forensics."
            ]
          },
          comparisonRight: {
            title: "IPS (Prevention)",
            points: [
              "Active Defense: Sits in-line with traffic flow.",
              "Blocking: Can drop malicious packets or disable compromised functionalities.",
              "Criticality: Must be extremely precise (zero false positives) to avoid safety hazards.",
              "Use Case: Blocking defined attacks, firewalling, network segmentation."
            ]
          }
        },
        {
          type: "diagram",
          title: "Evolution of Vehicle Architecture",
          content: "As vehicles move from legacy architecture to Software Defined Vehicles (SDV), the attack surface grows.",
          diagramNodes: [
            { label: "Legacy: Distributed ECUs", type: "component", description: "Hundreds of isolated ECUs. Hard to update." },
            { label: "Current: Domain Architecture", type: "network", description: "Grouped by function (Chassis, Infotainment). Gateway acts as a chokepoint." },
            { label: "Future: Zonal / SDV", type: "component", description: "Central Compute + Zonal Gateways. High-speed Ethernet. Heavy Software Reliance." }
          ]
        }
      ],
      quiz: {
        question: "Which system is capable of actively dropping a malicious packet to stop an attack?",
        options: [
          { id: "a", text: "IPS (Intrusion Prevention System)", isCorrect: true },
          { id: "b", text: "IDS (Intrusion Detection System)", isCorrect: false },
          { id: "c", text: "OBD-II Port", isCorrect: false }
        ],
        explanation: "An IPS (Prevention System) is active and can block traffic. An IDS only monitors and alerts."
      }
    },
    {
      id: "m2",
      title: "2. Automotive IDPS – General Applications",
      shortTitle: "Vehicle Applications",
      duration: "6 min",
      sections: [
        {
          type: "text",
          content: "IDPS solutions are deployed across various layers of the vehicle to provide defense-in-depth. They must understand specific automotive protocols."
        },
        {
          type: "list",
          title: "In-Vehicle Networks & Protocols",
          content: [
            "CAN / CAN FD: The backbone of vehicle control. IDPS looks for sequence errors, unauthorized IDs, or flooding.",
            "Automotive Ethernet: High bandwidth for ADAS/Infotainment. IDPS inspects IP/TCP/UDP headers and payloads.",
            "LIN: Low-speed bus for windows/wipers. Simple, but still a vector for local manipulation.",
            "FlexRay: Time-triggered, high-reliability communications for chassis control."
          ]
        },
        {
          type: "diagram",
          title: "Where does IDPS sit?",
          content: "IDPS agents are often embedded directly into high-value targets.",
          diagramNodes: [
            { label: "Telematics Unit (T-Box)", type: "component", description: "First line of defense against external cellular attacks." },
            { label: "Central Gateway", type: "network", description: "Monitors traffic routing between domains. Ideal for network-based IDS." },
            { label: "IVI (Infotainment)", type: "component", description: "Protects user data and prevents lateral movement to safety domains." },
            { label: "ADAS ECU", type: "component", description: "Ensures sensor data integrity (camera/lidar) is not spoofed." }
          ]
        }
      ],
      quiz: {
        question: "Why is the Telematics Unit (T-Box) a critical location for IDPS?",
        options: [
          { id: "a", text: "It controls the engine directly.", isCorrect: false },
          { id: "b", text: "It uses the LIN protocol exclusively.", isCorrect: false },
          { id: "c", text: "It is the primary interface for external connectivity (Cellular/Cloud).", isCorrect: true }
        ],
        explanation: "The T-Box connects the car to the outside world (4G/5G), making it the primary entry point for remote attackers."
      }
    },
    {
      id: "m3",
      title: "3. Final Usage & Operational Scenarios",
      shortTitle: "Operational Scenarios",
      duration: "7 min",
      sections: [
        {
          type: "text",
          content: "An IDPS is not a set-and-forget tool. It is part of a larger operational lifecycle involving the Vehicle Security Operations Center (VSOC)."
        },
        {
          type: "diagram",
          title: "The Detection Loop",
          content: "From the vehicle to the cloud and back.",
          diagramNodes: [
            { label: "Vehicle", type: "component", description: "1. Anomaly Detected (e.g., unexpected brake signal)." },
            { label: "IDPS Agent", type: "action", description: "2. Log event. Create small footprint alert." },
            { label: "Cloud / VSOC", type: "network", description: "3. Aggregate alerts from 100k vehicles. Analyze patterns." },
            { label: "Response", type: "action", description: "4. Deploy Over-The-Air (OTA) patch or updated IDPS rules." }
          ]
        },
        {
          type: "list",
          title: "Operational Goals",
          content: [
            "Real-time Threat Detection: Immediate awareness of safety-critical attacks.",
            "Fleet-level Visibility: determining if a threat is an isolated incident or a fleet-wide zero-day exploit.",
            "Forensics: Using IDPS logs to reconstruct accidents or cyber-incidents."
          ]
        },
        {
          type: "alert",
          title: "The Human in the Loop",
          content: "While IDPS automates detection, the VSOC analyst provides the critical 'Human Intelligence'. They distinguish between a false positive (e.g., a mechanic using a diagnostic tool) and a true malicious intrusion, ensuring that the response—such as an OTA update or fleet recall—is appropriate."
        }
      ],
      quiz: {
        question: "What is the primary function of the Cloud/VSOC in the IDPS ecosystem?",
        options: [
          { id: "a", text: "To aggregate alerts from the fleet and analyze patterns for broad response.", isCorrect: true },
          { id: "b", text: "To replace the engine control unit.", isCorrect: false },
          { id: "c", text: "To physically block the brakes in real-time.", isCorrect: false }
        ],
        explanation: "The VSOC (Vehicle Security Operations Center) aggregates data from thousands of vehicles to identify fleet-wide trends, new attack patterns, and manage incident response."
      }
    },
    {
      id: "m4",
      title: "4. Standards, Regulations & Compliance",
      shortTitle: "Standards & Regs",
      duration: "5 min",
      sections: [
        {
          type: "alert",
          title: "Regulatory Pressure",
          content: "Automotive cybersecurity is now a legal requirement for type approval in many markets (UNECE)."
        },
        {
          type: "list",
          title: "Key Regulations",
          content: [
            "UNECE R155 (CSMS): Requires OEMs to detect and respond to cyber threats on vehicle types. IDPS is the primary technical control for 'Detect' and 'Respond'.",
            "UNECE R156 (SUMS): Governs software updates. IDPS ensures the update process itself isn't exploited.",
            "ISO/SAE 21434: The engineering standard. IDPS serves as a risk reduction measure during the TARA (Threat Analysis and Risk Assessment) process."
          ]
        },
        {
          type: "text",
          content: "Compliance is ongoing. An IDPS allows OEMs to prove they are monitoring their fleet throughout the vehicle lifecycle (up to 15+ years)."
        }
      ],
      quiz: {
        question: "Which regulation explicitly requires the capability to detect and respond to cyber threats?",
        options: [
          { id: "a", text: "ISO 9001", isCorrect: false },
          { id: "b", text: "GDPR", isCorrect: false },
          { id: "c", text: "UNECE R155", isCorrect: true }
        ],
        explanation: "UNECE R155 mandates a Cyber Security Management System (CSMS) including detection and response capabilities."
      }
    },
    {
      id: "m5",
      title: "5. Detection & Protection Mechanisms",
      shortTitle: "Detection Tech",
      duration: "8 min",
      sections: [
        {
          type: "text",
          content: "How does the software actually know something is wrong? Modern IDPS engines use hybrid approaches."
        },
        {
          type: "comparison",
          title: "Signature vs. Anomaly vs. Behavioral",
          comparisonLeft: {
            title: "Deterministic (Signature/Rules)",
            points: [
              "Matches known bad patterns.",
              "Example: 'If CAN ID 0x123 has DLC > 8, block it'.",
              "Pros: Low false positives, fast.",
              "Cons: Cannot detect new (zero-day) attacks."
            ]
          },
          comparisonRight: {
            title: "Heuristic (Anomaly/Behavior)",
            points: [
              "Learns 'normal' baseline behavior.",
              "Example: 'Radio ECU usually talks 10 times/sec. Now it's talking 1000 times/sec'.",
              "Pros: Detects unknown attacks.",
              "Cons: Higher risk of false positives."
            ]
          }
        },
        {
          type: "text",
          title: "The Challenge of False Positives",
          content: "In automotive safety, a False Positive is critical. If an IPS incorrectly identifies a legitimate brake signal as an attack and blocks it, the security system itself becomes a safety hazard. This is why Anomaly detection is often used in 'Detection Mode' (IDS) first, while 'Prevention Mode' (IPS) is reserved for high-confidence signatures."
        },
        {
          type: "list",
          title: "Protection Strategies (IPS)",
          content: [
            "Blocking: Dropping the packet immediately (requires gateway integration).",
            "Degradation Mode: Forcing the vehicle into 'Limp Home' mode if critical systems are compromised.",
            "Sandboxing: Restarting a compromised process (e.g., in the Infotainment system)."
          ]
        }
      ],
      quiz: {
        question: "Which detection method is best suited for identifying a 'Zero-Day' attack (a never-before-seen threat)?",
        options: [
          { id: "a", text: "Heuristic (Anomaly-based) detection", isCorrect: true },
          { id: "b", text: "Signature-based detection", isCorrect: false },
          { id: "c", text: "Firewall allow-listing", isCorrect: false }
        ],
        explanation: "Signature detection relies on knowing the attack pattern beforehand. Heuristic detection monitors for abnormal behavior, allowing it to spot attacks that have never been defined before."
      }
    },
    {
      id: "m6",
      title: "6. Risks of Not Implementing IDPS",
      shortTitle: "Risk Landscape",
      duration: "5 min",
      sections: [
        {
          type: "alert",
          title: "The Cost of Inaction",
          content: "Without IDPS, a vehicle is a 'black box'. You won't know you are hacked until it is too late."
        },
        {
          type: "diagram",
          title: "Risk Landscape",
          content: "Impact areas of a successful cyber attack.",
          diagramNodes: [
            { label: "Safety", type: "threat", description: "Steering/Braking manipulation. Loss of life." },
            { label: "Financial", type: "threat", description: "Massive recalls. Ransomware on fleet." },
            { label: "Legal", type: "threat", description: "Loss of type approval (cannot sell cars). Lawsuits." },
            { label: "Brand", type: "threat", description: "Loss of customer trust. 'The car that gets hacked'." }
          ]
        },
        {
          type: "text",
          title: "Lateral Movement & The Multiplier Effect",
          content: "The greatest risk is not just the entry point, but 'Lateral Movement'. An attacker entering through a low-risk system (like the Radio or Tire Pressure Sensors) moves through the network to control high-risk systems (Brakes). IDPS at the Gateway level is the only way to stop this internal traversal."
        }
      ],
      quiz: {
        question: "What does 'Lateral Movement' refer to in a vehicle cyberattack?",
        options: [
          { id: "a", text: "The car physically drifting out of its lane.", isCorrect: false },
          { id: "b", text: "Moving data from the car to the cloud.", isCorrect: false },
          { id: "c", text: "An attacker moving from a compromised component (like Infotainment) to a critical component (like Brakes).", isCorrect: true }
        ],
        explanation: "Lateral movement describes the attacker's journey inside the internal network, pivoting from a weak entry point to their ultimate target."
      }
    },
    {
      id: "m7",
      title: "7. Case Study: The 2015 Jeep Cherokee Hack",
      shortTitle: "Case Study: Jeep 2015",
      duration: "8 min",
      sections: [
        {
          type: "text",
          content: "In 2015, security researchers Charlie Miller and Chris Valasek demonstrated a remote, zero-day exploit against a Jeep Cherokee. This pivotal moment in automotive history proved that road vehicles could be remotely controlled through cellular networks, leading to a recall of 1.4 million vehicles."
        },
        {
          type: "alert",
          title: "The Attack Vector",
          content: "The researchers entered via the Uconnect infotainment system using the Sprint cellular network. They pivoted from the radio to the V850 gateway controller, reprogrammed it, and were then able to send spoofed CAN messages to the engine, steering, and brakes."
        },
        {
          type: "simulation",
          title: "Attack Simulation: From Cellular to Control",
          content: "Click the play button below to watch how the attack propagated through the vehicle's architecture."
        },
        {
          type: "text",
          content: "This hack fundamentally changed the industry. It demonstrated the need for network segmentation (Gateways) and active Intrusion Detection (IDPS) to spot and block unauthorized messages crossing from the Infotainment domain to the Safety domain."
        }
      ],
      quiz: {
        question: "What was the critical architectural flaw exploited in the Jeep hack?",
        options: [
          { id: "a", text: "Lack of IDPS and weak segmentation allowed messages to pass from the Radio to the Brakes.", isCorrect: true },
          { id: "b", text: "The attackers stole the physical keys.", isCorrect: false },
          { id: "c", text: "The tires were under-inflated.", isCorrect: false }
        ],
        explanation: "The attack succeeded because the Infotainment system (connected to the internet) could communicate with safety-critical systems without an IDPS or strong Gateway blocking the traffic."
      }
    },
    {
      id: "m8",
      title: "8. Key Takeaways & PlaxidityX",
      shortTitle: "Conclusion",
      duration: "5 min",
      sections: [
        {
          type: "list",
          title: "Summary",
          content: [
            "Strategic Value: IDPS provides the visibility needed to maintain safety and compliance over the vehicle's life.",
            "Security by Design: IDPS is not a patch; it is an architectural component integrated from day one.",
            "Shared Responsibility: Engineering integrates it, SOC monitors it, Management funds it. Everyone plays a role."
          ]
        },
        {
          type: "text",
          title: "Secure the Future with PlaxidityX",
          content: "See how PlaxidityX secures the connected vehicle ecosystem with advanced, production-ready IDPS solutions."
        },
        {
          type: "video",
          title: "PlaxidityX IDPS Solution",
          videoUrl: "https://drive.google.com/file/d/1UbVgLGyYnfw97vYur-C6NpgNcPEq7I3u/preview"
        },
        {
          type: "text",
          content: "Thank you for completing the PlaxidityX Automotive IDPS training. You are now better equipped to understand the critical role of detection and prevention in modern mobility."
        }
      ]
    }
  ]
};