export type DemoScenario = {
  id: string;
  title: string;
  short: string;
  area: string;
  video?: string;
  poster?: string;
  duration: number;
  eventAt?: number;
  eventTitle: string;
  eventDetail: string;
  rule: string;
  action: string;
  status: "model" | "illustrative" | "concept";
  type: "package" | "forklift" | "ppe" | "exit" | "drawer" | "waste";
};
export const scenarios: DemoScenario[] = [
  {
    id: "package-flow",
    title: "Package flow",
    short: "Parcel sorting",
    area: "WAREHOUSE / DISPATCH",
    video: "/demo/warehouse-operations.mp4",
    poster: "/demo/posters/warehouse-operations.webp",
    duration: 5,
    eventTitle: "Warehouse model predictions",
    eventDetail:
      "Real, sampled model predictions on prerecorded footage. IDs use approximate association and counts describe visible candidate regions.",
    rule: "Filter model candidates by parcel, person or cart.",
    action:
      "Inspect a candidate; validate predictions before using them for operational decisions.",
    status: "model",
    type: "package",
  },
  {
    id: "forklift-safety",
    title: "Forklift & people",
    short: "Shared work area",
    area: "WAREHOUSE / SAFETY",
    video: "/demo/forklift-safety.mp4",
    poster: "/demo/posters/forklift-safety.webp",
    duration: 12,
    eventAt: 3.5,
    eventTitle: "Example shared-zone review",
    eventDetail:
      "A forklift and a pedestrian share the same operating area. This scripted review cue illustrates a possible workflow; it does not establish that the people were dangerously close.",
    rule: "Flag a configured interaction between a vehicle and a person for review.",
    action:
      "Review the camera view and context before deciding whether intervention is needed. Distance requires calibration or other sensors.",
    status: "illustrative",
    type: "forklift",
  },
  {
    id: "ppe-review",
    title: "Protective equipment",
    short: "Factory floor",
    area: "MANUFACTURING / SAFETY",
    video: "/demo/factory-ppe.mp4",
    poster: "/demo/posters/factory-ppe.webp",
    duration: 15,
    eventAt: 4,
    eventTitle: "Example PPE review",
    eventDetail:
      "This footage shows workers in safety equipment. The example cue illustrates a review workflow; it does not indicate missing PPE or a detected violation.",
    rule: "Check a designated area against agreed visible equipment requirements.",
    action:
      "Review the relevant frame in context. An actual PPE pilot requires a validated task-specific model and suitable camera placement.",
    status: "illustrative",
    type: "ppe",
  },
  {
    id: "blocked-exit",
    title: "Emergency routes",
    short: "Blocked exit",
    area: "FACILITIES / SAFETY",
    duration: 0,
    eventTitle: "Blocked exit",
    eventDetail:
      "A concept for identifying visible obstructions in a defined emergency route. Suitable footage is not available in this preview.",
    rule: "An obstruction remains inside a defined exit zone for an agreed duration.",
    action:
      "Review the potential obstruction and follow the site’s existing safety procedures.",
    status: "concept",
    type: "exit",
  },
  {
    id: "cash-drawer",
    title: "Cash drawer",
    short: "After-hours review",
    area: "RETAIL / OPERATIONS",
    duration: 0,
    eventTitle: "Cash drawer after hours",
    eventDetail:
      "A proposed workflow for a visible drawer opened outside agreed hours. No drawer footage or validated drawer-state detector is included.",
    rule: "Drawer-open state combined with the store’s authorized operating hours.",
    action:
      "Review context with an authorized manager. A drawer sensor or POS events may be needed for reliable state.",
    status: "concept",
    type: "drawer",
  },
  {
    id: "medical-waste",
    title: "Waste handling",
    short: "Operational area",
    area: "HEALTHCARE / OPERATIONS",
    duration: 0,
    eventTitle: "Waste handling review",
    eventDetail:
      "A concept for reviewing selected visible conditions in an approved non-clinical waste area. No suitable waste-handling footage is included.",
    rule: "A specific visible condition within a customer-approved area.",
    action:
      "Authorized staff review the observation; the system cannot determine infection or overall regulatory compliance.",
    status: "concept",
    type: "waste",
  },
];
export const scenarioById = (id: string) =>
  scenarios.find((s) => s.id === id) || scenarios[0];
