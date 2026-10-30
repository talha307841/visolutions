export const faq = [
  [
    "Do we need new cameras?",
    "Not necessarily. We assess supported NVR, DVR and RTSP streams, camera placement, resolution and lighting. Some installations may need camera changes or additional equipment; compatibility is not universal.",
  ],
  [
    "Does the system require internet?",
    "The proposed managed inference architecture requires an outbound internet connection to transmit selected frames or clips. Bandwidth requirements depend on camera count, resolution and sampling configuration.",
  ],
  [
    "How many cameras can be supported?",
    "Capacity is determined during assessment. A Raspberry Pi or compatible gateway cannot decode unlimited streams. Hardware, codecs, frame rate, resolution and available bandwidth all affect the configuration.",
  ],
  [
    "Can we choose which violations to monitor?",
    "The pilot should focus on a defined, observable condition. Proposed rules and zones will be configured around the use case, then validated under the actual camera conditions.",
  ],
  [
    "Is footage stored?",
    "The website stores no CCTV footage. Future pilots may retain authorized event clips or frames under an agreed retention policy. Data scope, access and deletion must be defined before capture.",
  ],
  [
    "How are alerts delivered?",
    "Dashboard events and notification workflows are planned. Notification channels and escalation rules will be agreed during a pilot; no production alert service is available through this demo.",
  ],
  [
    "What happens if connectivity fails?",
    "A future gateway is intended to reconnect and buffer selected data where feasible. Available storage and interruption length limit buffering. Delays and gaps remain possible; uninterrupted monitoring is not guaranteed.",
  ],
  [
    "Can the system be deployed onsite?",
    "The initial architecture uses managed inference. Alternative onsite inference is a roadmap consideration, subject to hardware, support and deployment assessment.",
  ],
  [
    "How is employee privacy handled?",
    "Camera placement and monitoring scope should be approved by the customer, with appropriate notice and access controls. Sensitive patient areas should be excluded. Each deployment needs a documented privacy review, retention policy and applicable legal assessment.",
  ],
];
